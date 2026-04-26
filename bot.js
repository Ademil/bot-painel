const qrcode = require("qrcode-terminal");
const { Client, LocalAuth } = require("whatsapp-web.js");
const axios = require("axios");

const client = new Client({
  authStrategy: new LocalAuth(),
  puppeteer: { headless: true, args: ["--no-sandbox"] }
});

client.on("qr", (qr) => {
  console.log("📲 Escaneie o QR Code:");
  qrcode.generate(qr, { small: true });
});

client.on("ready", () => {
  console.log("✅ Bot conectado!");
});

client.on("message", async (msg) => {
  if (msg.from.includes("@g.us")) return;
  if (msg.from === "status@broadcast") return;

  const texto = msg.body.toLowerCase();

  if (texto === "oi" || texto === "menu") {
    await msg.reply(
`🏗️ *APavan Engenharia*

1️⃣ Orçamento
2️⃣ Contato
3️⃣ Serviços`
    );
    return;
  }

  // qualquer outra mensagem vira lead
  try {
    await axios.post("http://localhost:3000/lead", {
      numero: msg.from,
      mensagem: msg.body,
      data: new Date()
    });

    await msg.reply("✅ Recebido! Em breve entro em contato.");
  } catch (erro) {
    console.log("Erro:", erro.message);
  }
});

client.initialize();