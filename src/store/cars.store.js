'use client'

import {create} from "zustand";

export const useCarsStore = create((set) => ({
  filteredCars: [],
  updateFilteredCars: (cars) => set(() => ({filteredCars: cars})),
  loading: false,
  updateLoading: (status) => set(() => ({loading: status})),
}))
