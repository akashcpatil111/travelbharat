'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Search } from 'lucide-react';
import Container from './ui/Container';
import { motion } from 'framer-motion';

const Hero = () => {
    const router = useRouter();
    const [query, setQuery] = useState('');

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (query.trim()) {
            router.push(`/explore?search=${encodeURIComponent(query)}`);
        }
    };

    return (
        <div className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden">
            {/* Background Image with Overlay */}
            <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/30 to-black/80 z-10" />
                <img
                    src="https://images.unsplash.com/photo-1548013146-72479768bada?q=80&w=2976&auto=format&fit=crop"
                    alt="Taj Mahal India"
                    className="w-full h-full object-cover object-center scale-105 animate-slow-zoom"
                />
            </div>

            <Container className="relative z-20 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="max-w-3xl mx-auto space-y-8"
                >
                    <div className="space-y-4">
                        <span className="inline-block px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white/90 text-sm font-medium tracking-wide">
                            Discover the Soul of India
                        </span>
                        <h1 className="text-5xl md:text-8xl font-serif font-bold text-white tracking-tight leading-tight drop-shadow-2xl">
                            Explore India's <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-yellow-200 to-orange-400">
                                Timeless Beauty
                            </span>
                        </h1>
                        <p className="text-lg md:text-xl text-gray-200 max-w-2xl mx-auto leading-relaxed">
                            From the snow-capped Himalayas to the tropical backwaters of Kerala, guide your journey through India's rich heritage and diverse landscapes.
                        </p>
                    </div>

                    <form onSubmit={handleSearch} className="relative max-w-xl mx-auto mt-8">
                        <div className="relative group">
                            <div className="absolute -inset-1 bg-gradient-to-r from-orange-500 to-pink-500 rounded-full blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200" />
                            <div className="relative flex items-center bg-white rounded-full shadow-2xl p-2">
                                <Search className="ml-4 text-gray-400" size={20} />
                                <input
                                    type="text"
                                    placeholder="Search destinations, states, or cities..."
                                    className="w-full px-4 py-3 text-gray-700 bg-transparent outline-none placeholder:text-gray-400"
                                    value={query}
                                    onChange={(e) => setQuery(e.target.value)}
                                />
                                <button
                                    type="submit"
                                    className="px-6 py-3 rounded-full bg-black text-white font-medium hover:bg-gray-800 transition-colors"
                                >
                                    Search
                                </button>
                            </div>
                        </div>
                    </form>

                    <div className="pt-8 flex flex-wrap justify-center gap-4 text-sm text-white/60">
                        <span className="uppercase tracking-widest text-xs font-semibold text-white/40 mb-2 block w-full">Popular:</span>
                        {['Taj Mahal', 'Goa Beaches', 'Jaipur Forts', 'Kerala Backwaters'].map((item) => (
                            <button
                                key={item}
                                onClick={() => router.push(`/explore?search=${encodeURIComponent(item)}`)}
                                className="px-4 py-1.5 rounded-md border border-white/10 hover:bg-white/10 transition-colors"
                            >
                                {item}
                            </button>
                        ))}
                    </div>
                </motion.div>
            </Container>
        </div>
    );
};

export default Hero;
