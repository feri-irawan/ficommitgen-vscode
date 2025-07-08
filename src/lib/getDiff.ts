import * as vscode from 'vscode';
import { exec } from 'child_process';
import { promisify } from 'util';
import { Repository } from '../types';

const execAsync = promisify(exec);

export async function getGitDiff(repo: Repository): Promise<string> {
  try {
    const { stdout } = await execAsync('git diff', {
      cwd: repo.rootUri.fsPath,
    });
    return stdout;
  } catch (error: unknown) {
    console.error('Failed to run git diff:', error);
    vscode.window.showErrorMessage('Failed to get `git diff` result.');
    return '';
  }
}
