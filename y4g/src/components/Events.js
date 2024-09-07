// src/components/Events.js

import React from 'react';

const eventsList = [
  { id: 1, title: 'Event 1', date: '2024-09-15', description: 'Description for Event 1' },
  { id: 2, title: 'Event 2', date: '2024-09-20', description: 'Description for Event 2' },
  // Add more events as needed
];

const Events = () => {
  return (
    <div>
      <h1>Upcoming Events</h1>
      <ul>
        {eventsList.map(event => (
          <li key={event.id}>
            <h2>{event.title}</h2>
            <p>Date: {event.date}</p>
            <p>{event.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Events;