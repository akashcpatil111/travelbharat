import Link from 'next/link';
import Container from './ui/Container';
import { MapPin, Instagram, Twitter, Facebook, Mail } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-gray-900 text-white pt-16 pb-8 border-t border-gray-800">
            <Container>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
                    <div className="col-span-1 md:col-span-1">
                        <Link href="/" className="flex items-center gap-2 mb-6">
                            <div className="bg-orange-500 p-1.5 rounded-lg text-white">
                                <MapPin size={24} />
                            </div>
                            <span className="text-2xl font-bold tracking-tight">
                                Travel<span className="text-orange-500">Bharat</span>
                            </span>
                        </Link>
                        <p className="text-gray-400 leading-relaxed mb-6">
                            Your ultimate guide to exploring the rich heritage, diverse culture, and breathtaking landscapes of India.
                        </p>
                        <div className="flex gap-4">
                            <a href="#" className="p-2 rounded-full bg-gray-800 text-gray-400 hover:bg-orange-500 hover:text-white transition-all">
                                <Instagram size={18} />
                            </a>
                            <a href="#" className="p-2 rounded-full bg-gray-800 text-gray-400 hover:bg-orange-500 hover:text-white transition-all">
                                <Twitter size={18} />
                            </a>
                            <a href="#" className="p-2 rounded-full bg-gray-800 text-gray-400 hover:bg-orange-500 hover:text-white transition-all">
                                <Facebook size={18} />
                            </a>
                        </div>
                    </div>

                    <div>
                        <h3 className="font-semibold text-lg mb-6">Quick Links</h3>
                        <ul className="space-y-4">
                            <li><Link href="/" className="text-gray-400 hover:text-orange-500 transition-colors">Home</Link></li>
                            <li><Link href="/explore" className="text-gray-400 hover:text-orange-500 transition-colors">Destinations</Link></li>
                            <li><Link href="/about" className="text-gray-400 hover:text-orange-500 transition-colors">About Us</Link></li>
                            <li><Link href="/contact" className="text-gray-400 hover:text-orange-500 transition-colors">Contact</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="font-semibold text-lg mb-6">Categories</h3>
                        <ul className="space-y-4">
                            <li><Link href="/explore?category=Heritage" className="text-gray-400 hover:text-orange-500 transition-colors">Heritage</Link></li>
                            <li><Link href="/explore?category=Nature" className="text-gray-400 hover:text-orange-500 transition-colors">Nature</Link></li>
                            <li><Link href="/explore?category=Religious" className="text-gray-400 hover:text-orange-500 transition-colors">Spiritual</Link></li>
                            <li><Link href="/explore?category=Adventure" className="text-gray-400 hover:text-orange-500 transition-colors">Adventure</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="font-semibold text-lg mb-6">Contact</h3>
                        <ul className="space-y-4">
                            <li className="flex items-start gap-3">
                                <MapPin className="text-orange-500 shrink-0 mt-1" size={18} />
                                <span className="text-gray-400">123 Tourism Plaza, New Delhi, India 110001</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <Mail className="text-orange-500 shrink-0" size={18} />
                                <span className="text-gray-400">hello@travelbharat.com</span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-gray-500 text-sm">
                    <p>&copy; {new Date().getFullYear()} TravelBharat. All rights reserved.</p>
                    <div className="flex gap-6">
                        <Link href="#" className="hover:text-white">Privacy Policy</Link>
                        <Link href="#" className="hover:text-white">Terms of Service</Link>
                    </div>
                </div>
            </Container>
        </footer>
    );
};

export default Footer;
