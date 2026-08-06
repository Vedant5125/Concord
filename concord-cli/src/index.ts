#!/usr/bin/env node
import { Command } from 'commander';
import publishCommand from './commands/publish.js';
import { contractListCommand, interactionListCommand } from './commands/list.js';
import mockServerCommand from './commands/mockServer.js';
import verifyCommand from './commands/verify.js';

const program = new Command();

program
  .name("concord")
  .description("API contract testing and mock server CLI")
  .version("1.0.0");


publishCommand(program);
contractListCommand(program);
interactionListCommand(program);
mockServerCommand(program);
verifyCommand(program);

program.parse();