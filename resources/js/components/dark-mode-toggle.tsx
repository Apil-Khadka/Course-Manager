import React, { useState, useEffect } from "react";
import { Sun, Moon } from "lucide-react";

const DarkModeToggle: React.FC = () => {
    const [isDark, setIsDark] = useState<boolean>(false);

    useEffect(() => {
        const isDarkMode = localStorage.getItem("darkMode") === "true";
        setIsDark(isDarkMode);
        updateTheme(isDarkMode);
    }, []);

    const updateTheme = (darkMode: boolean) => {
        if (darkMode) {
            document.documentElement.classList.add("dark");
        } else {
            document.documentElement.classList.remove("dark");
        }
        localStorage.setItem("darkMode", darkMode.toString());
    };

    const toggleTheme = () => {
        const newDarkMode = !isDark;
        setIsDark(newDarkMode);
        updateTheme(newDarkMode);
    };

    return (
        <button
            onClick={toggleTheme}
            className="p-2 rounded-full bg-primary text-primary-foreground transition-all duration-300 ease-in-out hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 dark:focus:ring-offset-gray-800"
            aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
        >
            <span className="sr-only">Toggle theme</span>
            {isDark ? (
                <Sun className="w-5 h-5" />
            ) : (
                <Moon className="w-5 h-5" />
            )}
        </button>
    );
};

export default DarkModeToggle;

