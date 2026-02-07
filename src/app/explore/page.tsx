import Navbar from '@/components/Navbar';
export const dynamic = 'force-dynamic';
import Footer from '@/components/Footer';
import Container from '@/components/ui/Container';
import DestinationCard from '@/components/ui/DestinationCard';
import dbConnect from '@/lib/db';
import Destination from '@/models/Destination';
import State from '@/models/State';
import { Search, MapPin, Filter } from 'lucide-react';
import { redirect } from 'next/navigation';
import Link from 'next/link';

// Fetch data
// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function getDestinations(searchParams: any) {
    await dbConnect();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const query: any = {};

    if (searchParams?.category) {
        query.category = searchParams.category;
    }

    if (searchParams?.stateId) {
        query.state = searchParams.stateId;
    } else if (searchParams?.region) {
        // Find states in this region
        const statesInRegion = await State.find({ region: searchParams.region }).select('_id');
        const stateIds = statesInRegion.map(s => s._id);
        query.state = { $in: stateIds };
    }

    if (searchParams?.search) {
        query.$or = [
            { name: { $regex: searchParams.search, $options: 'i' } },
            { city: { $regex: searchParams.search, $options: 'i' } },
        ];
    }

    const destinations = await Destination.find(query)
        .populate('state')
        .lean();

    return JSON.parse(JSON.stringify(destinations));
}

