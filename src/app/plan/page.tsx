'use client';

import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Container from '@/components/ui/Container';
import { motion } from 'framer-motion';
import { Sparkles, Map, Calendar, Loader2 } from 'lucide-react';

export default function PlanTripPage() {
    const [step, setStep] = useState(1);
    const [loading, setLoading] = useState(false);
    const [preferences, setPreferences] = useState({
        vibe: '',
        duration: '',
        budget: ''
    });

    const [result, setResult] = useState<null | { title: string; places: string[] }>(null);

    const handleGenerate = () => {
        setLoading(true);
        // Simulate AI thinking time
        setTimeout(() => {
            setLoading(false);
            setStep(3);

            // Simple mock logic for demo
            let title = "The Royal Rajasthan Route";
            let places = ["Jaipur City Palace", "Amber Fort", "Udaipur Lake Pichola"];

            if (preferences.vibe === 'Nature') {
                title = "Kerala's Tropical Paradise";
                places = ["Munnar Tea Gardens", "Alleppey Houseboat", "Varkala Beach"];
            } else if (preferences.vibe === 'Spiritual') {
                title = "The Path of Enlightenment";
                places = ["Varanasi Ghats", "Rishikesh Yoga Centers", "Golden Temple Amritsar"];
            } else if (preferences.vibe === 'Adventure') {
                title = "Himalayan Thrills";
                places = ["Solang Valley Paragliding", "Rishikesh Rafting", "Ladakh Bike Trip"];
            }

            setResult({ title, places });
        }, 2000);
    };

    return (
        <main className="min-h-screen bg-gray-50 flex flex-col">
            <Navbar />

            <div className="flex-1 pt-32 pb-20">
                <Container>
                    <div className="max-w-3xl mx-auto">
                        <div className="text-center mb-12">
                            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-100 text-purple-700 text-sm font-medium mb-4">
                                <Sparkles size={16} />
                                AI Powered
                            </span>
                            <h1 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-4">
                                VoyageAI Planner
                            </h1>
                            <p className="text-gray-500 text-lg">
                                Tell us your travel style, and our AI will craft the perfect Indian itinerary for you.
                            </p>
                        </div>

                        <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100 min-h-[400px]">

                            {step === 1 && (
                                <motion.div
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    className="space-y-8"
                                >
                                    <div>
                                        <label className="block text-gray-700 font-medium mb-3">What's your travel vibe?</label>
                                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                            {['Heritage', 'Nature', 'Spiritual', 'Adventure'].map((vib) => (
                                                <button
                                                    key={vib}
                                                    onClick={() => setPreferences({ ...preferences, vibe: vib })}
                                                    className={`p-4 rounded-xl border text-left transition-all ${preferences.vibe === vib
                                                            ? 'border-purple-500 bg-purple-50 ring-2 ring-purple-200'
                                                            : 'border-gray-200 hover:border-purple-300 hover:bg-gray-50'
                                                        }`}
                                                >
                                                    <span className="font-semibold block">{vib}</span>
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-gray-700 font-medium mb-3">How many days?</label>
                                        <select
                                            className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-200 outline-none"
                                            onChange={(e) => setPreferences({ ...preferences, duration: e.target.value })}
                                        >
                                            <option value="">Select duration</option>
                                            <option value="3-5">3-5 Days</option>
                                            <option value="6-10">6-10 Days</option>
                                            <option value="10+">10+ Days</option>
                                        </select>
                                    </div>

                                    <button
                                        disabled={!preferences.vibe || !preferences.duration}
                                        onClick={handleGenerate}
                                        className="w-full py-4 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-xl font-bold text-lg hover:opacity-90 disabled:opacity-50 transition-all flex items-center justify-center gap-2"
                                    >
                                        {loading ? <Loader2 className="animate-spin" /> : 'Generate My Journey'}
                                    </button>
                                </motion.div>
                            )}

                            {loading && (
                                <div className="h-full flex flex-col items-center justify-center py-20">
                                    <Loader2 className="w-12 h-12 text-purple-600 animate-spin mb-4" />
                                    <h3 className="text-xl font-bold text-gray-800">Curating your experience...</h3>
                                    <p className="text-gray-500">Analyzing thousands of destinations</p>
                                </div>
                            )}

                            {step === 3 && result && (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="text-center"
                                >
                                    <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                                        <Map size={32} />
                                    </div>
                                    <h2 className="text-3xl font-serif font-bold text-gray-900 mb-2">{result.title}</h2>
                                    <p className="text-gray-500 mb-8">Based on your love for {preferences.vibe}</p>

                                    <div className="bg-gray-50 rounded-xl p-6 text-left mb-8">
                                        <h4 className="font-bold text-gray-700 mb-4 flex items-center gap-2">
                                            <Calendar size={18} /> Recommended Stops
                                        </h4>
                                        <div className="space-y-4">
                                            {result.places.map((place, idx) => (
                                                <div key={idx} className="flex items-center gap-4 bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                                                    <div className="w-8 h-8 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center font-bold text-sm">
                                                        {idx + 1}
                                                    </div>
                                                    <span className="font-medium text-gray-800">{place}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    <button
                                        onClick={() => setStep(1)}
                                        className="text-gray-500 font-medium hover:text-purple-600 underline"
                                    >
                                        Plan another trip
                                    </button>
                                </motion.div>
                            )}

                        </div>
                    </div>
                </Container>
            </div>

            <Footer />
        </main>
    );
}
