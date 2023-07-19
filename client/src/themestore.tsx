
import create from 'zustand'
export const themeStore = create((set) => ({

  theme: localStorage.getItem('theme') || 'light',
  setTheme: (theme:string) => {
    set({ theme });
    localStorage.setItem('theme', theme);
  },
  removeTheme: () => {
    set({ theme: null });
    localStorage.removeItem('theme');
  },

}));
export default themeStore
