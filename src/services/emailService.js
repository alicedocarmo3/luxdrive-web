const nodemailer = require("nodemailer");
const QRCode = require("qrcode");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,     // seu Gmail
    pass: process.env.EMAIL_PASS,     // senha de app do Gmail
  },
});

async function enviarIngressoPorEmail(pedido) {
  // Gera QR Code com os dados do pedido
  const qrData = `LegacyDrive|${pedido._id}|${pedido.eventoNome}|${pedido.comprador.email}|${pedido.quantidade}`;
  const qrBase64 = await QRCode.toDataURL(qrData, { width: 300 });

  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8"/>
      <style>
        body { font-family: 'Arial', sans-serif; background: #0a0a0a; margin: 0; padding: 0; }
        .wrapper { max-width: 600px; margin: 0 auto; background: #111; border: 1px solid #222; }
        .header { background: #000; padding: 40px 40px 30px; border-bottom: 2px solid #ff4d00; }
        .header h1 { color: #fff; margin: 0; font-size: 22px; letter-spacing: 4px; font-weight: 300; }
        .header span { color: #ff4d00; font-weight: 700; }
        .body { padding: 40px; }
        .greeting { color: #fff; font-size: 18px; margin-bottom: 8px; }
        .sub { color: #888; font-size: 14px; margin-bottom: 32px; }
        .ticket { background: #1a1a1a; border: 1px solid #2a2a2a; border-radius: 8px; overflow: hidden; }
        .ticket-header { background: #ff4d00; padding: 16px 24px; }
        .ticket-header h2 { color: #000; margin: 0; font-size: 16px; letter-spacing: 2px; font-weight: 800; }
        .ticket-body { padding: 28px 24px; display: flex; gap: 24px; align-items: flex-start; }
        .ticket-info { flex: 1; }
        .ticket-info p { margin: 0 0 10px; color: #888; font-size: 12px; letter-spacing: 1px; text-transform: uppercase; }
        .ticket-info strong { color: #fff; font-size: 15px; display: block; margin-bottom: 20px; }
        .qr-section { text-align: center; }
        .qr-section p { color: #555; font-size: 11px; margin-top: 8px; letter-spacing: 1px; text-transform: uppercase; }
        .ticket-footer { border-top: 1px dashed #2a2a2a; padding: 16px 24px; display: flex; justify-content: space-between; }
        .ticket-footer span { color: #555; font-size: 12px; }
        .ticket-footer strong { color: #ff4d00; font-size: 14px; }
        .notice { margin-top: 28px; color: #555; font-size: 13px; line-height: 1.7; }
        .footer { padding: 24px 40px; border-top: 1px solid #1a1a1a; text-align: center; color: #333; font-size: 12px; }
      </style>
    </head>
    <body>
      <div class="wrapper">
        <div class="header">
          <h1>LEGACY<span>DRIVE</span></h1>
        </div>
        <div class="body">
          <p class="greeting">Olá, ${pedido.comprador.primeiroNome}!</p>
          <p class="sub">Seu pagamento foi confirmado. Aqui está seu ingresso.</p>

          <div class="ticket">
            <div class="ticket-header">
              <h2>INGRESSO CONFIRMADO</h2>
            </div>
            <div class="ticket-body">
              <div class="ticket-info">
                <p>Evento</p>
                <strong>${pedido.eventoNome}</strong>
                <p>Titular</p>
                <strong>${pedido.comprador.primeiroNome} ${pedido.comprador.sobrenome}</strong>
                <p>Quantidade</p>
                <strong>${pedido.quantidade} ingresso${pedido.quantidade > 1 ? "s" : ""}</strong>
                <p>Total pago</p>
                <strong>R$ ${pedido.total.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}</strong>
              </div>
              <div class="qr-section">
                <img src="${qrBase64}" width="140" height="140" alt="QR Code"/>
                <p>Apresente na entrada</p>
              </div>
            </div>
            <div class="ticket-footer">
              <span>Pedido #${pedido._id.toString().slice(-8).toUpperCase()}</span>
              <strong>${pedido.metodoPagamento.toUpperCase()}</strong>
            </div>
          </div>

          <p class="notice">
            Guarde este e-mail e apresente o QR Code na entrada do evento.<br/>
            Em caso de dúvidas, entre em contato: contato@legacydrive.com.br
          </p>
        </div>
        <div class="footer">© 2025 LegacyDrive. Todos os direitos reservados.</div>
      </div>
    </body>
    </html>
  `;

  await transporter.sendMail({
    from: `"LegacyDrive" <${process.env.EMAIL_USER}>`,
    to: pedido.comprador.email,
    subject: `✅ Seu ingresso para ${pedido.eventoNome} — LegacyDrive`,
    html,
  });
}

module.exports = { enviarIngressoPorEmail };