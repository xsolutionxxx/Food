import express from "express";
import cors from "cors";
import multer from "multer";

const app = express();
const upload = multer();

app.use(cors());
app.use(express.json());

app.post("/submit", upload.none(), (req, res) => {
  console.log("Отримані дані:", req.body);

  res.json({ received: req.body });
});

app.listen(3000, () => {
  console.log("Сервер запущено на http://localhost:3000");
});
