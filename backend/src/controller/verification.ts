import { prisma } from "../db.js";
import axios from "axios";

const verifyInteractions = async (req: any, res: any) => {
  const { id, baseUrl } = req.query;
  const contractId = Number(id);

  const resArray = [];
  if (!contractId || isNaN(contractId)) {
    return res.status(400).json({ message: "Valid contractId required" });
  }

  try {
    const contract = await prisma.contract.findUnique({
      where: { id: contractId },
      include: { interactions: true }
    });

    if (!contract) {
      return res.status(400).json({ message: "Invalid contractId" });
    }
    if (Object.keys(contract).length == 0) {
      return res.status(400).json({ message: "Contract is empty" });
    }

    const interactions = contract.interactions;

    for (const e of interactions) {
      const method = e.method.toLowerCase();
      let path = e.path;
      if (e.pathParams) {
        for (const key in e.pathParams as any) {
          path = path.replace(`:${key}`, (e.pathParams as any)[key]);
        }
      }

      let passed = false;
      let errorCaught = [];

      // try catch block as axios may fails so we try to connect but it could fail
      try {
        const result = await (axios as any)[method](`${baseUrl}${path}`);

        const db_data = e.responseBody as any;
        const backend_data = result.data;

        for (const key in db_data) {
          if (!(key in backend_data)) {
            errorCaught.push(`Missing Key: ${key}`);
          } else if (typeof backend_data[key] !== db_data[key]) {
            errorCaught.push(`Type mismatch on ${key}: Expected ${db_data[key]} , got ${typeof backend_data[key]}`);
          }
        }

        if (errorCaught.length === 0) {
          passed = true;
        }
      } catch (error) {
        errorCaught = ["Request to real backend failed"];
        passed = false;
      }

      try {
        await prisma.verification.create({
          data: {
            contractId: contractId,
            interactionId: e.id,
            passed: passed,
            errorDetails: errorCaught,
            baseUrlUsed: baseUrl
          }
        });
      } catch (error) {
        console.log("Failed to save verification:", error);
      }

      resArray.push({ interactionId: e.id, passed, errorCaught });
  
    }
    res.status(200).json({ results: resArray });

  } catch (error) {
    res.status(500).json({ message: "Error verifying interactions" });
  }
};

export default verifyInteractions;
