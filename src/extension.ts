// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { getGitDiff } from './lib/getDiff';
import pickRepository from './lib/pickRepository';
import getRecentCommits from './lib/getRecentCommits';
import { setContext } from './lib/context';

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
  setContext(context);

  // Use the console to output diagnostic information (console.log) and errors (console.error)
  // This line of code will only be executed once when your extension is activated
  console.log('Congratulations, your extension "ficommitgen-vscode" is now active!');

  // The command has been defined in the package.json file
  // Now provide the implementation of the command with registerCommand
  // The commandId parameter must match the command field in package.json
  const disposable = vscode.commands.registerCommand('ficommitgen-vscode.generateCommit', async () => {
    // The code you place here will be executed every time your command is executed
    // Display a message box to the user
    vscode.window.showInformationMessage('Hello World from ficommitgen-vscode!');

    // Pick repository
    const repo = await pickRepository();
    if (!repo) {
      return;
    }

    // Get git diff
    const diffOutput = await getGitDiff(repo);
    if (!diffOutput) {
      return;
    }

    // Get recent commits
    const recentCommits = await getRecentCommits(repo);

    // Show git diff
    vscode.window.showInformationMessage(`>>>>>> diffOutput <<<<<<<\n${diffOutput}`);
    vscode.window.showInformationMessage(`>>>>>> recentCommits <<<<<<<\n${recentCommits}`);
  });

  context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
export function deactivate() {}
