import * as vscode from 'vscode';
import { getContext } from './context';
import { showInputToken } from '../commands/setToken';

const TOKEN_KEY = 'ficommitgen.token';

const getOrRequestToken = async (): Promise<string | undefined> => {
  const context = getContext();

  let token = await context.secrets.get(TOKEN_KEY);

  if (!token) {
    token = await showInputToken();
    if (!token) {
      return;
    }

    await context.secrets.store(TOKEN_KEY, token);
    vscode.window.showInformationMessage('Token berhasil disimpan!');
  }

  return token;
};

export default getOrRequestToken;
