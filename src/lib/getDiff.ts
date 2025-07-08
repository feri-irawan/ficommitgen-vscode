import * as vscode from 'vscode';
import { exec } from 'child_process';
import { promisify } from 'util';
import pickRepository from './pickRepository';

const execAsync = promisify(exec);

export async function getGitDiff(): Promise<string> {
  const repo = await pickRepository();

  if (!repo) {
    return '';
  }

  try {
    const { stdout } = await execAsync('git diff', {
      cwd: repo.rootUri.fsPath,
    });
    return stdout;
  } catch (error: unknown) {
    console.error('Gagal menjalankan git diff:', error);
    vscode.window.showErrorMessage('❌ Gagal mendapatkan hasil `git diff`.');
    return '';
  }
}
