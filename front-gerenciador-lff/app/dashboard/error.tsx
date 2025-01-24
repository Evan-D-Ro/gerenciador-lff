'use client';

import { useEffect } from 'react';

export default function Error({
  error,
  reset
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-6">
      <div className="text-center space-y-6">
        <h1 className="text-2xl font-bold text-gray-800">
          Oops! Algo deu errado.
        </h1>
        <p className="text-gray-600">
          Parece que houve um problema ao carregar esta página. Por favor, tente novamente.
        </p>
        <button
          onClick={reset}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-300"
        >
          Tentar novamente
        </button>
      </div>
    </main>
  );
}
