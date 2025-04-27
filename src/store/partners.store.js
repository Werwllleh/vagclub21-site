'use client'

import {create} from "zustand";

export const usePartnersStore = create((set) => ({
  filteredPartners: [],
  updateFilteredPartners: (partners) => set(() => ({filteredPartners: partners})),
  loading: false,
  updateLoading: (status) => set(() => ({loading: status})),
}))
