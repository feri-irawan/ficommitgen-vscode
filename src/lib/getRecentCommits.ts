import { exec } from 'child_process';
import { promisify } from 'util';
import { Repository } from '../types';
import * as vscode from 'vscode';

const execAsync = promisify(exec);

const getRecentCommits = async (repo: Repository, count = 20): Promise<string> => {
  try {
    const { stdout } = await execAsync(`git log -n ${count} --pretty=format:"%s"`, {
      cwd: repo.rootUri.fsPath,
    });
    return stdout.trim();
  } catch (error) {
    console.error('Gagal mengambil commit log:', error);
    vscode.window.showErrorMessage('❌ Gagal mendapatkan commit log.');
    return '';
  }
};

export default getRecentCommits;
