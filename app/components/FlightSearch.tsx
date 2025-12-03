'use client';

import { useState } from 'react';
import { Flight } from '../api/flights/route';

export default function FlightSearch() {
  const [searchQuery, setSearchQuery] = useState('');
  const [flights, setFlights] = useState<Flight[]>([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!searchQuery.trim()) return;

    setLoading(true);
    setSearched(true);

    try {
      const response = await fetch(`/api/flights?q=${encodeURIComponent(searchQuery)}`);
      const data = await response.json();
      setFlights(data.flights || []);
    } catch (error) {
      console.error('Error fetching flights:', error);
      setFlights([]);
    } finally {
      setLoading(false);
    }
  };

  const formatDateTime = (dateTimeString: string) => {
    const date = new Date(dateTimeString);
    return date.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const createGoogleCalendarLink = (flight: Flight) => {
    // Format dates for Google Calendar (YYYYMMDDTHHMMSS format in UTC)
    const formatForCalendar = (dateString: string) => {
      const date = new Date(dateString);
      return date.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
    };

    const startTime = formatForCalendar(flight.departure.time);
    const endTime = formatForCalendar(flight.arrival.time);

    // Create event title
    const title = `Flight ${flight.flightNumber} - ${flight.airline}`;

    // Create event description with flight details
    const description = `Flight Details:
Airline: ${flight.airline}
Flight Number: ${flight.flightNumber}
Status: ${flight.status}

Departure: ${flight.departure.airport} - ${flight.departure.city}, ${flight.departure.country}
Departure Time: ${formatDateTime(flight.departure.time)} (${flight.departure.timezone})

Arrival: ${flight.arrival.airport} - ${flight.arrival.city}, ${flight.arrival.country}
Arrival Time: ${formatDateTime(flight.arrival.time)} (${flight.arrival.timezone})

Duration: ${flight.duration}`;

    // Create location string
    const location = `${flight.departure.airport} → ${flight.arrival.airport}`;

    // Build Google Calendar URL
    const baseUrl = 'https://calendar.google.com/calendar/render';
    const params = new URLSearchParams({
      action: 'TEMPLATE',
      text: title,
      dates: `${startTime}/${endTime}`,
      details: description,
      location: location,
    });

    return `${baseUrl}?${params.toString()}`;
  };

  const handleCardClick = (flight: Flight) => {
    const calendarUrl = createGoogleCalendarLink(flight);
    window.open(calendarUrl, '_blank');
  };

  return (
    <div className="flight-search-container">
      <div className="search-header fade-in">
        <h1 className="title">
          <span className="gradient-text">Flight Lookup</span>
        </h1>
        <p className="subtitle">
          Search for flight information by entering a flight number
        </p>
      </div>

      <form onSubmit={handleSearch} className="search-form glass-card fade-in">
        <div className="search-input-wrapper">
          <svg
            className="search-icon"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="11" cy="11" r="8"></circle>
            <path d="m21 21-4.35-4.35"></path>
          </svg>
          <input
            type="text"
            className="input search-input"
            placeholder="Enter flight number (e.g., AA100, UA200)"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? 'Searching...' : 'Search Flights'}
        </button>
      </form>

      {loading && (
        <div className="loading-container fade-in">
          <div className="spinner"></div>
          <p>Searching for flights...</p>
        </div>
      )}

      {!loading && searched && (
        <div className="results-container">
          {flights.length > 0 ? (
            <>
              <h2 className="results-title fade-in">
                Found {flights.length} {flights.length === 1 ? 'flight' : 'flights'}
              </h2>
              <div className="flights-grid">
                {flights.map((flight, index) => (
                  <div
                    key={flight.id}
                    className="flight-card glass-card slide-in"
                    style={{ animationDelay: `${index * 100}ms` }}
                    onClick={() => handleCardClick(flight)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        handleCardClick(flight);
                      }
                    }}
                  >
                    <div className="flight-header">
                      <div className="flight-number-badge">
                        {flight.flightNumber}
                      </div>
                      <div className="airline-name">{flight.airline}</div>
                      <div className={`status-badge status-${flight.status.toLowerCase().replace(' ', '-')}`}>
                        {flight.status}
                      </div>
                    </div>

                    <div className="flight-route">
                      <div className="location-info">
                        <div className="location-label">Departure</div>
                        <div className="airport-code">{flight.departure.airport}</div>
                        <div className="city-name">
                          {flight.departure.city}, {flight.departure.country}
                        </div>
                        <div className="time-info">
                          <svg className="icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <circle cx="12" cy="12" r="10"></circle>
                            <polyline points="12 6 12 12 16 14"></polyline>
                          </svg>
                          {formatDateTime(flight.departure.time)}
                        </div>
                        <div className="timezone">{flight.departure.timezone}</div>
                      </div>

                      <div className="route-line">
                        <svg className="plane-icon" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z" />
                        </svg>
                        <div className="duration">{flight.duration}</div>
                      </div>

                      <div className="location-info">
                        <div className="location-label">Arrival</div>
                        <div className="airport-code">{flight.arrival.airport}</div>
                        <div className="city-name">
                          {flight.arrival.city}, {flight.arrival.country}
                        </div>
                        <div className="time-info">
                          <svg className="icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <circle cx="12" cy="12" r="10"></circle>
                            <polyline points="12 6 12 12 16 14"></polyline>
                          </svg>
                          {formatDateTime(flight.arrival.time)}
                        </div>
                        <div className="timezone">{flight.arrival.timezone}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div className="no-results fade-in">
              <svg className="no-results-icon" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8"></circle>
                <path d="m21 21-4.35-4.35"></path>
              </svg>
              <h3>No flights found</h3>
              <p>Try searching with a different flight number</p>
            </div>
          )}
        </div>
      )}

      <style jsx>{`
        .flight-search-container {
          max-width: 1000px;
          margin: 0 auto;
          padding: 2rem 1.5rem;
        }

        .search-header {
          text-align: center;
          margin-bottom: 3rem;
        }

        .title {
          margin-bottom: 0.5rem;
        }

        .gradient-text {
          background: var(--accent-gradient);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .subtitle {
          font-size: 1.1rem;
          color: var(--text-secondary);
        }

        .search-form {
          padding: 2rem;
          margin-bottom: 3rem;
          display: flex;
          gap: 1rem;
          flex-wrap: wrap;
        }

        .search-input-wrapper {
          flex: 1;
          min-width: 250px;
          position: relative;
        }

        .search-icon {
          position: absolute;
          left: 1rem;
          top: 50%;
          transform: translateY(-50%);
          color: var(--text-muted);
          pointer-events: none;
        }

        .search-input {
          padding-left: 3rem;
        }

        .loading-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1rem;
          padding: 3rem;
          color: var(--text-secondary);
        }

        .results-container {
          margin-top: 2rem;
        }

        .results-title {
          margin-bottom: 1.5rem;
          color: var(--text-primary);
        }

        .flights-grid {
          display: grid;
          gap: 1.5rem;
        }

        .flight-card {
          padding: 2rem;
          opacity: 0;
          animation: slideIn 0.4s ease-out forwards;
          cursor: pointer;
          transition: all var(--transition-normal);
        }

        .flight-card:hover {
          transform: translateY(-4px);
          box-shadow: var(--shadow-lg), 0 0 30px rgba(59, 130, 246, 0.2);
        }

        .flight-card:active {
          transform: translateY(-2px);
        }

        .flight-header {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin-bottom: 2rem;
          flex-wrap: wrap;
        }

        .flight-number-badge {
          font-size: 1.5rem;
          font-weight: 700;
          color: var(--accent-primary);
          padding: 0.5rem 1rem;
          background: rgba(59, 130, 246, 0.1);
          border-radius: 8px;
          border: 1px solid rgba(59, 130, 246, 0.3);
        }

        .airline-name {
          font-size: 1.1rem;
          font-weight: 500;
          flex: 1;
        }

        .status-badge {
          padding: 0.5rem 1rem;
          border-radius: 20px;
          font-size: 0.875rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .status-on-time {
          background: rgba(34, 197, 94, 0.15);
          color: rgb(34, 197, 94);
          border: 1px solid rgba(34, 197, 94, 0.3);
        }

        .status-boarding {
          background: rgba(59, 130, 246, 0.15);
          color: rgb(59, 130, 246);
          border: 1px solid rgba(59, 130, 246, 0.3);
        }

        .status-delayed {
          background: rgba(239, 68, 68, 0.15);
          color: rgb(239, 68, 68);
          border: 1px solid rgba(239, 68, 68, 0.3);
        }

        .flight-route {
          display: grid;
          grid-template-columns: 1fr auto 1fr;
          gap: 2rem;
          align-items: center;
        }

        .location-info {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .location-label {
          font-size: 0.875rem;
          color: var(--text-muted);
          text-transform: uppercase;
          letter-spacing: 0.5px;
          font-weight: 600;
        }

        .airport-code {
          font-size: 2rem;
          font-weight: 700;
          color: var(--text-primary);
        }

        .city-name {
          font-size: 1rem;
          color: var(--text-secondary);
        }

        .time-info {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.95rem;
          color: var(--text-primary);
          margin-top: 0.5rem;
        }

        .timezone {
          font-size: 0.875rem;
          color: var(--text-muted);
        }

        .icon {
          color: var(--accent-primary);
        }

        .route-line {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.5rem;
          padding: 0 1rem;
        }

        .plane-icon {
          color: var(--accent-primary);
          transform: rotate(90deg);
        }

        .duration {
          font-size: 0.875rem;
          color: var(--text-secondary);
          font-weight: 600;
          white-space: nowrap;
        }

        .no-results {
          text-align: center;
          padding: 4rem 2rem;
          color: var(--text-secondary);
        }

        .no-results-icon {
          margin: 0 auto 1.5rem;
          color: var(--text-muted);
        }

        .no-results h3 {
          color: var(--text-primary);
          margin-bottom: 0.5rem;
        }

        @media (max-width: 768px) {
          .flight-route {
            grid-template-columns: 1fr;
            gap: 1.5rem;
          }

          .route-line {
            flex-direction: row;
            justify-content: center;
          }

          .plane-icon {
            transform: rotate(90deg);
          }

          .search-form {
            flex-direction: column;
          }

          .search-input-wrapper {
            min-width: 100%;
          }
        }
      `}</style>
    </div>
  );
}
