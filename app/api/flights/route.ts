import { NextResponse } from 'next/server';

export interface Flight {
    id: string;
    flightNumber: string;
    airline: string;
    departure: {
        airport: string;
        city: string;
        country: string;
        time: string;
        timezone: string;
    };
    arrival: {
        airport: string;
        city: string;
        country: string;
        time: string;
        timezone: string;
    };
    duration: string;
    status: string;
}

// Mock flight database
const mockFlights: Flight[] = [
    {
        id: '1',
        flightNumber: 'AA100',
        airline: 'American Airlines',
        departure: {
            airport: 'JFK',
            city: 'New York',
            country: 'USA',
            time: '2025-12-03T08:00:00',
            timezone: 'EST (UTC-5)',
        },
        arrival: {
            airport: 'LAX',
            city: 'Los Angeles',
            country: 'USA',
            time: '2025-12-03T11:30:00',
            timezone: 'PST (UTC-8)',
        },
        duration: '6h 30m',
        status: 'On Time',
    },
    {
        id: '2',
        flightNumber: 'UA200',
        airline: 'United Airlines',
        departure: {
            airport: 'ORD',
            city: 'Chicago',
            country: 'USA',
            time: '2025-12-03T14:15:00',
            timezone: 'CST (UTC-6)',
        },
        arrival: {
            airport: 'LHR',
            city: 'London',
            country: 'UK',
            time: '2025-12-04T04:45:00',
            timezone: 'GMT (UTC+0)',
        },
        duration: '8h 30m',
        status: 'Boarding',
    },
    {
        id: '3',
        flightNumber: 'DL300',
        airline: 'Delta Air Lines',
        departure: {
            airport: 'ATL',
            city: 'Atlanta',
            country: 'USA',
            time: '2025-12-03T10:30:00',
            timezone: 'EST (UTC-5)',
        },
        arrival: {
            airport: 'CDG',
            city: 'Paris',
            country: 'France',
            time: '2025-12-04T01:15:00',
            timezone: 'CET (UTC+1)',
        },
        duration: '9h 45m',
        status: 'On Time',
    },
    {
        id: '4',
        flightNumber: 'BA456',
        airline: 'British Airways',
        departure: {
            airport: 'LHR',
            city: 'London',
            country: 'UK',
            time: '2025-12-03T16:00:00',
            timezone: 'GMT (UTC+0)',
        },
        arrival: {
            airport: 'JFK',
            city: 'New York',
            country: 'USA',
            time: '2025-12-03T19:30:00',
            timezone: 'EST (UTC-5)',
        },
        duration: '8h 30m',
        status: 'Delayed',
    },
    {
        id: '5',
        flightNumber: 'EK789',
        airline: 'Emirates',
        departure: {
            airport: 'DXB',
            city: 'Dubai',
            country: 'UAE',
            time: '2025-12-03T03:45:00',
            timezone: 'GST (UTC+4)',
        },
        arrival: {
            airport: 'SYD',
            city: 'Sydney',
            country: 'Australia',
            time: '2025-12-03T22:15:00',
            timezone: 'AEDT (UTC+11)',
        },
        duration: '14h 30m',
        status: 'On Time',
    },
];

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q')?.toUpperCase() || '';

    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 500));

    if (!query) {
        return NextResponse.json({ flights: [] });
    }

    // Search for flights matching the query
    const results = mockFlights.filter(flight =>
        flight.flightNumber.toUpperCase().includes(query) ||
        flight.airline.toUpperCase().includes(query)
    );

    return NextResponse.json({ flights: results });
}
