import * as vscode from 'vscode';

export type GitExtension = {
  getAPI(version: 1): GitAPI;
};

export type GitAPI = {
  repositories: Repository[];
};

export type Repository = {
  rootUri: vscode.Uri;
  state: {
    HEAD: {
      name?: string;
      commit?: string;
    };
    workingTreeChanges: any[];
    indexChanges: any[];
  };
  inputBox: {
    value: string;
  };
};
