const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static("public"));

let leads = [];

// receber lead
app.post("/lead", (req, res) => {
  leads.push(req.body);
  console.log("📥 Lead recebido:", req.body);
  res.send({ ok: true });
});

// listar leads
app.get("/leads", (req, res) => {
  res.json(leads);
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("🌐 Servidor rodando...");
});