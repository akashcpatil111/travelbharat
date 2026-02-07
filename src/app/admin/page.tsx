'use client';

import { useState, useEffect } from 'react';
import Container from '@/components/ui/Container';
import { Plus, Edit, Trash2, MapPin, Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function AdminDashboard() {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [destinations, setDestinations] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        fetchDestinations();
    }, []);

    const fetchDestinations = async () => {
        try {
            const res = await fetch('/api/destinations');
            const data = await res.json();
            setDestinations(data);
        } catch (error) {
            console.error('Failed to fetch destinations', error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this destination?')) return;

        // Note: I didn't create a DELETE endpoint yet in the route.ts? 
        // Checking implementation_plan... "Create API Routes: GET/POST/PUT/DELETE"
        // Checking actual file... I created GET and POST. I need to update API route for DELETE.
        // For now, I'll implement the UI and then fix the API.

        try {
            await fetch(`/api/destinations/${id}`, { method: 'DELETE' });
            fetchDestinations();
        } catch (error) {
            alert('Failed to delete');
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 py-12">
            <Container>
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
                        <p className="text-gray-500">Manage your destinations and content</p>
                    </div>
                    <button
                        onClick={() => router.push('/admin/add')}
                        className="flex items-center gap-2 px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors"
                    >
                        <Plus size={20} />
                        Add Destination
                    </button>
                </div>

                {loading ? (
                    <div className="flex justify-center py-20">
                        <Loader2 className="animate-spin text-orange-600" size={40} />
                    </div>
                ) : (
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                        <table className="w-full text-left">
                            <thead className="bg-gray-50 border-b border-gray-100">
                                <tr>
                                    <th className="px-6 py-4 font-semibold text-gray-700">Name</th>
                                    <th className="px-6 py-4 font-semibold text-gray-700">Location</th>
                                    <th className="px-6 py-4 font-semibold text-gray-700">Category</th>
                                    <th className="px-6 py-4 font-semibold text-gray-700 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {destinations.map((dest) => (
                                    <tr key={dest._id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4">
                                            <div className="font-medium text-gray-900">{dest.name}</div>
                                            {dest.isFeatured && (
                                                <span className="inline-block px-2 py-0.5 text-xs bg-yellow-100 text-yellow-700 rounded-full mt-1">
                                                    Featured
                                                </span>
                                            )}
                                        </td>
                                        <td className="px-6 py-4 text-gray-600">
                                            <div className="flex items-center gap-1">
                                                <MapPin size={14} />
                                                {dest.city}, {dest.state?.name}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="inline-block px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded-full">
                                                {dest.category}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-right space-x-2">
                                            {/* Edit not fully implemented yet, just UI */}
                                            <button
                                                onClick={() => router.push(`/admin/edit/${dest._id}`)}
                                                className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                            >
                                                <Edit size={18} />
                                            </button>
                                            <button
                                                onClick={() => handleDelete(dest._id)}
                                                className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                            >
                                                <Trash2 size={18} />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                        {destinations.length === 0 && (
                            <div className="p-12 text-center text-gray-500">
                                No destinations found. Click "Add Destination" to create one.
                            </div>
                        )}
                    </div>
                )}
            </Container>
        </div>
    );
}
