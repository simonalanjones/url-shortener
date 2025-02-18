import React, { useEffect, useState } from "react";

const ThemeToggle = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Synchronise with system's theme on mount
  useEffect(() => {
    const isSystemDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    setIsDarkMode(isSystemDark);

    // Optional: Listen for changes in the system theme
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = (e) => setIsDarkMode(e.matches);

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  const handleToggle = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle("dark", !isDarkMode); // Update <html> class for Tailwind dark mode
  };

  return (
    <label className="relative inline-flex cursor-pointer items-center">
      <input
        id="switch"
        type="checkbox"
        className="peer sr-only"
        checked={isDarkMode}
        onChange={handleToggle}
      />
      <div className="peer h-6 w-11 rounded-full border bg-slate-200 after:absolute after:left-[2px] after:top-0.5 after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-slate-800 peer-checked:after:translate-x-full peer-checked:after:border-white"></div>
    </label>
  );
};

export default ThemeToggle;
