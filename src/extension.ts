// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from "vscode";
import { checkUpdates } from "./install";
import { formatDocument } from "./formatting";

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(ctx: vscode.ExtensionContext) {
  checkUpdates();

  ctx.subscriptions.push(
    vscode.commands.registerCommand("autocorrect.format", () => {
      const document = vscode.window.activeTextEditor?.document;
      if (document) {
        formatDocument(document);
      }
    })
  );

  ctx.subscriptions.push(
    vscode.workspace.onDidSaveTextDocument((document) => {
      const config = vscode.workspace.getConfiguration("autocorrect");
      if (config["formatOnSave"]) {
        formatDocument(document);
      }
    })
  );
}

// this method is called when your extension is deactivated
export function deactivate() {}
