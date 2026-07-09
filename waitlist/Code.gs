/**
 * Legal Defense — Lista de espera (captação de leads)
 * =====================================================
 * Google Apps Script (avulso OU vinculado — abre a planilha pelo ID, então
 * funciona dos dois jeitos). Recebe o POST do formulário da landing
 * (legaldefense.com.br), checa o honeypot, grava uma linha na aba "Leads" e
 * notifica a equipe por e-mail.
 *
 * Configuração:
 *   SPREADSHEET_ID → a constante logo abaixo (ID da planilha; já preenchida).
 *   Propriedades do script (Configurações do projeto → Propriedades do script):
 *     TEAM_EMAIL     → e-mail que recebe cada novo lead (ex.: contato@legaldefense.com.br)
 *     SPREADSHEET_ID → (opcional) sobrescreve a constante, se preferir
 *
 * Deploy: Implantar → Nova implantação → App da Web
 *   Executar como: Eu   |   Quem tem acesso: Qualquer pessoa
 * Copie a URL /exec para NEXT_PUBLIC_WAITLIST_ENDPOINT na landing.
 *
 * ⚠️  Ao editar este código, uma NOVA VERSÃO da implantação precisa ser publicada
 *     (Gerenciar implantações → editar → Versão: Nova versão) para valer no ar.
 *
 * Ver landing/waitlist/SETUP.md para o passo a passo completo.
 */

var SHEET_NAME = "Leads";
var TIMEZONE = "America/Sao_Paulo";

// ID da planilha de leads (o trecho entre /d/ e /edit da URL). Deixar preenchido
// aqui faz o script funcionar MESMO SE for um projeto avulso (não vinculado à
// planilha). Pode sobrescrever pela propriedade de script SPREADSHEET_ID.
var SPREADSHEET_ID = "1f8Srxk6EVznE4_oTz8HPgg1T6a2kvI_CkL3Sw_ZKs1I";
var HEADERS = [
  "Data/Hora",
  "Nome",
  "E-mail",
  "WhatsApp",
  "Escritório",
  "Consentimento",
  "Origem",
  "Página",
];

/** Health check — abra a URL /exec no navegador para confirmar que está no ar. */
function doGet() {
  return json({ ok: true, service: "waitlist" });
}

/** Recebe o lead do formulário (application/x-www-form-urlencoded). */
function doPost(e) {
  try {
    var p = (e && e.parameter) || {};

    // 1) Honeypot: se o campo isca veio preenchido, é bot → finge sucesso e ignora.
    if (p.website) {
      return json({ ok: true });
    }

    // 2) Validação mínima de servidor (defesa em profundidade).
    var nome = trim(p.nome);
    var email = trim(p.email);
    if (!nome || !isEmail(email)) {
      return json({ ok: false, error: "missing_fields" });
    }

    // 3) Consentimento LGPD: só tratamos com opt-in explícito (Art. 8, §2 —
    //    o ônus de provar o consentimento é do controlador; por isso gravamos).
    if (trim(p.consent) !== "true") {
      return json({ ok: false, error: "consent_required" });
    }

    var lead = {
      stamp: Utilities.formatDate(new Date(), TIMEZONE, "yyyy-MM-dd HH:mm:ss"),
      nome: nome,
      email: email,
      whatsapp: trim(p.whatsapp),
      escritorio: trim(p.escritorio),
      consent: "Sim — autorizou contato p/ lista de espera",
      origem: trim(p.origem),
      pagina: trim(p.pagina),
    };

    // 4) Grava na planilha, serializado por lock (evita corrida entre execuções
    //    concorrentes num pico de envios). Se a gravação falhar, NÃO perdemos o
    //    lead: o e-mail à equipe (passo 5) é o registro de backup.
    var lock = LockService.getScriptLock();
    try {
      lock.waitLock(8000);
      getLeadsSheet().appendRow([
        lead.stamp,
        cell(lead.nome),
        cell(lead.email),
        cell(lead.whatsapp),
        cell(lead.escritorio),
        lead.consent,
        cell(lead.origem),
        cell(lead.pagina),
      ]);
    } catch (writeErr) {
      console.error("waitlist append failed (backup por e-mail): " + writeErr);
    } finally {
      try {
        lock.releaseLock();
      } catch (relErr) {
        /* noop */
      }
    }

    // 5) Notifica a equipe (sempre roda — também é o backup se a planilha falhar).
    notifyTeam(lead);

    return json({ ok: true });
  } catch (err) {
    // Não vaza detalhes ao cliente; registra no log de execução do Apps Script.
    console.error("waitlist doPost error: " + err);
    return json({ ok: false, error: "internal" });
  }
}

