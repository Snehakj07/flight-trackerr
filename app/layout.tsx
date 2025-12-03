import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
    title: 'Flight Tracker',
    description: 'Search for flight details including departure and arrival times, locations, and time zones',
    keywords: ['flight lookup', 'flight search', 'flight information', 'flight tracker'],
    icons: {
        icon: '/favicon.ico',
    },
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body>{children}</body>
        </html>
    );
}
