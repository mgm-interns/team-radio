export const isElectronInstance = () => !!window.require;

export const getElectronInstance = () => {
  if (window.require) {
    return window.require('electron');
  }
  return {};
};
