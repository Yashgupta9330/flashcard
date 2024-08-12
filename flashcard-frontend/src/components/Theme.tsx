import { MoonIcon, SunIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

export function ModeToggle() {
  const [themeToggle, setThemeToggle] = useState<boolean>(() => {
    return localStorage.getItem("theme") === "light";
  });

  useEffect(() => {
    if (themeToggle) {
        document.body.setAttribute("data-theme", "light");
        localStorage.setItem("theme", "light");
      } else {
        document.body.setAttribute("data-theme", "dark");
        localStorage.setItem("theme", "dark");
      }
  }, [themeToggle]);

  const handleThemeToggle = () => {
    setThemeToggle(prev => !prev);
  };

  return (
    <Button variant="ghost" size="icon" onClick={handleThemeToggle}>
      <SunIcon
        className={`h-[1.2rem] w-[1.2rem] transition-all ease-linear ${themeToggle ? 'opacity-100' : 'opacity-0'}`}
      />
      <MoonIcon
        className={`absolute h-[1.2rem] w-[1.2rem] transition-all ease-linear ${themeToggle ? 'opacity-0' : 'opacity-100'}`}
      />
    </Button>
  );
}
