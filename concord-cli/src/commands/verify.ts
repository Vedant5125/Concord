import { Command } from "commander"
import apiClient from "../api.js"

function verifyCommand(program : Command){
  program
    .command("verify <id> <baseUrl>")
    .description("verifies contract with actual backend")
    .action(async (id, baseUrl) =>{
        try {
            const payload = {
                id , baseUrl
            }
            const result = await apiClient.post("/api/verifyInteractions", null, { params: payload });
            if(!result || ! result.data) {
                console.error("Error verifying contract")
                return
            }
            console.dir("Verification process",result.data)

        } catch (error) {
            console.error("Verification failed",error)
        }
    })
}

export default verifyCommand;