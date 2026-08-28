import { Command } from "commander";
import apiClient from "../api.js";

function organizationAddCommand(program: Command){
    program
      .command("add-organization <name>")
      .description("adds organization to concord")
      .action(async (name) =>{
        if(!name){
            console.error("organization name is required")
            return
        }

        try {
            // const result = await apiClient.post("/api/addOrganization", null, { params: {orgName: name} })
            const result = await apiClient.post("/api/addOrganization", { orgName: name });

            if(!result){
                console.error(`Error adding organization with name: ${name}`);
                return
            }

            console.log(result.data);
        } catch (error) {
            console.error("Error adding organization");
        }
      })
}

export {organizationAddCommand}