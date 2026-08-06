import { Command } from "commander";
import fs from "fs";
import apiClient from "../api.js";

function publishCommand(program: Command) {
  program
    .command("publish <file>")
    .description("Publish an API contract from a JSON file")
    .action(async (file) => {
      try {
        if (!fs.existsSync(file)) {
          console.error("File not found:", file);
          return;
        }

        const data = fs.readFileSync(file, "utf-8");
        const contract = JSON.parse(data); //converts data(json) to key:value pairs (object)
        if (
          !contract.producer ||
          !contract.consumer ||
          !Array.isArray(contract.interactions)
        ) {
          console.error(
            "Invalid contract file: must include 'producer', 'consumer', and 'interactions (array)'"
          );
          return;
        }
        const payload = {
          Pname: contract.producer,
          Cname: contract.consumer,
          Interactions: contract.interactions
        };

        const result = await apiClient.post("/api/publish", payload);
        if (!result || ! result.data) {
          console.error("error publishing contract");
          return
        }
        console.log("Contract published successfully:");
        console.dir(result.data, { depth: null });
      } catch (error) {
        console.error("Failed to publish contract:", error);
      }
    });
}

export default publishCommand;
