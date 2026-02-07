import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Container from '@/components/ui/Container';
import SectionHeader from '@/components/ui/SectionHeader';

export default function AboutPage() {
    return (
        <main className="min-h-screen bg-white">
            <Navbar />

            <div className="pt-32 pb-20 bg-gray-50">
                <Container>
                    <div className="max-w-3xl mx-auto text-center">
                        <h1 className="text-4xl md:text-5xl font-bold mb-6">About TravelBharat</h1>
                        <p className="text-xl text-gray-600 leading-relaxed">
                            We are on a mission to digitize India's vast tourism landscape, making it easier for travelers, students, and culture enthusiasts to discover the hidden gems of our incredible country.
                        </p>
                    </div>
                </Container>
            </div>

            <Container className="py-20">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                    <div>
                        <img
                            src="https://images.unsplash.com/photo-1524492412937-b28074a5d7da?q=80&w=2942&auto=format&fit=crop"
                            alt="India Culture"
                            className="rounded-2xl shadow-xl w-full h-auto"
                        />
                    </div>
                    <div>
                        <SectionHeader title="Our Vision" />
                        <div className="space-y-6 text-gray-600 text-lg">
                            <p>
                                India is a land of diverse cultures, landscapes, and histories. However, information about many breathtaking destinations remains scattered across various sources.
                            </p>
                            <p>
                                <strong>TravelBharat</strong> aims to bridge this gap by providing a centralized, verified, and visually rich platform for all Indian tourist destinations. From the architectural marvels of Rajasthan to the serene backwaters of Kerala, we cover it all.
                            </p>
                            <p>
                                Whether you are planning your next vacation, researching for a project, or simply exploring via your screen, TravelBharat is your trusted companion.
                            </p>
                        </div>
                    </div>
                </div>
            </Container>

            <Footer />
        </main>
    );
}