async function getStates() {
    await dbConnect();
    const states = await State.find({}).sort({ name: 1 }).lean();
    return JSON.parse(JSON.stringify(states));
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default async function ExplorePage({ searchParams }: { searchParams: any }) {
    const resolvedParams = await searchParams;
    const destinations = await getDestinations(resolvedParams);
    const states = await getStates();
    const categories = ['Heritage', 'Nature', 'Religious', 'Adventure', 'Wildlife', 'Spiritual', 'Beach', 'Hill Station'];

    return (
        <main className="min-h-screen bg-gray-50">
            <Navbar />

            {/* Header */}
            <div className="bg-[#0F6375] pt-32 pb-16 text-white relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
                <Container className="relative z-10">
                    <div className="max-w-4xl mx-auto text-center">
                        <h1 className="text-4xl md:text-5xl font-serif font-bold mb-6">Explore Incredible India</h1>
                        <p className="text-gray-200 text-lg mb-8 font-light">
                            Discover the soul of India. From the Himalayas to the Indian Ocean, find your perfect journey.
                        </p>

                        {/* Search Bar */}
                        <form className="relative max-w-xl mx-auto" action={async (formData) => {
                            'use server';
                            const query = formData.get('search');
                            redirect(`/explore?search=${query}`);
                        }}>
                            <div className="relative flex items-center bg-white rounded-full p-2 shadow-2xl">
                                <Search className="ml-4 text-gray-400" size={20} />
                                <input
                                    type="text"
                                    name="search"
                                    defaultValue={resolvedParams?.search || ''}
                                    placeholder="Search places, cities..."
                                    className="w-full px-4 py-2 text-gray-700 bg-transparent outline-none placeholder:text-gray-400"
                                />
                                <button type="submit" className="px-6 py-2.5 rounded-full bg-[#E3550F] text-white font-medium hover:bg-[#D35400] transition-colors shadow-md">
                                    Search
                                </button>
                            </div>
                        </form>
                    </div>
                </Container>
            </div>

            <Container className="py-12">
                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Sidebar Filters */}
                    <aside className="w-full lg:w-72 flex-shrink-0">
                        <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 sticky top-24">
                            <div className="flex items-center gap-2 mb-6 text-[#0F6375]">
                                <Filter size={20} />
                                <h3 className="font-bold text-xl font-serif">Filters</h3>
                            </div>

                            {/* State Filter */}
                            <div className="mb-8">
                                <h4 className="font-semibold text-gray-800 mb-3 text-sm uppercase tracking-wide">States</h4>
                                <div className="space-y-1 max-h-60 overflow-y-auto pr-2 custom-scrollbar">
                                    <Link
                                        href={`/explore?${new URLSearchParams({ ...resolvedParams, stateId: '' }).toString()}`}
                                        className={`flex items-center justify-between px-3 py-2 rounded-md transition-colors text-sm ${!resolvedParams.stateId ? 'bg-orange-50 text-[#E3550F] font-medium' : 'text-gray-600 hover:bg-gray-50'}`}
                                    >
                                        <span>All States</span>
                                    </Link>
                                    {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                                    {states.map((state: any) => (
                                        <Link
                                            key={state._id}
                                            href={`/explore?${new URLSearchParams({ ...resolvedParams, stateId: state._id }).toString()}`}
                                            className={`flex items-center justify-between px-3 py-2 rounded-md transition-colors text-sm ${resolvedParams.stateId === state._id ? 'bg-orange-50 text-[#E3550F] font-medium' : 'text-gray-600 hover:bg-gray-50'}`}
                                        >
                                            <div className="flex items-center gap-2">
                                                <span>{state.name}</span>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            </div>

                            {/* Category Filter */}
                            <div>
                                <h4 className="font-semibold text-gray-800 mb-3 text-sm uppercase tracking-wide">Interests</h4>
                                <div className="space-y-1">
                                    <Link
                                        href={`/explore?${new URLSearchParams({ ...resolvedParams, category: '' }).toString()}`}
                                        className={`block px-3 py-2 rounded-md transition-colors text-sm ${!resolvedParams.category ? 'bg-orange-50 text-[#E3550F] font-medium' : 'text-gray-600 hover:bg-gray-50'}`}
                                    >
                                        All Interests
                                    </Link>
                                    {categories.map((cat) => (
                                        <Link
                                            key={cat}
                                            href={`/explore?${new URLSearchParams({ ...resolvedParams, category: cat }).toString()}`}
                                            className={`block px-3 py-2 rounded-md transition-colors text-sm ${resolvedParams.category === cat ? 'bg-orange-50 text-[#E3550F] font-medium' : 'text-gray-600 hover:bg-gray-50'}`}
                                        >
                                            {cat}
                                        </Link>
                                    ))}
                                </div>
                            </div>

                            {(resolvedParams.category || resolvedParams.stateId || resolvedParams.search) && (
                                <Link
                                    href="/explore"
                                    className="mt-6 block w-full text-center py-2 px-4 border border-gray-200 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-[#E3550F] transition-colors"
                                >
                                    Clear All Filters
                                </Link>
                            )}
                        </div>
                    </aside>

                    {/* Grid */}
                    <div className="flex-1">
                        <div className="mb-6 flex justify-between items-center border-b border-gray-200 pb-4">
                            <div>
                                <h2 className="text-2xl font-serif font-bold text-gray-900">
                                    {resolvedParams.search ? `Results for "${resolvedParams.search}"` : 'All Destinations'}
                                </h2>
                                <p className="text-gray-500 text-sm mt-1">Showing {destinations.length} exotic locations</p>
                            </div>
                        </div>

                        {destinations.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                                {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                                {destinations.map((dest: any) => (
                                    <DestinationCard key={dest._id} destination={dest} />
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-20 bg-white rounded-xl shadow-sm border border-gray-100">
                                <div className="bg-gray-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                                    <MapPin className="text-gray-400" size={32} />
                                </div>
                                <h3 className="text-xl font-bold font-serif text-gray-900 mb-2">No destinations found</h3>
                                <p className="text-gray-500 max-w-md mx-auto">
                                    We couldn't find matches for your current filters. Try selecting a different state or category.
                                </p>
                                <Link href="/explore" className="inline-block mt-6 text-[#E3550F] font-bold hover:underline">
                                    Clear all filters
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </Container>

            <Footer />
        </main>
    );
}
