// src/pages/Events.js

import React from 'react';

function Events() {
  // Example event data
  const events = [
    {
      id: 1,
      title: 'Community Cleanup Day',
      date: '2024-10-01',
      description: 'Join us for a day of cleaning up the local park and making a difference in our community.',
    },
    {
      id: 2,
      title: 'Fundraising Gala',
      date: '2024-11-15',
      description: 'Attend our annual gala to support Youth4Good and enjoy a night of dinner, entertainment, and auctions.',
    },
    {
      id: 3,
      title: 'Volunteer Orientation',
      date: '2024-09-20',
      description: 'New volunteers are invited to our orientation session to learn about our programs and how to get involved.',
    },
  ];

  return (
    <div className="events">
      <h2>Upcoming Events</h2>
      <div className="event-list">
        {events.map((event) => (
          <div key={event.id} className="event-item">
            <h3>{event.title}</h3>
            <p><strong>Date:</strong> {event.date}</p>
            <p>{event.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Events;