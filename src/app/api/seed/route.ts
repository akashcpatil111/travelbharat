import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import State from '@/models/State';
import Destination from '@/models/Destination';

export async function GET(request: Request) {
    await dbConnect();
    const { searchParams } = new URL(request.url);
    const force = searchParams.get('force') === 'true';

    try {
        if (force) {
            await State.deleteMany({});
            await Destination.deleteMany({});
        } else {
            const stateCount = await State.countDocuments();
            if (stateCount > 0) {
                return NextResponse.json({ message: 'Database already seeded. Use ?force=true to overwrite.' });
            }
        }

        // --- States Data (Comprehensive List) ---
        const statesData = [
            // North
            { name: 'Jammu and Kashmir', code: 'JK', region: 'North', description: 'Paradise on Earth, known for its pristine lakes and snow-capped mountains.', image: '/images/states/jammu-and-kashmir.jpg' },
            { name: 'Ladakh', code: 'LA', region: 'North', description: 'A land of high passes, Buddhist monasteries, and stunning lunar landscapes.', image: '/images/states/ladakh.jpg' },
            { name: 'Himachal Pradesh', code: 'HP', region: 'North', description: 'A playground for adventurers, with snowy peaks and lush river valleys.', image: '/images/states/himachal-pradesh.jpg' },
            { name: 'Uttarakhand', code: 'UK', region: 'North', description: 'Land of the Gods, famous for yoga, pilgrimages, and Himalayan views.', image: '/images/states/uttarakhand.jpg' },
            { name: 'Punjab', code: 'PB', region: 'North', description: 'The land of five rivers, known for the Golden Temple and vibrant culture.', image: '/images/states/punjab.jpg' },
            { name: 'Rajasthan', code: 'RJ', region: 'North', description: 'The Land of Kings, a realm of maharajas, majestic forts, and opulent palaces.', image: '/images/states/rajasthan.jpg' },
            { name: 'Uttar Pradesh', code: 'UP', region: 'North', description: 'The heart of India, home to the Taj Mahal and the spiritual capital Varanasi.', image: '/images/states/uttar-pradesh.jpg' },

            // West
            { name: 'Gujarat', code: 'GJ', region: 'West', description: 'A vibrant blend of heritage, industry, and the surreal White Desert.', image: '/images/states/gujarat.jpg' },
            { name: 'Maharashtra', code: 'MH', region: 'West', description: 'Home to Bollywood, caves of Ajanta Ellora, and the Sahyadri mountains.', image: '/images/states/maharashtra.jpg' },
            { name: 'Goa', code: 'GA', region: 'West', description: 'India\'s pocket-sized paradise, blending Indian and Portuguese cultures.', image: '/images/states/goa.jpg' },

            // South
            { name: 'Karnataka', code: 'KA', region: 'South', description: 'A state of diverse landscapes, from imperial palaces to tech hubs and coastlines.', image: '/images/states/karnataka.jpg' },
            { name: 'Kerala', code: 'KL', region: 'South', description: "God's Own Country, a tropical paradise of waving palms and wide sandy beaches.", image: '/images/states/kerala.jpg' },
            { name: 'Tamil Nadu', code: 'TN', region: 'South', description: 'Land of temples, classical music, and rich Dravidian heritage.', image: '/images/states/tamil-nadu.jpg' },
            { name: 'Telangana', code: 'TS', region: 'South', description: 'Known for the historic Charminar and its booming IT industry.', image: '/images/states/telangana.jpg' },
            { name: 'Andhra Pradesh', code: 'AP', region: 'South', description: 'Known for the Tirupati temple and scenic Vizag coast.', image: '/images/states/andhra-pradesh.jpg' },

            // East
            { name: 'West Bengal', code: 'WB', region: 'East', description: 'Cultural capital of India, from the Himalayas of Darjeeling to the Sundarbans.', image: '/images/states/west-bengal.jpg' },
            { name: 'Odisha', code: 'OD', region: 'East', description: 'Soul of Incredible India, famous for Jagannath Temple and Sun Temple.', image: '/images/states/odisha.jpg' },
            { name: 'Bihar', code: 'BR', region: 'East', description: 'The birthplace of Buddhism, home to Bodh Gaya and Nalanda.', image: '/images/states/bihar.jpg' },
            { name: 'Sikkim', code: 'SK', region: 'East', description: 'A Himalayan wonderland with clean air, monasteries, and immense beauty.', image: '/images/states/sikkim.jpg' },

            // North East & Central
            { name: 'Meghalaya', code: 'ML', region: 'NorthEast', description: 'The Abode of Clouds, known for its living root bridges and waterfalls.', image: '/images/states/meghalaya.jpg' },
            { name: 'Assam', code: 'AS', region: 'NorthEast', description: 'Gateway to the North East, famous for tea and the one-horned rhino.', image: '/images/states/assam.jpg' },
            { name: 'Madhya Pradesh', code: 'MP', region: 'Central', description: 'The heart of India, famous for Khajuraho temples and tiger reserves.', image: '/images/states/madhya-pradesh.jpg' },
            { name: 'Andaman and Nicobar', code: 'AN', region: 'Islands', description: 'Pristine blue waters and white sandy beaches.', image: '/images/states/andaman-and-nicobar.jpg' }
        ];

        const createdStates = await State.insertMany(statesData);
        // Map State Name to ID for easy lookup
        const stateMap = createdStates.reduce((acc: any, state: any) => {
            acc[state.name] = state._id;
            return acc;
        }, {});

        // --- Destinations (Rich Selection) ---
        const destinationsData = [
            // JK & Ladakh
            {
                name: 'Dal Lake',
                state: stateMap['Jammu and Kashmir'],
                city: 'Srinagar',
                category: 'Nature',
                description: 'Dal Lake is the "Jewel in the crown of Kashmir" and Srinagar\'s most important landmark. Spanning 18 square kilometers, this urban lake is renowned for its Victorian-era wooden houseboats, vibrant floating gardens (Rad), and colorful Shikaras gliding through lotus-filled waters. The lake is surrounded by Mughal gardens like Shalimar Bagh and Nishat Bagh, offering breathtaking views of the Pir Panjal mountains.',
                history: 'The lake has been a center of Kashmiri civilization for centuries. The houseboats originated during the British Raj when the Maharaja of Kashmir restricted land ownership by foreigners, leading them to build floating homes.',
                bestTime: 'May to November',
                entryFees: 'Free (Shikara rides: ₹500-1500)',
                timings: 'Open 24 hours',
                locationMapLink: 'https://maps.app.goo.gl/DalLake',
                images: ['/images/destinations/dal-lake.jpg', '/images/states/jammu-and-kashmir.jpg'],
                isFeatured: true
            },
            {
                name: 'Pangong Lake',
                state: stateMap['Ladakh'],
                city: 'Leh',
                category: 'Adventure',
                description: 'Pangong Tso is an endorheic lake in the Himalayas situated at a height of about 4,350 m. It is 134 km long and extends from India to China. Famous for its changing colors from shades of blue to green and even red, this lake gained immense popularity after the movie "3 Idiots". The stark beauty of the barren mountains reflecting in the crystal clear brackish waters creates a surreal landscape.',
                history: 'Historically, the lake has been a point of strategic importance. During winter, the lake freezes completely, despite being saline water. It has been a site of border disputes but remains a breathtaking tourist destination.',
                bestTime: 'June to September',
                entryFees: 'Inner Line Permit Required (₹400 approx)',
                timings: 'Sunrise to Sunset',
                locationMapLink: 'https://maps.app.goo.gl/Pangong',
                images: ['/images/destinations/pangong-lake.jpg', '/images/states/ladakh.jpg'],
                isFeatured: true
            },

            // Himachal
            {
                name: 'Solang Valley',
                state: stateMap['Himachal Pradesh'],
                city: 'Manali',
                category: 'Adventure',
                description: 'Solang Valley is a side valley at the top of the Kullu Valley in Himachal Pradesh. It is known for its summer and winter sport conditions. The sports most commonly offered are parachuting, paragliding, skating and zorbing. Giant slopes of lawn comprise Solang Valley and provide its reputation as a popular ski resort. A few ski agencies offer courses and equipment only for basic skiing.',
                history: 'Originally a pastoral valley, Solang developed into a major adventure sports hub in the late 20th century as Manali grew as a tourist destination.',
                bestTime: 'All Year (Skiing: Dec-Feb)',
                entryFees: 'No entry fee (Activities chargeable)',
                timings: '09:00 AM - 06:00 PM',
                locationMapLink: 'https://maps.app.goo.gl/Solang',
                images: ['/images/destinations/solang-valley.jpg', '/images/states/himachal-pradesh.jpg'],
                isFeatured: false
            },
            {
                name: 'Kasol',
                state: stateMap['Himachal Pradesh'],
                city: 'Kasol',
                category: 'Nature',
                description: 'Kasol is a hamlet in the district Kullu of the Indian state of Himachal Pradesh. It is situated in Parvati Valley, on the banks of the Parvati River, on the way between Bhuntar and Manikaran. It is a tourist attraction that is becoming very popular as a hub for backpackers and trekkers. Known as "Mini Israel of India" due to a high percentage of Israeli tourists.',
                history: 'Kasol was a quiet village until the 1990s when it was discovered by Israeli tourists needing a post-military service break, transforming its culture and economy.',
                bestTime: 'March to June',
                entryFees: 'Free',
                timings: 'Open 24 hours',
                locationMapLink: 'https://maps.app.goo.gl/Kasol',
                images: ['/images/destinations/kasol.jpg', '/images/categories/nature.jpg'],
                isFeatured: false
            },

            // Uttarakhand
            {
                name: 'Rishikesh',
                state: stateMap['Uttarakhand'],
                city: 'Rishikesh',
                category: 'Spiritual',
                description: 'Rishikesh is a city in India’s northern state of Uttarakhand, in the Himalayan foothills beside the Ganges River. The river is considered holy, and the city is renowned as a center for studying yoga and meditation. Temples and ashrams line the eastern bank around Swarg Ashram, a traffic-free, alcohol-free and vegetarian enclave upstream from Rishikesh town.',
                history: 'Legend states that Lord Rama did penance here for killing Ravana. It became globally famous in 1968 when The Beatles visited the Maharishi Mahesh Yogi ashram.',
                bestTime: 'September to November / March to May',
                entryFees: 'Free',
                timings: 'Open 24 hours (Ganga Aarti: Sunset)',
                locationMapLink: 'https://maps.app.goo.gl/Rishikesh',
                images: ['/images/destinations/rishikesh.jpg', '/images/categories/spiritual.jpg'],
                isFeatured: true
            },

            // Punjab
            {
                name: 'Golden Temple',
                state: stateMap['Punjab'],
                city: 'Amritsar',
                category: 'Spiritual',
                description: 'The Golden Temple, also known as Sri Harmandir Sahib, is the holiest Gurdwara of Sikhism. The Gurdwara is built around a man-made pool (sarovar) that was completed by the fourth Sikh Guru, Guru Ram Das in 1577. The upper floors of the Gurdwara are covered with gold, which gives it its distinctive appearance and English name.',
                history: 'Construction began in 1581 and completed in 1589. It was rebuilt multiple times after attacks. Maharaja Ranjit Singh covered the upper floors in gold in 1830.',
                bestTime: 'November to March',
                entryFees: 'Free',
                timings: 'Open 24 hours',
                locationMapLink: 'https://maps.app.goo.gl/GoldenTemple',
                images: ['/images/destinations/golden-temple.jpg', '/images/categories/spiritual.jpg'],
                isFeatured: true
            },

            // Rajasthan
            {
                name: 'Jaipur City Palace',
                state: stateMap['Rajasthan'],
                city: 'Jaipur',
                category: 'Heritage',
                description: 'The City Palace, Jaipur is a royal residence and former administrative headquarters of the rulers of the Jaipur State. Construction was started soon after the establishment of the city of Jaipur by Maharaja Sawai Jai Singh II, who moved his court to Jaipur from Amber, in 1727. The palace complex lies in the heart of Jaipur city.',
                history: 'Built between 1729 and 1732, initially by Sawai Jai Singh II, the palace has seen additions by successive rulers up to the 20th century.',
                bestTime: 'October to March',
                entryFees: '₹300 (Indians), ₹700 (Foreigners)',
                timings: '09:30 AM - 05:00 PM',
                locationMapLink: 'https://maps.app.goo.gl/CityPalace',
                images: ['/images/destinations/jaipur-city-palace.jpg', '/images/states/rajasthan.jpg'],
                isFeatured: true
            },
            {
                name: 'Jaisalmer Fort',
                state: stateMap['Rajasthan'],
                city: 'Jaisalmer',
                category: 'Heritage',
                description: 'Jaisalmer Fort is situated in the city of Jaisalmer, in the Indian state of Rajasthan. It is believed to be one of the very few "living forts" in the world, as nearly one fourth of the old city\'s population still resides within the fort. For the better part of its 800-year history, the fort was the city of Jaisalmer.',
                history: 'Built in 1156 AD by the Rajput ruler Rawal Jaisal, from whom it derives its name. It stood at the crossroads of important trade routes (including the Silk Road).',
                bestTime: 'November to February',
                entryFees: 'Free (Palace museum inside is chargeable)',
                timings: 'Open 24 hours',
                locationMapLink: 'https://maps.app.goo.gl/JaisalmerFort',
                images: ['/images/destinations/jaisalmer-fort.jpg', '/images/categories/heritage.jpg'],
                isFeatured: false
            },

            // UP
            {
                name: 'Taj Mahal',
                state: stateMap['Uttar Pradesh'],
                city: 'Agra',
                category: 'Heritage',
                description: 'The Taj Mahal is an ivory-white marble mausoleum on the southern bank of the river Yamuna in the Indian city of Agra. It was commissioned in 1632 by the Mughal emperor Shah Jahan to house the tomb of his favorite wife, Mumtaz Mahal. It also houses the tomb of Shah Jahan himself. It is a UNESCO World Heritage Site.',
                history: 'Construction took over 20 years (1632-1653) and employed 20,000 artisans. It is cited as "the jewel of Muslim art in India".',
                bestTime: 'October to March',
                entryFees: '₹50 (Indians), ₹1100 (Foreigners)',
                timings: 'Sunrise to Sunset (Closed Fridays)',
                locationMapLink: 'https://maps.app.goo.gl/TajMahal',
                images: ['/images/destinations/taj-mahal.jpg', '/images/categories/heritage.jpg'],
                isFeatured: true
            },
            {
                name: 'Varanasi Ghats',
                state: stateMap['Uttar Pradesh'],
                city: 'Varanasi',
                category: 'Spiritual',
                description: 'Varanasi has at least 84 ghats, most of which are used for bathing and puja ceremony steps leading to the water of the Ganges River, while two ghats are used exclusively as cremation sites. Dashashwamedh Ghat is the main and probably the oldest ghat of Varanasi located on the Ganges. It is close to Vishwanath Temple.',
                history: 'Most ghats were rebuilt in the 18th century under the Maratha patronage. The city itself is one of the oldest continuously inhabited cities in the world.',
                bestTime: 'October to March',
                entryFees: 'Free',
                timings: 'Open 24 hours',
                locationMapLink: 'https://maps.app.goo.gl/Varanasi',
                images: ['/images/destinations/varanasi-ghats.jpg', '/images/categories/spiritual.jpg'],
                isFeatured: true
            },

            // West
            {
                name: 'Gateway of India',
                state: stateMap['Maharashtra'],
                city: 'Mumbai',
                category: 'Heritage',
                description: 'The Gateway of India is an arch-monument built in the early 20th century in the city of Mumbai. It was erected to commemorate the landing of King-Emperor George V and Queen-Empress Mary at Apollo Bunder on their visit to India in 1911. The structure is an arch made of basalt, 26 metres (85 feet) high.',
                history: 'The foundation stone was laid in 1911, and construction was completed in 1924. Ironically, it later served as the exit point for the last British troops leaving India in 1948.',
                bestTime: 'November to February',
                entryFees: 'Free',
                timings: 'Open 24 hours',
                locationMapLink: 'https://maps.app.goo.gl/GatewayOfIndia',
                images: ['/images/destinations/gateway-of-india.jpg', '/images/states/maharashtra.jpg'],
                isFeatured: false
            },
            {
                name: 'Rann of Kutch',
                state: stateMap['Gujarat'],
                city: 'Kutch',
                category: 'Nature',
                description: 'The Great Rann of Kutch is a salt marsh in the Thar Desert in the Kutch District of Gujarat. It is about 7500 km² in area and is reputed to be one of the largest salt deserts in the world. The area is famous for the Rann Utsav, a carnival of music, dance, and culture, held annually during the winter months.',
                history: 'Geologically, the Rann was once a shallow part of the Arabian Sea until geological uplift cut off the connection, leaving behind a vast salt lake that dries up seasonally.',
                bestTime: 'November to February (Rann Utsav)',
                entryFees: 'Permit required (₹100 approx)',
                timings: 'Sunrise to Sunset',
                locationMapLink: 'https://maps.app.goo.gl/RannOfKutch',
                images: ['/images/destinations/rann-of-kutch.jpg', '/images/states/gujarat.jpg'],
                isFeatured: true
            },
            {
                name: 'Palolem Beach',
                state: stateMap['Goa'],
                city: 'Canacona',
                category: 'Beach',
                description: 'Palolem Beach is a stretch of white sand on a bay in Goa, South India. It\'s known for its calm waters and for its nightlife, including "silent discos" where partygoers wear headphones. Lined with palm trees and colorful wooden shacks, the beach faces Canacona Island, known for its resident monkeys.',
                history: 'Palolem was one of the first beaches in Goa to be discovered by hippies in the 1970s but remained relatively quiet until the late 1990s.',
                bestTime: 'November to February',
                entryFees: 'Free',
                timings: 'Open 24 hours',
                locationMapLink: 'https://maps.app.goo.gl/Palolem',
                images: ['/images/destinations/palolem-beach.jpg', '/images/states/goa.jpg'],
                isFeatured: true
            },

            // South
            {
                name: 'Hampi',
                state: stateMap['Karnataka'],
                city: 'Bellary',
                category: 'Heritage',
                description: 'Hampi is an ancient village in the south Indian state of Karnataka. It\'s dotted with numerous ruined temple complexes from the Vijayanagara Empire. On the south bank of the River Tungabhadra is the 7th-century Virupaksha Temple, near the revived Hampi Bazaar. A World Heritage Site, Hampi is famous for its stunning stone chariot and massive boulders.',
                history: 'Hampi was the capital of the Vijayanagara Empire in the 14th century. It was one of the richest and largest cities in the world before being destroyed by the Deccan Sultanates in 1565.',
                bestTime: 'October to February',
                entryFees: '₹40 (Indians), ₹600 (Foreigners)',
                timings: '06:00 AM - 06:00 PM',
                locationMapLink: 'https://maps.app.goo.gl/Hampi',
                images: ['/images/destinations/hampi.jpg', '/images/states/karnataka.jpg'],
                isFeatured: true
            },
            {
                name: 'Mysore Palace',
                state: stateMap['Karnataka'],
                city: 'Mysore',
                category: 'Heritage',
                description: 'The Mysore Palace is a historical palace and a royal residence at Mysore in the Indian state of Karnataka. It is the official residence of the Wadiyar dynasty and the seat of the Kingdom of Mysore. The palace is in the centre of Mysore, and faces the Chamundi Hills eastward.',
                history: 'The current structure was built between 1897 and 1912 after the old palace burnt down. It was designed by the British architect Henry Irwin.',
                bestTime: 'October to March',
                entryFees: '₹100 (Indians), ₹200 (Foreigners)',
                timings: '10:00 AM - 05:30 PM',
                locationMapLink: 'https://maps.app.goo.gl/MysorePalace',
                images: ['/images/destinations/mysore-palace.jpg', '/images/states/karnataka.jpg'],
                isFeatured: false
            },
            {
                name: 'Alleppey',
                state: stateMap['Kerala'],
                city: 'Alleppey',
                category: 'Nature',
                description: 'Alappuzha (or Alleppey) is a city on the Laccadive Sea in the southern Indian state of Kerala. It\'s best known for houseboat cruises along the rustic Kerala backwaters, a network of tranquil canals and lagoons. Alappuzha Beach is the site of the 19th-century Alappuzha Lighthouse.',
                history: 'Described as the "Venice of the East" by Lord Curzon, it was a major trading port for spices and coconut products.',
                bestTime: 'September to March',
                entryFees: 'Free (Houseboats: ₹5000+ per night)',
                timings: 'Open 24 hours',
                locationMapLink: 'https://maps.app.goo.gl/Alleppey',
                images: ['/images/destinations/alleppey.jpg', '/images/states/kerala.jpg'],
                isFeatured: true
            },
            {
                name: 'Meenakshi Temple',
                state: stateMap['Tamil Nadu'],
                city: 'Madurai',
                category: 'Spiritual',
                description: 'Arulmigu Meenakshi Sundaraswarar Temple is a historic Hindu temple located on the southern bank of the Vaigai River in the temple city of Madurai, Tamil Nadu, India. It is dedicated to the goddess Meenakshi, a form of Parvati, and her consort, Sundareshwarar, a form of Shiva.',
                history: 'The temple is at the center of the ancient temple city of Madurai mentioned in the Tamil Sangam literature, with the goddess temple mentioned in 6th century texts.',
                bestTime: 'October to March',
                entryFees: 'Free',
                timings: '05:00 AM - 12:30 PM, 04:00 PM - 10:00 PM',
                locationMapLink: 'https://maps.app.goo.gl/MeenakshiTemple',
                images: ['/images/destinations/meenakshi-temple.jpg', '/images/states/tamil-nadu.jpg'],
                isFeatured: false
            },
            {
                name: 'Charminar',
                state: stateMap['Telangana'],
                city: 'Hyderabad',
                category: 'Heritage',
                description: 'The Charminar constructed in 1591, is a monument and mosque located in Hyderabad, Telangana, India. The landmark has become known globally as a symbol of Hyderabad and is listed among the most recognized structures in India. It is situated on the east bank of Musi river.',
                history: 'Built by Muhammad Quli Qutb Shah to celebrate the end of a deadly plague. It marked the center of the new city of Hyderabad.',
                bestTime: 'October to March',
                entryFees: '₹25 (Indians), ₹300 (Foreigners)',
                timings: '09:30 AM - 05:30 PM',
                locationMapLink: 'https://maps.app.goo.gl/Charminar',
                images: ['/images/destinations/charminar.jpg', '/images/states/telangana.jpg'],
                isFeatured: false
            },

            // East/NE
            {
                name: 'Victoria Memorial',
                state: stateMap['West Bengal'],
                city: 'Kolkata',
                category: 'Heritage',
                description: 'The Victoria Memorial is a large marble building in Kolkata, West Bengal, India, which was built between 1906 and 1921. It is dedicated to the memory of Queen Victoria, then Empress of India, and is now a museum and tourist destination under the auspices of the Ministry of Culture.',
                history: 'Lord Curzon conceived the idea of the memorial. It was designed by William Emerson in an Indo-Saracenic revivalist style.',
                bestTime: 'October to March',
                entryFees: '₹30 (Indians), ₹500 (Foreigners)',
                timings: '10:00 AM - 06:00 PM (Closed Mondays)',
                locationMapLink: 'https://maps.app.goo.gl/VictoriaMemorial',
                images: ['/images/destinations/victoria-memorial.jpg', '/images/states/west-bengal.jpg'],
                isFeatured: false
            },
            {
                name: 'Konark Sun Temple',
                state: stateMap['Odisha'],
                city: 'Konark',
                category: 'Heritage',
                description: 'Konark Sun Temple is a 13th-century CE Sun temple at Konark about 35 kilometres northeast from Puri on the coastline of Odisha, India. The temple is attributed to king Narasimhadeva I of the Eastern Ganga dynasty about 1250 CE. Dedicated to the Hindu Sun God Surya, what remains of the temple complex has the appearance of a 100-foot high chariot.',
                history: 'A masterpiece of Kalinga architecture, it was built in the shape of a gigantic chariot with 24 wheels and 7 horses. It is a UNESCO World Heritage Site.',
                bestTime: 'September to March',
                entryFees: '₹40 (Indians), ₹600 (Foreigners)',
                timings: '06:00 AM - 08:00 PM',
                locationMapLink: 'https://maps.app.goo.gl/Konark',
                images: ['/images/destinations/konark-sun-temple.jpg', '/images/states/odisha.jpg'],
                isFeatured: true
            },
            {
                name: 'Living Root Bridges',
                state: stateMap['Meghalaya'],
                city: 'Cherrapunji',
                category: 'Nature',
                description: 'Living root bridges are a form of tree shaping common in the southern part of the Northeast Indian state of Meghalaya. They are handmade from the aerial roots of rubber fig trees by the Khasi and Jaintia peoples of the mountainous terrain along the southern part of the Shillong Plateau.',
                history: 'The practice is centuries old. The Double Decker Root Bridge in Nongriat is one of the most famous and is estimated to be over 180 years old.',
                bestTime: 'October to April',
                entryFees: '₹20-50 approx',
                timings: 'Sunrise to Sunset',
                locationMapLink: 'https://maps.app.goo.gl/RootBridge',
                images: ['/images/destinations/living-root-bridges.jpg', '/images/states/meghalaya.jpg'],
                isFeatured: true
            },
            {
                name: 'Kaziranga',
                state: stateMap['Assam'],
                city: 'Golaghat',
                category: 'Wildlife',
                description: 'Kaziranga National Park is a protected area in the northeast Indian state of Assam. Spread across the floodplains of the Brahmaputra River, its forests, wetlands and grasslands are home to tigers, elephants The park hosts two-thirds of the world\'s great one-horned rhinoceroses, is a World Heritage Site.',
                history: 'Established in 1905 as a reserve forest on the recommendation of Mary Curzon, the park has been a major success story in rhino conservation.',
                bestTime: 'November to April',
                entryFees: '₹100 (Indians), ₹650 (Foreigners) + Safari costs',
                timings: '07:30 AM - 04:00 PM (Safari timings)',
                locationMapLink: 'https://maps.app.goo.gl/Kaziranga',
                images: ['/images/destinations/kaziranga.jpg', '/images/states/assam.jpg'],
                isFeatured: true
            },
            {
                name: 'Radhanagar Beach',
                state: stateMap['Andaman and Nicobar'],
                city: 'Havelock',
                category: 'Beach',
                description: 'Radhanagar Beach is situated in Havelock Island of Andaman and Nicobar Islands. It is regarded as one of the best beaches in Asia by Time Magazine. The beach is known for its crystal clear turquoise blue waters, fine white sand and lush green forest backdrop.',
                history: 'Consistently rated as one of the top beaches globally, it remains pristine despite its popularity due to strict environmental regulations.',
                bestTime: 'October to May',
                entryFees: 'Free',
                timings: '06:00 AM - 05:00 PM',
                locationMapLink: 'https://maps.app.goo.gl/Radhanagar',
                images: ['/images/destinations/radhanagar-beach.jpg', '/images/states/andaman-and-nicobar.jpg'],
                isFeatured: true
            }
        ];

        await Destination.insertMany(destinationsData);

        return NextResponse.json({
            message: 'Database heavily seeded!',
            stats: {
                states: statesData.length,
                destinations: destinationsData.length
            }
        });

    } catch (error) {
        return NextResponse.json({ error: (error as Error).message }, { status: 500 });
    }
}
