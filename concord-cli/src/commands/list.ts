import { Command } from "commander";
import fs from "fs";
import apiClient from "../api.js";

function contractListCommand(program: Command) {
  program
    .command("list-contract")
    .description("Lists contract with given producer name or consumer name")
    .option("-p, --producer <producer>", "producer name")
    .option("-c, --consumer <consumer>", "consumer name")
    .action(async (option) => {
      try {
        const { producer, consumer } = option;

        if (!producer && !consumer) {
          console.error("producer name or consumer name is required");
          return;
        }
        const payload: any = {};
        if (producer) {
          payload.Pname = producer;
        }
        if (consumer) {
          payload.Cname = consumer;
        }

        const result = await apiClient.get("/api/listContracts",{params: payload});
        if (!result || ! result.data) {
          console.error("error fetching list");
          return
        }
        console.log("List fetched:");
        console.dir(result.data, { depth: null });
      } catch (error) {
        console.error("Failed to fetch contracts:", error);
      }
    });
}

function interactionListCommand(program : Command){
  program
    .command("list-interaction <id>")
    .description("Lists interaction with given id")
    .action(async (id) =>{
      try {

        if(!id){
          console.error("interaction id is required");
          return;
        }

        const result = await apiClient.get("/api/listInteractions", { params: { data: id } });
        if (!result || ! result.data) {
          console.error("error fetching list");
          return
        }
        console.log("List fetched:");
        console.dir(result.data, { depth: null });

      } catch (error) {
        console.error("provide correct interaction id");
      }
    })
}

export { contractListCommand, interactionListCommand}