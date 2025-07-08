// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { setContext } from './lib/context';
import { registerGenerateCommitCommand } from './commands/generateCommit';
import { registerSetTokenCommand } from './commands/setToken';

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
  setContext(context);

  registerGenerateCommitCommand(context);
  registerSetTokenCommand(context);
}

// This method is called when your extension is deactivated
export function deactivate() {}
