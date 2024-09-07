// src/pages/Events.js
import React, { useEffect, useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore';
import { FIRESTORE_DB } from '../data/FirebaseConfig'; // Adjust the path if needed

const localizer = momentLocalizer(moment);

function Events() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    // Reference to the "events" collection in Firestore
    const eventsRef = collection(FIRESTORE_DB, 'events');
    // Query to order events by date in ascending order
    const eventsQuery = query(eventsRef, orderBy('date', 'asc'));

    // Real-time listener for fetching events
    const unsubscribe = onSnapshot(eventsQuery, (snapshot) => {
      const eventsData = snapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          id: doc.id,
          title: data.title,
          start: data.date.toDate(), // Converts Firestore Timestamp to JS Date
          end: new Date(data.date.toDate().getTime() + 3600000), // 1 hour duration
        };
      });
      setEvents(eventsData);
    });

    // Cleanup function to unsubscribe from the listener when the component unmounts
    return () => unsubscribe();
  }, []);

  return (
    <div>
      <h1>Upcoming Events</h1>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: '600px' }}
      />
    </div>
  );
}

export default Events;
