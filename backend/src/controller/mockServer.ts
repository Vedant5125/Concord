import express from "express";
import { prisma } from "../db.js";

const mockServer = async (req: any, res: any) => {
  const { id, port } = req.query;
  // taking port from user as if the user want to start a different or same contract again they cant run on same port and will give error so user should mention different ports if not done error is returned
  const contract_Id = Number(id);
  const mockPort = Number(port) || 4000;

  if (!id || isNaN(contract_Id)) {
    return res.status(400).json({ message: "valid contract id is required" });
  }

  try {
    const existContract = await prisma.contract.findFirst({
      where: {
        id: contract_Id,
        producer: { organizationId: req.organization.id },
        consumer: { organizationId: req.organization.id }
      },
      include: { interactions: true }
    });

    if (!existContract) {
      return res.status(400).json({ message: "Contract not found" });
    }

    const interactions = existContract.interactions;
    if (!interactions || interactions.length == 0) {
      return res
        .status(400)
        .json({
          message: `No interactions found for ContractId ${contract_Id}`
        });
    }

    const mockApp = express();

    interactions.forEach((e: any) => {
      const method: string = e.method.toLowerCase();
      // Block-scoped variable 'method' used before its declaration. it was just an issue of semicolon as js was considering we trying to call result of .toLowerCase as function passing mockApp as argument
      (mockApp as any)[method](e.path, (req: any, res: any) => {
        res.status(e.statusCode).json(e.responseBody);
      });
    });

    const server = mockApp.listen(mockPort, () => {
      console.log(`mockServer running on port ${mockPort}`);
      res
        .status(200)
        .json({ message: `Mock server started on Port: ${mockPort}` });
    });

    // this is dont to give hidden error that happend when two servers try to use same port and the second server fails silently
    server.on("error", (err: any) => {
      if (err.code === "EADDRINUSE") {
        console.error(`Port ${mockPort} is already in use`);
        res
          .status(409)
          .json({
            message: `Port ${mockPort} is already in use. Try a different port.`
          });
      } else {
        res.status(500).json({ message: "Failed to start mock server" });
      }
    });
  } catch (error) {
    res.status(500).json("Error starting mock server");
  }
};

export default mockServer;