/* ------------------------------------------------------------------ helpers */

function getSpreadsheet() {
  // Abre pelo ID (funciona em script avulso OU vinculado). Só cai no
  // getActiveSpreadsheet() se nenhum ID estiver configurado.
  var id =
    PropertiesService.getScriptProperties().getProperty("SPREADSHEET_ID") ||
    SPREADSHEET_ID;
  if (id) return SpreadsheetApp.openById(id);
  return SpreadsheetApp.getActiveSpreadsheet();
}

function getLeadsSheet() {
  var ss = getSpreadsheet();
  var sheet = ss.getSheetByName(SHEET_NAME);
  if (!sheet) sheet = ss.insertSheet(SHEET_NAME);
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(HEADERS);
    sheet.getRange(1, 1, 1, HEADERS.length).setFontWeight("bold");
    sheet.setFrozenRows(1);
  }
  return sheet;
}

function notifyTeam(lead) {
  var to = PropertiesService.getScriptProperties().getProperty("TEAM_EMAIL");
  if (!to) return;
  try {
    var subject = "Novo lead — Lista de espera: " + lead.nome;
    var rows = [
      ["Nome", lead.nome],
      ["E-mail", lead.email],
      ["WhatsApp", lead.whatsapp || "—"],
      ["Escritório", lead.escritorio || "—"],
      ["Consentimento", lead.consent || "—"],
      ["Origem", lead.origem || "—"],
      ["Recebido em", lead.stamp],
    ];
    var body = rows
      .map(function (r) {
        return (
          '<tr><td style="padding:4px 12px 4px 0;color:#6b7280">' +
          r[0] +
          '</td><td style="padding:4px 0;font-weight:600;color:#0a1024">' +
          escapeHtml(r[1]) +
          "</td></tr>"
        );
      })
      .join("");
    var html =
      '<div style="font-family:Arial,Helvetica,sans-serif;color:#0a1024">' +
      '<h2 style="margin:0 0 12px">Novo lead na lista de espera</h2>' +
      '<table style="border-collapse:collapse">' +
      body +
      "</table>" +
      '<p style="margin-top:16px;color:#6b7280;font-size:12px">' +
      "Registrado automaticamente na planilha de leads do Legal Defense.</p></div>";
    MailApp.sendEmail({
      to: to,
      subject: subject,
      htmlBody: html,
      replyTo: lead.email || undefined,
      name: "Legal Defense — Lista de espera",
    });
  } catch (err) {
    console.error("notifyTeam error: " + err);
  }
}

function json(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(
    ContentService.MimeType.JSON
  );
}

function trim(v) {
  return (v == null ? "" : String(v)).trim();
}

/**
 * Neutraliza injeção de fórmula/CSV: valores começando com = + - @ (ou TAB/CR)
 * viram fórmula viva na planilha e são perigosos ao exportar CSV → Excel.
 * Prefixa com apóstrofo para forçar texto puro.
 */
function cell(v) {
  var s = trim(v);
  return /^[=+\-@\t\r]/.test(s) ? "'" + s : s;
}

function isEmail(v) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
}

function escapeHtml(v) {
  return String(v == null ? "" : v)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
