"use client";

import Link from 'next/link';
import React from 'react';
import Image from 'next/image';
import { IState } from '@/models/State';
import { motion } from 'framer-motion';

// Use a Partial type since we might not have all fields populated in all views, 
// or manually define the props interface to match what we actually pass.
interface StateCardProps {
    state: Partial<IState> & { _id: string; name: string; image: string; description: string };
    index?: number;
}

const StateCard: React.FC<StateCardProps> = ({ state, index = 0 }) => {
    const [imgSrc, setImgSrc] = React.useState(state.image || '/placeholder.png');

    return (
        <Link href={`/explore?stateId=${state._id}`} className="block group">
            <div
                className="relative overflow-hidden rounded-2xl aspect-[4/5] shadow-md hover:shadow-xl transition-all duration-300"
            >
                <div className="absolute inset-0 bg-gray-200 animate-pulse" /> {/* Placeholder */}
                <Image
                    src={imgSrc}
                    alt={state.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    onError={() => setImgSrc('/placeholder.png')}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

                <div className="absolute bottom-0 left-0 p-6 w-full transform transition-transform duration-300 group-hover:-translate-y-2 relative z-10">
                    <span className="inline-block px-3 py-1 mb-3 text-xs font-semibold tracking-wider text-white uppercase bg-orange-600 rounded-full">
                        Explore
                    </span>
                    <h3 className="text-2xl font-bold text-white mb-2">{state.name}</h3>
                    <p className="text-gray-200 line-clamp-2 text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100 transform translate-y-4 group-hover:translate-y-0">
                        {state.description}
                    </p>
                </div>
            </div>
        </Link>
    );
};

export default StateCard;
