"use client";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface ThemeState {
  isDarkMode: boolean;
  toggleTheme: () => void;
}

// export const useThemeStore = (): ThemeState => {
//     const isDarkMode = typeof window !== 'undefined' ? localStorage.getItem('theme') === 'dark' : false;
//     const toggleTheme = () => {
//         if (typeof window === 'undefined') return;
//         if (isDarkMode) {
//             document.documentElement.classList.remove('dark');
//             localStorage.setItem('theme', 'light');
//         }
//         else {
//             document.documentElement.classList.add('dark');
//             localStorage.setItem('theme', 'dark');
//         }
//     };

//     return { isDarkMode, toggleTheme };
// }

export const useThemeStore = create<ThemeState>()(
  persist(
    (set) => ({
      isDarkMode: false,
      toggleTheme: () =>
        set((state) => ({
          isDarkMode: !state.isDarkMode,
        })),
    }),
    {
      name: "theme-storage", // key name in localStorage
    }
  )
);
