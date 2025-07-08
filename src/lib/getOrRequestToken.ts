import * as vscode from 'vscode';
import { getContext } from './context';

const TOKEN_KEY = 'ficommitgen.token';

const getOrRequestToken = async (): Promise<string | undefined> => {
  const context = getContext();

  const secretStorage = context.secrets;
  let token = await secretStorage.get(TOKEN_KEY);

  if (!token) {
    token = await vscode.window.showInputBox({
      prompt: 'Masukkan token API Gemini kamu',
      ignoreFocusOut: true,
      password: true,
      placeHolder: 'Contoh: AIzaSy...',
      validateInput: (value) => (value.trim().length === 0 ? 'Token tidak boleh kosong' : undefined),
    });

    if (token) {
      await secretStorage.store(TOKEN_KEY, token);
      vscode.window.showInformationMessage('✅ Token berhasil disimpan!');
    } else {
      vscode.window.showWarningMessage('⚠️ Token tidak dimasukkan. Beberapa fitur mungkin tidak bisa digunakan.');
    }
  }

  return token;
};

export default getOrRequestToken;
