'use client'

import {create} from "zustand";

export const usePartnersStore = create((set) => ({
  filterPartnersActive: false,
  setFilterPartnersActive: (status) => set(() => ({filterPartnersActive: status})),
  filteredPartners: [],
  setFilteredPartners: (partners) => set(() => ({filteredPartners: partners})),
  filterPartnersLoading: false,
  setFilterPartnersLoading: (status) => set(() => ({filterPartnersLoading: status})),
}))
