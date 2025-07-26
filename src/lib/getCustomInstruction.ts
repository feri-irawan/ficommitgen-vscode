import { Repository } from '../types';
import path from 'path';
import * as vscode from 'vscode';

const getCustomInstruction = async (repo: Repository) => {
  try {
    const filePath = path.join(repo.rootUri.fsPath, 'ficommitgen.md');
    const fileContent = await vscode.workspace.fs.readFile(vscode.Uri.file(filePath));
    const content = Buffer.from(fileContent).toString();

    if (content.trim().length === 0) {
      return undefined;
    }

    return content;
  } catch (error) {
    return undefined;
  }
};

export default getCustomInstruction;
