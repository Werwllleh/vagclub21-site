import {create} from "zustand";


export const useUiStore = create((set) => ({
  overlayActive: false,
  setOverlayActive: (value) => set({ overlayActive: value }),
  mobileMenuActive: false,
  setMobileMenuActive: (value) => set({ mobileMenuActive: value }),
}))