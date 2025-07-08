import * as vscode from 'vscode';
import { getContext } from '../lib/context';

const TOKEN_KEY = 'ficommitgen.token';

export const showInputToken = async () => {
  const token = await vscode.window.showInputBox({
    prompt: 'Masukkan token API Gemini kamu',
    ignoreFocusOut: true,
    password: true,
    placeHolder: 'Contoh: AIzaSy...',
    validateInput: (value) => (value.trim().length === 0 ? 'Token tidak boleh kosong' : undefined),
  });

  if (!token) {
    vscode.window.showWarningMessage('Token tidak dimasukkan.');
    return;
  }

  return token;
};

export const registerSetTokenCommand = (context: vscode.ExtensionContext) => {
  const disposable = vscode.commands.registerCommand('ficommitgen-vscode.setToken', async () => {
    const context = getContext();

    const newToken = await showInputToken();
    if (!newToken) {
      return;
    }

    await context.secrets.store(TOKEN_KEY, newToken);
    vscode.window.showInformationMessage('Token berhasil disimpan (ditimpa jika sebelumnya sudah ada).');
  });

  context.subscriptions.push(disposable);
};
