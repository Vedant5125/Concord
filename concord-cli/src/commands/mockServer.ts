import { Command } from "commander";
import apiClient from "../api.js";

function mockServerCommand(program: Command) {
  program
    .command("mock-server <id> <port>")
    .description("runs the mock server")
    .action(async (id, port) => {
      try {
        if (!id) {
          console.error("contract id is required");
          return
        }
        if (!port) {
          console.error("port is required");
          return
        }
        const payload = { id, port };

        const result = await apiClient.post("/api/mockServer", null, { params: payload });
        if(!result || ! result.data) {
          console.error("Error running mock server");
          return
        }
        console.dir("mock server started");
        console.dir(result.data, { depth: null });

      } catch (error) {
        console.error("Error running mock server", error);
      }
    });
}

export default mockServerCommand;