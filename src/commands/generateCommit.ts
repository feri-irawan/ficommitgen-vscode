import * as vscode from 'vscode';
import pickRepository from '../lib/pickRepository';
import { getGitDiff } from '../lib/getDiff';
import getRecentCommits from '../lib/getRecentCommits';
import generateCommit from '../lib/generateCommit';

export const registerGenerateCommitCommand = (context: vscode.ExtensionContext) => {
  const disposable = vscode.commands.registerCommand('ficommitgen-vscode.generateCommit', async () => {
    const repo = await pickRepository();
    if (!repo) {
      vscode.window.showErrorMessage('Tidak ada repository Git yang ditemukan.');
      return;
    }

    const [diff, recent] = await Promise.all([getGitDiff(repo), getRecentCommits(repo)]);
    if (!diff) {
      vscode.window.showErrorMessage('Tidak ada perubahan yang ditemukan.');
      return;
    }

    vscode.window.showInformationMessage('Menghasilkan commit message...');
    const commit = await generateCommit(diff, recent);
    if (!commit) {
      vscode.window.showErrorMessage('Gagal menghasilkan commit message.');
      return;
    }

    repo.inputBox.value = commit;
    vscode.window.showInformationMessage('Commit message dihasilkan!');
  });

  context.subscriptions.push(disposable);
};
