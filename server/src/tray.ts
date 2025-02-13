import { app, Menu, nativeImage, Tray } from "electron";
import RPCHandler from "./rpc";

class MenuBar {
  public tray: Tray;

  constructor() {
    app.dock.hide();
    app.setLoginItemSettings({ openAtLogin: true });

    this.tray = new Tray(this.createNativeImage());
    this.tray.setToolTip(app.name);
    this.tray.setContextMenu(this.createMenu());
  }

  createNativeImage() {
    const image = nativeImage.createFromPath(
      `${app.getAppPath()}/assets/logo.png`
    );
    image.setTemplateImage(true);
    return image;
  }

  createMenu(): Menu {
    const contextMenu = Menu.buildFromTemplate([
      {
        label: "재연결",
        type: "normal",
        click: () => RPCHandler.reconnect(),
      },
      {
        label: "종료",
        type: "normal",
        click: () => app.quit(),
      },
    ]);

    return contextMenu;
  }
}

export default MenuBar;
