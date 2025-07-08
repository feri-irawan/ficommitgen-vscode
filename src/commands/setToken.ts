import * as vscode from 'vscode';
import { getContext } from '../lib/context';

const TOKEN_KEY = 'ficommitgen.token';

export const showInputToken = async () => {
  const token = await vscode.window.showInputBox({
    prompt: 'Enter your Gemini API token',
    ignoreFocusOut: true,
    password: true,
    placeHolder: 'Example: AIzaSy...',
    validateInput: (value) => (value.trim().length === 0 ? 'Token cannot be empty' : undefined),
  });

  if (!token) {
    vscode.window.showWarningMessage('Token not entered.');
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
    vscode.window.showInformationMessage('Token successfully saved (overwritten if already exists).');
  });

  context.subscriptions.push(disposable);
};
