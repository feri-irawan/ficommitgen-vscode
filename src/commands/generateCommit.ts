import * as vscode from 'vscode';
import pickRepository from '../lib/pickRepository';
import { getGitDiff } from '../lib/getDiff';
import getRecentCommits from '../lib/getRecentCommits';
import generateCommit from '../lib/generateCommit';

export const registerGenerateCommitCommand = (context: vscode.ExtensionContext) => {
  const disposable = vscode.commands.registerCommand('ficommitgen-vscode.generateCommit', async () => {
    const repo = await pickRepository();
    if (!repo) {
      vscode.window.showErrorMessage('No Git repository found.');
      return;
    }

    const [diff, recent] = await Promise.all([getGitDiff(repo), getRecentCommits(repo)]);
    if (!diff) {
      vscode.window.showErrorMessage('No changes found.');
      return;
    }

    vscode.window.showInformationMessage('Generating commit message...');
    const commit = await generateCommit(diff, recent);
    if (!commit) {
      vscode.window.showErrorMessage('Failed to generate commit message.');
      return;
    }

    repo.inputBox.value = commit;
    vscode.window.showInformationMessage('Commit message generated!');
  });

  context.subscriptions.push(disposable);
};
