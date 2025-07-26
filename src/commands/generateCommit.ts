import * as vscode from 'vscode';
import pickRepository from '../lib/pickRepository';
import getGitDiff from '../lib/getDiff';
import getRecentCommits from '../lib/getRecentCommits';
import generateCommit from '../lib/generateCommit';
import getConfig from '../lib/getConfig';

export const registerGenerateCommitCommand = (context: vscode.ExtensionContext) => {
  const disposable = vscode.commands.registerCommand('ficommitgen-vscode.generateCommit', async () => {
    // Pick repository (if multiple repositories are available)
    const repo = await pickRepository();
    if (!repo) {
      vscode.window.showErrorMessage('No Git repository found.');
      return;
    }

    // Get config from ficommitgen.md (optional)
    const config = await getConfig(repo);

    // Get diff and recent commits
    const [diff, recent] = await Promise.all([getGitDiff(repo), getRecentCommits(repo, config?.recentCommitsCount)]);
    if (!diff) {
      vscode.window.showErrorMessage('No changes found.');
      return;
    }

    // Generate commit message
    vscode.window.showInformationMessage(
      config?.instruction ? 'Generating commit message with custom instruction...' : 'Generating commit message...'
    );
    const commit = await generateCommit(diff, recent, config?.instruction);
    if (!commit) {
      vscode.window.showErrorMessage('Failed to generate commit message.');
      return;
    }

    // Set commit message into input box
    repo.inputBox.value = commit;
    vscode.window.showInformationMessage('Commit message generated!');
  });

  context.subscriptions.push(disposable);
};
