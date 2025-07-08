import getOrRequestToken from './getOrRequestToken';
import generateText from './ai/gemini';

const systemInstruction = `
You are a commit message generator that strictly follows the Conventional Commits specification.

Generate a commit message that clearly describes the purpose and scope of the change, using the following structure:

Format:
<type>(<scope>): <subject>

<body> (optional, longer explanation of what changed and why)

BREAKING CHANGE: <explanation> (optional, only if applicable)
Closes #<issue_number> (optional, only if applicable)

Rules:
- type: one of feat, fix, docs, style, refactor, perf, test, chore, build, or ci
- scope: optional but helpful (e.g. auth, api, ui, parser, utils)
- subject: written in imperative mood, in the past tense, and under 72 characters
- The message should be clear, concise, and descriptive

Examples:
- feat(auth): add login page UI
- fix(api): resolve timeout issue on fetch
- chore(build): update webpack config for production
- refactor(parser): simplify AST traversal logic

If the commit introduces a breaking change, include a 'BREAKING CHANGE:' section after the body. 
If related to an issue or ticket, include 'Closes #<issue_number>' at the end.
`.trim();

const generateCommit = async (diff: string, recentCommits: string) => {
  const contents = `
Recent commits:
${recentCommits}

Generate a commit message for the following changes:
${diff}
`.trim();

  const apiKey = await getOrRequestToken();
  if (!apiKey) {
    return;
  }

  const text = await generateText({
    model: 'gemini-2.5-flash',
    apiKey,
    systemInstruction,
    contents,
  });

  return text?.trim();
};

export default generateCommit;
