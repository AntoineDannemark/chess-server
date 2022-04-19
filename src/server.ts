import express from "express";
import cors from "cors";

const PORT = process.env.PORT || 80;

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (_req, res) => res.send("HELLO YOU"));

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
