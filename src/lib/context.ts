import * as vscode from 'vscode';

let context: vscode.ExtensionContext;

export const setContext = (ctx: vscode.ExtensionContext) => {
  context = ctx;
};

export const getContext = () => {
  if (!context) {
    throw new Error('Extension context is not initialized');
  }
  return context;
};
