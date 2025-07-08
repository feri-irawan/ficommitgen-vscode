// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { getGitDiff } from './lib/getDiff';
import pickRepository from './lib/pickRepository';
import getRecentCommits from './lib/getRecentCommits';
import { setContext } from './lib/context';
import generateCommit from './lib/generateCommit';

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
    vscode.window.showInformationMessage('🔄 Generating commit message...');

    // Pick repository
    const repo = await pickRepository();
    if (!repo) {
      return;
    }

    // Get git diff and recent commits
    const [diffOutput, recentCommits] = await Promise.all([getGitDiff(repo), getRecentCommits(repo)]);
    if (!diffOutput) {
      return;
    }

    // Generate commit
    const commit = await generateCommit(diffOutput, recentCommits);
    if (!commit) {
      return;
    }

    // Set commit
    repo.inputBox.value = commit;
    vscode.window.showInformationMessage('✅ Commit message generated!');
  });

  context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
export function deactivate() {}
