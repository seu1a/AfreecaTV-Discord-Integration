import { app, Menu, nativeImage, Tray } from "electron";

class MenuBar {
  public tray: Tray;

  constructor() {
    app.dock.hide(); // 맥의 Dock 아이콘 숨기기
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
        label: "종료",
        type: "normal",
        click: () => app.quit(),
      },
    ]);

    return contextMenu;
  }
}

export default MenuBar;
