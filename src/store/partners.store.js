'use client'

import {create} from "zustand";

export const usePartnersStore = create((set) => ({
  filteredPartners: [],
  setFilteredPartners: (partners) => set(() => ({filteredPartners: partners})),
  filterPartnersLoading: false,
  setFilterPartnersLoading: (status) => set(() => ({filterPartnersLoading: status})),
}))
