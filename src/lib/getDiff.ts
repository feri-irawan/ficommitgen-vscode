import * as vscode from 'vscode';
import { exec } from 'child_process';
import { promisify } from 'util';
import { Repository } from '../types';

const execAsync = promisify(exec);

const getGitDiff = async (repo: Repository): Promise<string> => {
  try {
    const cwd = repo.rootUri.fsPath;

    // Try to get diff from staged changes first
    const { stdout: stagedDiff } = await execAsync('git diff --cached', { cwd });

    if (stagedDiff.trim().length > 0) {
      return stagedDiff;
    }

    // If no staged changes, get unstaged changes
    const { stdout: unstagedDiff } = await execAsync('git diff', { cwd });

    return unstagedDiff;
  } catch (error: unknown) {
    console.error('Failed to run git diff:', error);
    vscode.window.showErrorMessage('Failed to get `git diff` result.');
    return '';
  }
};

export default getGitDiff;
