"use client";

import Link from 'next/link';
import Image from 'next/image';
import { IDestination } from '@/models/Destination';
import { MapPin, Calendar, Tag } from 'lucide-react';
import { useState } from 'react';

interface DestinationCardProps {
    destination: Partial<IDestination> & { _id: string; name: string; images: string[]; city: string; category: string; state: any };
}

const DestinationCard: React.FC<DestinationCardProps> = ({ destination }) => {
    const [imgSrc, setImgSrc] = useState(destination.images?.[0] || '/placeholder.png');

    return (
        <div className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col h-full">
            <div className="relative h-64 overflow-hidden">
                <Image
                    src={imgSrc}
                    alt={destination.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    onError={() => setImgSrc('/placeholder.png')}
                />
                <div className="absolute top-4 left-4 z-10">
                    <span className="px-3 py-1 bg-white/90 backdrop-blur-sm text-xs font-bold uppercase tracking-wider rounded-full shadow-sm text-gray-800">
                        {destination.category}
                    </span>
                </div>
            </div>

            <div className="p-5 flex flex-col flex-grow">
                <div className="flex items-start justify-between mb-2">
                    <div>
                        <h3 className="text-xl font-bold text-gray-900 group-hover:text-orange-600 transition-colors">
                            {destination.name}
                        </h3>
                        <div className="flex items-center text-gray-500 text-sm mt-1">
                            <MapPin size={14} className="mr-1 text-orange-500" />
                            <span>{destination.city}, {typeof destination.state === 'object' ? destination.state.name : ''}</span>
                        </div>
                    </div>
                </div>

                <div className="mt-auto pt-4 border-t border-gray-50 flex items-center justify-between">
                    <Link
                        href={`/explore/${destination.state?._id}/${destination._id}`}
                        className="text-sm font-semibold text-orange-600 hover:text-orange-700 flex items-center group/link"
                    >
                        View Details
                        <span className="ml-1 transform transition-transform group-hover/link:translate-x-1">→</span>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default DestinationCard;
