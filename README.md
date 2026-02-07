# TravelBharat 🇮🇳

**TravelBharat** is your ultimate digital guide to exploring the rich heritage, diverse culture, and breathtaking landscapes of India. Whether you are looking for spiritual solace, historical grandeur, or natural beauty, TravelBharat helps you discover and plan your next Indian adventure.

## 🚀 Features

-   **Explore Destinations**: Browse a curated collection of 245+ destinations categorized by Heritage, Nature, Spiritual, and Adventure.
-   **Interactive Discovery**: Filter destinations by region (North, South, East, West) to find hidden gems.
-   **Plan Your Trip**: Use our planning tools to create the perfect itinerary.
-   **Admin Dashboard**: A secure interface for managing destination data (add, edit, delete locations).
-   **Responsive Design**: A seamless experience across all devices, from desktops to mobile phones.

## 🛠️ Tech Stack

-   **Frontend**: [Next.js 15](https://nextjs.org/) (App Router)
-   **Styling**: [Tailwind CSS](https://tailwindcss.com/)
-   **Database**: [MongoDB](https://www.mongodb.com/) (with Mongoose)
-   **Animations**: [Framer Motion](https://www.framer.com/motion/)
-   **Icons**: [Lucide React](https://lucide.dev/)
-   **Deployment**: [Vercel](https://vercel.com/)

## 🏁 Getting Started

Follow these steps to set up the project locally on your machine.

### Prerequisites

-   [Node.js](https://nodejs.org/) (v18 or higher)
-   [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
-   A MongoDB connection string

### Installation

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/akashcpatil111/travelbharat.git
    cd travelbharat
    ```

2.  **Install dependencies:**

    ```bash
    npm install
    # or
    yarn install
    ```

3.  **Set up environment variables:**

    Create a `.env.local` file in the root directory and add your MongoDB connection string:

    ```env
    MONGODB_URI=your_mongodb_connection_string
    ```

4.  **Run the development server:**

    ```bash
    npm run dev
    # or
    yarn dev
    ```

    Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 📂 Project Structure

```
travelbharat/
├── public/              # Static assets (images, icons)
├── src/
│   ├── app/             # Next.js App Router pages and layouts
│   ├── components/      # Reusable UI components
│   ├── lib/             # Utility functions and database connection
│   ├── models/          # Mongoose data models
│   └── styles/          # Global styles
├── .env.local           # Environment variables (not committed)
└── package.json         # Project dependencies and scripts
```

## 🚀 Deployment

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new).

1.  Push your code to a GitHub repository.
2.  Import the project into Vercel.
3.  Add the `MONGODB_URI` environment variable in the Vercel project settings.
4.  Deploy!

Check out the [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
