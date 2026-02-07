'use client';

import { useEffect } from 'react';
import Container from '@/components/ui/Container';

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        console.error(error);
    }, [error]);

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <Container>
                <div className="max-w-md mx-auto bg-white p-8 rounded-2xl shadow-xl text-center border border-red-50">
                    <div className="w-16 h-16 bg-red-100 text-red-500 rounded-full flex items-center justify-center mx-auto mb-6">
                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" /></svg>
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">Something went wrong!</h2>
                    <p className="text-gray-600 mb-6">
                        We encountered an unexpected error. This might be due to a database connection issue or a temporary glitch.
                    </p>
                    <div className="p-4 bg-gray-100 rounded-lg text-sm font-mono text-left mb-6 overflow-auto max-h-32 text-red-600">
                        {error.message || "Unknown error occurred"}
                    </div>
                    <button
                        onClick={() => reset()}
                        className="px-6 py-2.5 bg-orange-600 text-white font-semibold rounded-lg hover:bg-orange-700 transition-colors"
                    >
                        Try Again
                    </button>
                </div>
            </Container>
        </div>
    );
}
