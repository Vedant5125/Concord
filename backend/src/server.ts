import express from "express";
import { prisma } from "./db.js";
import publishContract from "./controller/publish.js"; 
import listContracts from "./controller/listContracts.js";
import interactionList from "./controller/listInteractions.js";
import mockServer  from "./controller/mockServer.js"
import "dotenv/config";

const app = express();

app.use(express.json({limit:"1mb"}));

app.post("/api/publish", publishContract);
app.get("/api/listContracts", listContracts);
app.get("/api/listInteractions", interactionList);
app.post("/api/mockServer",mockServer);

app.listen(3000, () => console.log('Concord backend running on port 3000'));




