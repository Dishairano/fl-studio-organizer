import { contextBridge, ipcRenderer } from 'electron';

contextBridge.exposeInMainWorld('electron', {
  openExternal: (url: string) => ipcRenderer.invoke('open-external', url),
  getAppVersion: () => ipcRenderer.invoke('get-app-version'),
  getPlatform: () => ipcRenderer.invoke('get-platform'),
});

// Type definitions for TypeScript
declare global {
  interface Window {
    electron: {
      openExternal: (url: string) => Promise<void>;
      getAppVersion: () => Promise<string>;
      getPlatform: () => Promise<string>;
    };
  }
}
