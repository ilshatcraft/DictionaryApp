
import create from 'zustand'
export const authStore = create((set) => ({

  token: localStorage.getItem('token') || null,
  setToken: (token) => {
    set({ token });
    localStorage.setItem('token', token);
  },
  removeToken: () => {
    set({ token: null });
    localStorage.removeItem('token');
  },

}));
export default authStore
