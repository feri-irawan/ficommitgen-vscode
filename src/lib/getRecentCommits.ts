import { exec } from 'child_process';
import { promisify } from 'util';
import { Repository } from '../types';

const execAsync = promisify(exec);

const getRecentCommits = async (repo: Repository, count = 20): Promise<string> => {
  try {
    const { stdout } = await execAsync(`git log -n ${count} --pretty=format:"%s"`, {
      cwd: repo.rootUri.fsPath,
    });
    return stdout.trim();
  } catch (error) {
    console.error('Gagal mengambil commit log:', error);
    return '';
  }
};

export default getRecentCommits;
