import { create } from 'zustand'

const useAuthStore = create((set) => ({
    user : null,
    role : null,
    setUser: (user) => set({  user }),
    setRole: (role) => set ({ role }),
    clearUser: () => set({ user: null, role : null }),
}))

export default useAuthStore;
