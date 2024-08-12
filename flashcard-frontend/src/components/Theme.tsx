import { MoonIcon, SunIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

export function ModeToggle() {
  const [themeToggle, setThemeToggle] = useState<boolean>(() => {
    const savedTheme = localStorage.getItem("theme");
    return savedTheme === "light"; 
  });

  useEffect(() => { 
    document.documentElement.classList.remove("light", "dark");
    if (themeToggle) {
      document.documentElement.classList.add("light");
      localStorage.setItem("theme", "light");
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    }
  }, [themeToggle]);

  useEffect(() => {
      document.documentElement.classList.add("dark");
  }, []);

  const handleThemeToggle = () => {
    setThemeToggle(prev => !prev);
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={handleThemeToggle}
      aria-label="Toggle theme"
    >
      <SunIcon
        className={`h-[1.2rem] w-[1.2rem] transition-all ease-linear ${themeToggle ? 'opacity-100' : 'opacity-0'}`}
      />
      <MoonIcon
        className={`absolute h-[1.2rem] w-[1.2rem] transition-all ease-linear ${themeToggle ? 'opacity-0' : 'opacity-100'}`}
      />
    </Button>
  );
}
