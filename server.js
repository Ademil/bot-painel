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

app.listen(3000, () => {
  console.log("🌐 Servidor rodando em http://localhost:3000");
});