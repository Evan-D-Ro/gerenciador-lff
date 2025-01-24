'use client';

import { useTransition } from 'react';
import { Spinner } from '@/components/icons';
import { Search } from 'lucide-react';
import { useState, useEffect } from 'react';

export function ColorMode() {

  const [theme, setTheme] = useState<string>('light'); // Inicialize com 'light'


  const [isPending, startTransition] = useTransition();
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme); // Salva no localStorage
  };

  useEffect(() => {
    const storedTheme = localStorage.getItem('theme');
    if (storedTheme) {
      setTheme(storedTheme);
    }

    if (theme === 'dark')
      setIsDarkMode(true);
    else
      setIsDarkMode(false);
    document.body.className = theme; // Define a classe no body
  }, [theme]);

  return (
    <div className="relative ml-auto flex-1 md:grow-0 flex items-center">
      <button
        onClick={toggleTheme}
        className="p-2 rounded bg-gray-200 hover:bg-gray-300 dark:bg-gray-800 dark:text-white flex items-center justify-center w-[50px]"
      >
        {/* Usando o ícone do Font Awesome */}
        <i
          className={`${isDarkMode ? 'fas fa-sun' : 'fas fa-moon'
            } text-xl`} // Altera o ícone conforme o tema
        ></i>
      </button>
      {isPending && (
        <div className="ml-2">
          <Spinner />
        </div>
      )}
    </div>
  );
}
