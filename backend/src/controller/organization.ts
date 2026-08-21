import { prisma } from "../db.js";
import crypto from "crypto";

const addOrganization = async (req: any, res: any) => {
  const { orgName } = req.query;

  try {
    if (!orgName) {
      res.status(400).json({ message: "Organization name is required" });
      return;
    }

    const existingName = await prisma.organization.findUnique({
      where: {
        name: orgName
      }
    });

    if (existingName) {
      res.status(400).json({ message: "Organization name already exists" });
      return;
    }

    const apiKey = crypto.randomBytes(32).toString("hex");

    const result = await prisma.organization.create({
      data: {
        name: orgName,
        apiKey: apiKey
      }
    });
    console.log("Organization added successfully:", result);
    res.status(201).json({
      message: `Organization ${result.name} added successfully`,
      apiKey: result.apiKey
    });
  } catch (error) {
    res.status(500).json({ message: "Error adding organization" });
  }
};

export default addOrganization;
