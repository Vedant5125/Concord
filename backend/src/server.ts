import express from "express";
import { prisma } from "./db.js";
import publishContract from "./controller/publish.js"; 
import "dotenv/config";

const app = express();

app.use(express.json({limit:"1mb"}));

app.post("/api/publish",publishContract);

app.listen(3000, () => console.log('Concord backend running on port 3000'));




