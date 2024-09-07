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
    // Create a reference to the "events" collection
    const eventsRef = collection(FIRESTORE_DB, 'events');
    // Create a query to order events by date
    const eventsQuery = query(eventsRef, orderBy('date', 'asc'));

    // Set up a real-time listener for the events collection
    const unsubscribe = onSnapshot(eventsQuery, (snapshot) => {
      const eventsData = snapshot.docs.map((doc) => ({
        id: doc.id,
        title: doc.data().name,
        start: new Date(doc.data().date.seconds * 1000),
        end: new Date(doc.data().date.seconds * 1000 + 3600000) // 1 hour duration
      }));
      setEvents(eventsData);
    });

    // Clean up the subscription on unmount
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
