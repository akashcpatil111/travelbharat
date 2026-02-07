import Navbar from '@/components/Navbar';
export const dynamic = 'force-dynamic';
import Hero from '@/components/Hero';
import Footer from '@/components/Footer';
import Container from '@/components/ui/Container';
import SectionHeader from '@/components/ui/SectionHeader';
import DestinationCard from '@/components/ui/DestinationCard';
import InteractiveMap from '@/components/InteractiveMap';
import dbConnect from '@/lib/db';
import Destination from '@/models/Destination';
import State from '@/models/State'; // Ensure State model is registered
import Link from 'next/link';
import NextImage from 'next/image';
import { ArrowRight } from 'lucide-react';

// Fetch data directly in Server Component
async function getFeaturedDestinations() {
  await dbConnect();
  // Ensure model is compiled
  if (!State) return [];

  const destinations = await Destination.find({ isFeatured: true })
    .populate('state')
    .limit(6)
    .lean();

  // Serialize complex objects (like ObjectId) to simple strings for Client Components if needed,
  // or just pass as is if Next.js handles it (it usually does for simple objects, but safest to stringify IDs).
  return JSON.parse(JSON.stringify(destinations));
}

async function getCategories() {
  const categories = [
    { name: 'Heritage', image: '/images/categories/heritage.jpg', count: '50+ Places' },
    { name: 'Nature', image: '/images/categories/nature.jpg', count: '120+ Places' },
    { name: 'Spiritual', image: '/images/categories/spiritual.jpg', count: '40+ Places' },
    { name: 'Adventure', image: '/images/categories/adventure.jpg', count: '35+ Places' },
  ];
  return categories;
}

export default async function Home() {
  const featuredDestinations = await getFeaturedDestinations();
  const categories = await getCategories();

  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <Hero />

      {/* Categories Section */}
      <section className="py-20 bg-gray-50">
        <Container>
          <SectionHeader title="Browse by Category" subtitle="Find Your Interest" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((cat) => (
              <Link key={cat.name} href={`/explore?category=${cat.name}`} className="group relative block overflow-hidden rounded-2xl aspect-[4/3] shadow-lg">
                <NextImage
                  src={cat.image}
                  alt={cat.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors" />
                <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-4 text-center">
                  <h3 className="text-2xl font-bold mb-1">{cat.name}</h3>
                  <p className="text-sm opacity-80">{cat.count}</p>
                </div>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      {/* Interactive Map Section */}
      <section className="py-20 bg-white overflow-hidden">
        <Container>
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="lg:w-1/2 space-y-6">
              <span className="text-[#E3550F] font-bold tracking-widest uppercase text-sm">Interactive Exploration</span>
              <h2 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 leading-tight">
                Navigate India by <br />
                <span className="text-[#0F6375]">Distinct Regions</span>
              </h2>
              <p className="text-gray-600 text-lg leading-relaxed">
                India is too vast to see in one glance. Click on a region to instantly discover the culture, cuisine, and landscapes specific to that part of the subcontinent.
              </p>
              <ul className="grid grid-cols-2 gap-4 pt-4">
                {[
                  { name: 'North (Himalayas)', region: 'North' },
                  { name: 'South (Dravidian)', region: 'South' },
                  { name: 'West (Desert/Coast)', region: 'West' },
                  { name: 'East (Cultural)', region: 'East' }
                ].map((item) => (
                  <li key={item.name}>
                    <Link
                      href={`/explore?region=${item.region}`}
                      className="flex items-center gap-2 text-gray-700 font-medium hover:text-[#E3550F] transition-colors"
                    >
                      <div className="w-2 h-2 rounded-full bg-[#E3550F]" />
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="lg:w-1/2 w-full">
              <InteractiveMap />
            </div>
          </div>
        </Container>
      </section>

      {/* Featured Destinations */}
      <section className="py-20 bg-gray-50">
        <Container>
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <SectionHeader title="Featured Destinations" subtitle="Handpicked For You" />
            <Link
              href="/explore"
              className="group flex items-center gap-2 text-orange-600 font-semibold hover:text-orange-700 transition-colors mb-8 md:mb-12"
            >
              View All Destinations
              <ArrowRight size={20} className="transform group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {featuredDestinations.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
              {featuredDestinations.map((dest: any) => (
                <DestinationCard key={dest._id} destination={dest} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-gray-50 rounded-2xl border border-dashed border-gray-300">
              <h3 className="text-xl text-gray-500 mb-4">No destinations found yet.</h3>
              <p className="text-gray-400 mb-6">Seed the database to see featured places.</p>
              <Link href="/api/seed" target="_blank" className="px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors">
                Run Seed Script
              </Link>
            </div>
          )}
        </Container>
      </section>

      {/* CTA Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gray-900">
          <NextImage
            src="/images/misc/india-texture.jpg"
            alt="India Texture"
            fill
            className="object-cover opacity-20"
            sizes="100vw"
          />
        </div>
        <Container className="relative z-10 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to plan your <span className="text-orange-500">journey?</span>
          </h2>
          <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
            Discover the hidden gems of India. From heritage sites to spiritual centers, your next adventure awaits.
          </p>
          <Link
            href="/explore"
            className="inline-block px-8 py-4 bg-orange-600 text-white font-bold rounded-full text-lg shadow-lg shadow-orange-500/30 hover:bg-orange-700 hover:shadow-orange-500/50 transition-all transform hover:-translate-y-1"
          >
            Start Exploring Now
          </Link>
        </Container>
      </section>

      <Footer />
    </main>
  );
}
