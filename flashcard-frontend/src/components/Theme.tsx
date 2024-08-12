
import { MoonIcon, SunIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

export function ModeToggle() {
  const [themeToggle, setThemeToggle] = useState<boolean>(false);

  useEffect(() => {
    const localTheme = localStorage.getItem("theme");
    if (localTheme) {
      if (localTheme === "light") {
        document.documentElement.classList.add("light");
        setThemeToggle(true);
      } else {
        document.documentElement.classList.remove("light");
      }
    } else {
      localStorage.setItem("theme", "dark");
      document.documentElement.classList.remove("light");
    }
  }, []);

  useEffect(() => {
    if (themeToggle) {
      document.documentElement.classList.add("light");
      localStorage.setItem("theme", "light");
    } else {
      document.documentElement.classList.remove("light");
      localStorage.setItem("theme", "dark");
    }
  }, [themeToggle]);

  const handleThemeToggle = () => {
    setThemeToggle((prev) => !prev);
  };

  return (
    <Button variant="ghost" size="icon" onClick={handleThemeToggle}>
      <SunIcon className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0 ease-linear" />
      <MoonIcon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all ease-linear dark:rotate-0 dark:scale-100" />
    </Button>
  );
}
