// ========================================
// Theme Toggle
// ========================================

(function () {
  "use strict";

  // DOM Elements
  const themeToggle = document.getElementById("themeToggle");
  const htmlElement = document.documentElement;

  // Get saved theme from localStorage
  const getSavedTheme = () => {
    return localStorage.getItem("theme");
  };

  // Get system preference
  const getSystemTheme = () => {
    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  };

  // Get current theme
  const getCurrentTheme = () => {
    return htmlElement.getAttribute("data-theme") || "light";
  };

  // Set theme
  const setTheme = (theme) => {
    htmlElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);

    // Update ARIA label on toggle button
    if (themeToggle) {
      const isDark = theme === "dark";
      themeToggle.setAttribute(
        "aria-label",
        isDark ? "Switch to light mode" : "Switch to dark mode",
      );
    }
  };

  // Toggle theme
  const toggleTheme = () => {
    const currentTheme = getCurrentTheme();
    const newTheme = currentTheme === "dark" ? "light" : "dark";
    setTheme(newTheme);
  };

  // Initialize theme
  const initTheme = () => {
    // Check for saved theme
    const savedTheme = getSavedTheme();

    if (savedTheme) {
      setTheme(savedTheme);
    } else {
      // Use system preference
      const systemTheme = getSystemTheme();
      setTheme(systemTheme);
    }
  };

  // Add event listener
  if (themeToggle) {
    themeToggle.addEventListener("click", toggleTheme);
  }

  // Listen for system theme changes
  window
    .matchMedia("(prefers-color-scheme: dark)")
    .addEventListener("change", (e) => {
      if (!localStorage.getItem("theme")) {
        setTheme(e.matches ? "dark" : "light");
      }
    });

  // Initialize
  initTheme();

  console.log("🌓 Theme toggle initialized");
})();
