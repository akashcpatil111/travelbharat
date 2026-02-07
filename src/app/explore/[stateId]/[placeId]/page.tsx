import Navbar from '@/components/Navbar';
export const dynamic = 'force-dynamic';
import Footer from '@/components/Footer';
import Container from '@/components/ui/Container';
import dbConnect from '@/lib/db';
import Destination from '@/models/Destination';
import State from '@/models/State';
import { MapPin, Calendar, Clock, Ticket, ArrowLeft, Share2 } from 'lucide-react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import DestinationCard from '@/components/ui/DestinationCard';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function getDestination(id: string) {
    await dbConnect();
    if (!State) return null; // Ensure State model is active

    try {
        const destination = await Destination.findById(id).populate('state').lean();
        if (!destination) return null;
        return JSON.parse(JSON.stringify(destination));
    } catch (error) {
        return null;
    }
}

async function getSimilarDestinations(currentId: string, category: string, stateId: string) {
    await dbConnect();
    try {
        // Find destinations with same category
        let similar = await Destination.find({
            category: category,
            _id: { $ne: currentId }
        })
            .limit(3)
            .populate('state')
            .lean();

        // If less than 3, fill with destinations from same state
        if (similar.length < 3) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const existingIds = similar.map((d: any) => d._id);
            const more = await Destination.find({
                state: stateId,
                _id: { $ne: currentId, $nin: existingIds }
            } as any)
                .limit(3 - similar.length)
                .populate('state')
                .lean();

            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            similar = [...similar, ...more] as any;
        }

        return JSON.parse(JSON.stringify(similar));
    } catch (error) {
        return [];
    }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default async function DestinationDetailsPage({ params }: { params: any }) {
    const resolvedParams = await params;
    const destination = await getDestination(resolvedParams.placeId);

    if (!destination) {
        return notFound();
    }

    const similarDestinations = await getSimilarDestinations(
        destination._id,
        destination.category,
        destination.state._id || destination.state
    );

    return (
        <main className="min-h-screen bg-white">
            <Navbar />

            {/* Hero Image */}
            <div className="relative h-[60vh] w-full bg-gray-900">
                <img
                    src={destination.images?.[0] || '/placeholder.jpg'}
                    alt={destination.name}
                    className="w-full h-full object-cover opacity-80"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />

                <Container className="absolute bottom-0 left-0 right-0 py-12 text-white">
                    <Link href="/explore" className="inline-flex items-center text-white/80 hover:text-white mb-6 transition-colors">
                        <ArrowLeft size={20} className="mr-2" /> Back to Explore
                    </Link>
                    <h1 className="text-5xl md:text-6xl font-bold mb-4 font-serif">{destination.name}</h1>
                    <div className="flex items-center text-lg md:text-xl text-gray-200">
                        <MapPin className="mr-2 text-orange-500" />
                        {destination.city}, {destination.state?.name}
                    </div>
                </Container>
            </div>

            <Container className="py-16">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

                    {/* Main Content */}
                    <div className="col-span-1 lg:col-span-2 space-y-12">
                        <div>
                            <h2 className="text-2xl font-bold mb-4 text-gray-900 font-serif">About {destination.name}</h2>
                            <p className="text-lg text-gray-600 leading-relaxed whitespace-pre-line">
                                {destination.description}
                            </p>
                        </div>

                        {destination.history && (
                            <div>
                                <h2 className="text-2xl font-bold mb-4 text-gray-900 font-serif">History & Significance</h2>
                                <div className="prose prose-lg text-gray-600 max-w-none">
                                    <p>{destination.history}</p>
                                </div>
                            </div>
                        )}

                        <div>
                            <h2 className="text-2xl font-bold mb-6 text-gray-900 font-serif">Gallery</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                                {destination.images.map((img: string, idx: number) => (
                                    <div key={idx} className="relative aspect-[4/3] overflow-hidden rounded-xl group">
                                        <img
                                            src={img}
                                            alt={`${destination.name} ${idx + 1}`}
                                            className="w-full h-full object-cover hover:scale-110 transition-transform duration-700"
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className="col-span-1">
                        <div className="bg-white p-6 rounded-2xl shadow-xl shadow-gray-100 border border-gray-100 sticky top-24">
                            <div className="mb-6 flex justify-between items-center">
                                <span className="px-4 py-1.5 bg-orange-100 text-orange-700 font-semibold rounded-full text-sm">
                                    {destination.category}
                                </span>
                                <button className="text-gray-400 hover:text-orange-500 transition-colors">
                                    <Share2 size={20} />
                                </button>
                            </div>

                            <div className="space-y-6">
                                <div className="flex items-start gap-4">
                                    <div className="p-3 bg-blue-50 text-blue-600 rounded-lg">
                                        <Calendar size={24} />
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500 font-medium">Best Time to Visit</p>
                                        <p className="text-gray-900 font-semibold">{destination.bestTime}</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="p-3 bg-green-50 text-green-600 rounded-lg">
                                        <Clock size={24} />
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500 font-medium">Timings</p>
                                        <p className="text-gray-900 font-semibold">{destination.timings || 'Open 24 Hours'}</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="p-3 bg-purple-50 text-purple-600 rounded-lg">
                                        <Ticket size={24} />
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500 font-medium">Entry Fee</p>
                                        <p className="text-gray-900 font-semibold">{destination.entryFees || 'Free Entry'}</p>
                                    </div>
                                </div>
                            </div>

                            {destination.locationMapLink && (
                                <div className="mt-8 pt-8 border-t border-gray-100">
                                    <a
                                        href={destination.locationMapLink}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center justify-center w-full py-3 bg-[#0F6375] text-white font-semibold rounded-xl hover:bg-[#0D5666] transition-colors shadow-lg shadow-cyan-900/20"
                                    >
                                        <MapPin size={18} className="mr-2" />
                                        View on Map
                                    </a>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Similar Destinations */}
                {similarDestinations.length > 0 && (
                    <div className="mt-20 border-t border-gray-200 pt-16">
                        <h2 className="text-3xl font-bold mb-8 text-gray-900 font-serif">You May Also Like</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                            {similarDestinations.map((dest: any) => (
                                <DestinationCard key={dest._id} destination={dest} />
                            ))}
                        </div>
                    </div>
                )}
            </Container>

            <Footer />
        </main>
    );
}
