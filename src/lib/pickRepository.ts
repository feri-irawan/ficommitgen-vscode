import * as vscode from 'vscode';
import { GitExtension, Repository } from '../types';

const pickRepository = async (): Promise<Repository | undefined> => {
  const gitExtension = vscode.extensions.getExtension('vscode.git')?.exports as GitExtension | undefined;
  const gitApi = gitExtension?.getAPI(1);

  if (!gitApi) {
    vscode.window.showErrorMessage('Git extension is not available.');
    return undefined;
  }

  const repos = gitApi.repositories;

  if (repos.length === 0) {
    vscode.window.showErrorMessage('No Git repository found.');
    return undefined;
  }

  if (repos.length === 1) {
    return repos[0]; // langsung ambil kalau cuma satu
  }

  const selectedPath = await vscode.window.showQuickPick(
    repos.map((repo) => ({
      label: repo.rootUri.fsPath,
      description: '',
      repo,
    })),
    {
      placeHolder: 'Select the Git repository to use',
    }
  );

  return selectedPath?.repo;
};

export default pickRepository;
