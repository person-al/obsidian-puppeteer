import { App, PluginSettingTab } from "obsidian";
import UrlToPDF from "./main";

export class SettingTab extends PluginSettingTab {
  plugin: UrlToPDF;

  constructor(app: App, plugin: UrlToPDF) {
    super(app, plugin);
    this.plugin = plugin;
  }

  display(): void {
    let { containerEl } = this;
    containerEl.empty();
  }
}
