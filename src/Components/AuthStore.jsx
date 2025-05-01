import { create } from 'zustand'

const useAuthStore = create((set) => ({
    user : null,
    searchQuery: "",
    setUser: (user) => set({  user }),
    clearUser: () => set({ user: null }),
    setSearchQuery: (query) => set({ searchQuery: query }),
}))

export default useAuthStore;
