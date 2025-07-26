import matter from 'gray-matter';
import { Repository } from '../types';
import path from 'path';
import * as vscode from 'vscode';

type Config = {
  recentCommitsCount: number;
  instruction: string;
};

const getConfig = async (repo: Repository) => {
  try {
    const filePath = path.join(repo.rootUri.fsPath, 'ficommitgen.md');
    const fileContent = await vscode.workspace.fs.readFile(vscode.Uri.file(filePath));
    const content = Buffer.from(fileContent).toString();

    if (content.trim().length === 0) {
      return;
    }

    const parsed = matter(content);

    return {
      ...parsed.data,
      instruction: parsed.content.trim(),
    } as Config;
  } catch (error) {
    return;
  }
};

export default getConfig;
