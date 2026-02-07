'use client';

import { useState, useEffect } from 'react';
import Container from '@/components/ui/Container';
import { useRouter, useParams } from 'next/navigation';
import { ArrowLeft, Loader2 } from 'lucide-react';

export default function EditDestinationPage() {
    const router = useRouter();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const params = useParams();
    const [states, setStates] = useState<{ _id: string, name: string }[]>([]);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        state: '',
        city: '',
        category: 'Heritage',
        description: '',
        bestTime: '',
        images: '',
        history: '',
        timings: '',
        entryFees: '',
        locationMapLink: '',
        isFeatured: false
    });

    useEffect(() => {
        // Fetch states
        fetch('/api/states')
            .then(res => res.json())
            .then(data => setStates(data))
            .catch(err => console.error(err));

        // Fetch destination details
        if (params?.id) {
            fetch(`/api/destinations/${params.id}`)
                .then(res => {
                    if (!res.ok) throw new Error('Failed to load');
                    return res.json();
                })
                .then(data => {
                    setFormData({
                        name: data.name || '',
                        state: data.state?._id || data.state || '', // Handle populated or raw ID
                        city: data.city || '',
                        category: data.category || 'Heritage',
                        description: data.description || '',
                        bestTime: data.bestTime || '',
                        images: Array.isArray(data.images) ? data.images.join(', ') : '',
                        history: data.history || '',
                        timings: data.timings || '',
                        entryFees: data.entryFees || '',
                        locationMapLink: data.locationMapLink || '',
                        isFeatured: data.isFeatured || false
                    });
                    setLoading(false);
                })
                .catch(err => {
                    console.error(err);
                    alert('Failed to load destination');
                    router.push('/admin');
                });
        }
    }, [params?.id, router]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitting(true);

        try {
            const payload = {
                ...formData,
                images: formData.images.split(',').map(s => s.trim()).filter(Boolean)
            };

            const res = await fetch(`/api/destinations/${params?.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            if (res.ok) {
                router.push('/admin');
                router.refresh();
            } else {
                alert('Something went wrong');
            }
        } catch (error) {
            console.error(error);
            alert('Error updating destination');
        } finally {
            setSubmitting(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <Loader2 className="animate-spin text-orange-600" size={40} />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-12">
            <Container>
                <button
                    onClick={() => router.back()}
                    className="flex items-center text-gray-500 hover:text-gray-900 mb-6 transition-colors"
                >
                    <ArrowLeft size={20} className="mr-2" />
                    Back to Dashboard
                </button>

                <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-sm border border-gray-100 p-8">
                    <h1 className="text-2xl font-bold mb-6">Edit Destination</h1>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                                <input
                                    required
                                    type="text"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all"
                                    value={formData.name}
                                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                                <input
                                    required
                                    type="text"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all"
                                    value={formData.city}
                                    onChange={e => setFormData({ ...formData, city: e.target.value })}
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">State</label>
                                <select
                                    required
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all"
                                    value={formData.state}
                                    onChange={e => setFormData({ ...formData, state: e.target.value })}
                                >
                                    <option value="">Select State</option>
                                    {states.map(s => (
                                        <option key={s._id} value={s._id}>{s.name}</option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                                <select
                                    required
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all"
                                    value={formData.category}
                                    onChange={e => setFormData({ ...formData, category: e.target.value })}
                                >
                                    {['Heritage', 'Nature', 'Religious', 'Adventure', 'Wildlife', 'Spiritual', 'Hill Station'].map(c => (
                                        <option key={c} value={c}>{c}</option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Best Time to Visit</label>
                            <input
                                required
                                type="text"
                                placeholder="e.g. October to March"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all"
                                value={formData.bestTime}
                                onChange={e => setFormData({ ...formData, bestTime: e.target.value })}
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                            <textarea
                                required
                                rows={4}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all"
                                value={formData.description}
                                onChange={e => setFormData({ ...formData, description: e.target.value })}
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Image URLs (comma separated)</label>
                            <textarea
                                required
                                rows={2}
                                placeholder="https://example.com/image1.jpg, https://example.com/image2.jpg"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all"
                                value={formData.images}
                                onChange={e => setFormData({ ...formData, images: e.target.value })}
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">History & Significance</label>
                            <textarea
                                rows={3}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all"
                                value={formData.history}
                                onChange={e => setFormData({ ...formData, history: e.target.value })}
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Timings</label>
                                <input
                                    type="text"
                                    placeholder="e.g. 9 AM - 5 PM"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all"
                                    value={formData.timings}
                                    onChange={e => setFormData({ ...formData, timings: e.target.value })}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Entry Fees</label>
                                <input
                                    type="text"
                                    placeholder="e.g. ₹50 per person"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all"
                                    value={formData.entryFees}
                                    onChange={e => setFormData({ ...formData, entryFees: e.target.value })}
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Location Map Link (Google Maps)</label>
                            <input
                                type="text"
                                placeholder="https://maps.app.goo.gl/..."
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all"
                                value={formData.locationMapLink}
                                onChange={e => setFormData({ ...formData, locationMapLink: e.target.value })}
                            />
                        </div>

                        <div className="flex items-center gap-2">
                            <input
                                type="checkbox"
                                id="isFeatured"
                                className="w-4 h-4 text-orange-600 border-gray-300 rounded focus:ring-orange-500"
                                checked={formData.isFeatured}
                                onChange={e => setFormData({ ...formData, isFeatured: e.target.checked })}
                            />
                            <label htmlFor="isFeatured" className="text-sm text-gray-700">Feature this destination on Home Page</label>
                        </div>

                        <button
                            type="submit"
                            disabled={submitting}
                            className="w-full py-3 bg-orange-600 text-white font-bold rounded-lg hover:bg-orange-700 transition-colors disabled:opacity-50 flex justify-center items-center"
                        >
                            {submitting ? <Loader2 className="animate-spin" /> : 'Update Destination'}
                        </button>
                    </form>
                </div>
            </Container>
        </div>
    );
}
