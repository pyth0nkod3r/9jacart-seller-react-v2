export type PopupType = 'success' | 'error' | 'info' | 'warning';

export interface PopupConfig {
  message: string;
  type?: PopupType;
  duration?: number;
}

interface PopupInstance {
  showPopup: (config: PopupConfig) => void;
  hidePopup: () => void;
}

let popupInstance: PopupInstance | null = null;

export const setPopupInstance = (instance: PopupInstance) => {
  popupInstance = instance;
};

const show = (message: string, type: PopupType = 'info') => {
  console.log(`[${type.toUpperCase()}] ${message}`);
  if (popupInstance) {
    popupInstance.showPopup({ message, type });
  } else {
    if (type === 'error') {
      alert(message);
    }
  }
};

export const popup = {
  show,
  success: (message: string) => show(message, 'success'),
  error: (message: string) => show(message, 'error'),
  info: (message: string) => show(message, 'info'),
  warning: (message: string) => show(message, 'warning'),
};
