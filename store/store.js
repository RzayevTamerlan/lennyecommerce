import {create} from 'zustand'

export const useToggle = create((set) => ({
  isBurgerOpen: false,
  toggleBurger: () => set((state) => ({isBurgerOpen: !state.isBurgerOpen})),
  closeBurger: () => set({isBurgerOpen: false}),
}));
export const useFilterOpen = create((set) => ({
  isFilterOpen: false,
  toggleFilter: () => set((state) => ({isFilterOpen: !state.isFilterOpen})),
  closeFilter: () => set({isFilterOpen: false}),
}))
export const useAuto = create((set) => ({
  isAutoOpen: false,
  openAuto: () => set((state) => ({isAutoOpen: true})),
  closeAuto: () => set({isAutoOpen: false}),
  toggleAuto: () => set((state) => ({isAutoOpen: !state.isAutoOpen})),
}))
export const useUser = create((set) => ({
  isUserRegistered: false,
  registerUser: () => set({isUserRegistered: true}),
  unregisterUser: () => set({isUserRegistered: false}),
}));
export const useUserMenu = create((set) => ({
  isUserMenuOpen: false,
  openUserMenu: () => set({isUserMenuOpen: true}),
  closeUserMenu: () => set({isUserMenuOpen: false}),
  toggleUserMenu: () => set((state) => ({isUserMenuOpen: !state.isUserMenuOpen})),
}));
export const useCommentsFilter = create((set) => ({
  isCommentFilterOpen: false,
  openFilter: () => set({isCommentFilterOpen: true}),
  IsCommentFilterClose: () => set({isCommentFilterOpen: false}),
  IsCommentFilterToggle: () => set((state) => ({isCommentFilterOpen: !state.isCommentFilterOpen})),
}));
export const useBasket = create((set) => ({
  basketProducts: null,
  basketChanged: (isChanged) => set((state) => ({basketProducts: isChanged}))
}))