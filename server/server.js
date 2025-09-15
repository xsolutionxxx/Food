import express from "express";
import fs from "fs";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

const DATA_FILE = "data.json";

function readData() {
  return JSON.parse(fs.readFileSync(DATA_FILE, "utf-8"));
}

function writeData(data) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2), "utf-8");
}

app.get("/menu", (req, res) => {
  const data = readData();
  res.json(data.menu);
});

app.post("/requests", (req, res) => {
  const data = readData();
  data.requests.push(req.body);
  writeData(data);
  res.json({ status: "ok", saved: req.body });
});

app.listen(3000, () => {
  console.log("✅ Сервер працює на http://localhost:3000");
});
