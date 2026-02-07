'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import Container from './ui/Container';
import { Menu, X, MapPin } from 'lucide-react';
import clsx from 'clsx';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { name: 'Home', href: '/' },
        { name: 'Explore', href: '/explore' },
        { name: 'Plan Trip', href: '/plan' },
        { name: 'About', href: '/about' },
        { name: 'Admin', href: '/admin' },
    ];

    return (
        <nav
            className={clsx(
                'fixed top-0 z-50 w-full transition-all duration-300',
                scrolled
                    ? 'bg-white/80 backdrop-blur-md shadow-sm border-b border-gray-100 py-3'
                    : 'bg-transparent py-5'
            )}
        >
            <Container className="flex items-center justify-between">
                <Link href="/" className="flex items-center gap-2 group">
                    <div className="bg-orange-500 p-1.5 rounded-lg text-white group-hover:scale-110 transition-transform">
                        <MapPin size={24} />
                    </div>
                    <span className={clsx("text-2xl font-bold tracking-tight font-serif", scrolled ? "text-gray-900" : "text-white")}>
                        Travel<span className="text-orange-500">Bharat</span>
                    </span>
                </Link>

                {/* Desktop Menu */}
                <div className="hidden md:flex items-center gap-8">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            className={clsx(
                                "font-medium transition-colors hover:text-orange-500",
                                scrolled ? "text-gray-700" : "text-white/90 hover:text-white"
                            )}
                        >
                            {link.name}
                        </Link>
                    ))}
                    <Link
                        href="/explore"
                        className="px-5 py-2.5 rounded-full bg-orange-600 text-white font-medium hover:bg-orange-700 transition-all shadow-lg shadow-orange-500/20 hover:shadow-orange-500/40"
                    >
                        Start Exploring
                    </Link>
                </div>

                {/* Mobile Menu Button */}
                <button
                    className={clsx("md:hidden p-2 rounded-lg", scrolled ? "text-gray-900" : "text-white")}
                    onClick={() => setIsOpen(!isOpen)}
                >
                    {isOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </Container>

            {/* Mobile Menu Dropdown */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden bg-white border-b border-gray-100 overflow-hidden"
                    >
                        <div className="px-4 pt-2 pb-6 space-y-2">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    onClick={() => setIsOpen(false)}
                                    className="block px-4 py-3 text-lg font-medium text-gray-700 hover:bg-orange-50 hover:text-orange-600 rounded-lg transition-colors"
                                >
                                    {link.name}
                                </Link>
                            ))}
                            <div className="pt-2 px-4">
                                <Link
                                    href="/explore"
                                    onClick={() => setIsOpen(false)}
                                    className="block w-full text-center px-5 py-3 rounded-xl bg-orange-600 text-white font-medium hover:bg-orange-700 transition-colors"
                                >
                                    Start Exploring
                                </Link>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default Navbar;
