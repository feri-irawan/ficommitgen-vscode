# ficommitgen-vscode

`ficommitgen-vscode` is a Visual Studio Code extension that generates commit messages automatically using Google Gemini AI (currently) based on changes (`git diff`) in your Git repository.

## ✨ Features

- 🔍 Automatically reads `git diff` and `git log` for more accurate context
- 🧠 Generates commit messages using AI, following the [Conventional Commits](https://www.conventionalcommits.org) specification
- 📋 Automatically inserts the generated message into the Source Control input box
- 🧩 Integrated with VS Code's built-in Git UI (button in the Source Control title)
- 🛡️ API token is securely stored using VS Code's SecretStorage (not `settings.json`)
- 📝 Customizable configuration in `ficommitgen.md`

## 🛠️ Requirements

- VS Code version 1.101.0 or later
- A Git repository must be initialized (`git init`)
- A Google Gemini API token (you'll be prompted on first use)

## 🚀 Usage

### Generate Commit Message

You can generate a commit message in two ways:

1. Open the Source Control panel
2. Click the "Generate Commit" button (sparkle ✨ icon) in the Source Control title

**OR**

1. Open the Command Palette (`Ctrl+Shift+P` on Windows/Linux, `Cmd+Shift+P` on macOS, or `F1`)
2. Select **"Ficommitgen: Generate Commit"**

> Note: If you have staged changes, it will try to generate commit message based on staged changes first. If not, it will generate commit message based on unstaged changes.

### Set Token

To reset or update your API token:

1. Open the Command Palette
2. Select **"Ficommitgen: Set Token"**

## ⚙️ Extension Settings

There are currently no settings configurable via `settings.json`. You can configure the extension by editing `ficommitgen.md`.

```markdown
---
recentCommitsCount: 20
---

Your custom system instruction here...
```

### Configuration Options

- `recentCommitsCount`: Number of recent commits to consider (default is 20)
- The content of `ficommitgen.md` is passed as the system instruction to the AI (optional)

## 🐛 Known Issues

- If your project is not initialized as a Git repository, the extension will not work.
- If the Gemini API token is missing, incorrect, or rate-limited, commit generation will fail.

## 📦 Build & Install Locally

To build and install the extension manually:

```bash
npm install -g vsce
vsce package
code --install-extension ficommitgen-vscode-0.1.0.vsix
```

## 🤝 Contributing

To contribute to this project:

1. Fork the repository
2. Create a new branch for your feature or fix
3. Commit your changes
4. Push your branch
5. Open a pull request

---

**Enjoy using `ficommitgen-vscode`! 🎉**
