import React, { useEffect, useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { collection, query, orderBy, onSnapshot, doc, updateDoc, arrayUnion, getDoc } from 'firebase/firestore';
import { FIRESTORE_DB } from '../data/FirebaseConfig';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  List,
  ListItem,
  ListItemText,
  Box,
} from '@mui/material';
import { Check as CheckIcon } from '@mui/icons-material'; // Correct Import for Check Icon
import { useAuth } from '../AuthProvider';
import { useNavigate } from 'react-router-dom';
import { Timestamp } from 'firebase/firestore';

const localizer = momentLocalizer(moment);

function Events() {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null); // State for selected event
  const [isModalOpen, setModalOpen] = useState(false); // State for modal visibility
  const [attendees, setAttendees] = useState([]); // State for event attendees
  const [showAttendees, setShowAttendees] = useState(false); // State to show/hide attendees
  const [isUserJoined, setIsUserJoined] = useState(false); // State to check if user is already joined
  const navigate = useNavigate(); // Initialize useNavigate for navigation after login
  const { user } = useAuth(); // Custom hook to get the current user (make sure this hook is properly set up)

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
          location: data.location,
          description: data.activities,
          duration: data.duration,
          attendees: data.attendees || [], // Fetch attendees array
        };
      });
      setEvents(eventsData);
    });

    // Cleanup function to unsubscribe from the listener when the component unmounts
    return () => unsubscribe();
  }, []);


  // Handle event click to open modal
  const handleSelectEvent = (event) => {
    setSelectedEvent(event); // Set the selected event
    setAttendees(event.attendees); // Set attendees for the selected event
    setModalOpen(true); // Open the modal
    setShowAttendees(false); // Reset showAttendees state

    // Check if the user is already joined
    if (user) {
      const alreadyJoined = event.attendees.some((attendee) => attendee.uid === user.uid);
      setIsUserJoined(alreadyJoined);
    }
  };

  // Close the modal
  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedEvent(null); // Clear selected event
    setAttendees([]); // Clear attendees
    setShowAttendees(false); // Reset showAttendees state
    setIsUserJoined(false); // Reset user joined state
  };

  // Handle Join as Volunteer
  const handleJoinEvent = async () => {
    if (!user) {
      alert("Please log in to join the event.");
      return;
    }

    try {
      // Fetch user details from Firestore
      const userDocRef = doc(FIRESTORE_DB, 'users', user.uid);
      const userDocSnap = await getDoc(userDocRef);

      if (userDocSnap.exists()) {
        const userData = userDocSnap.data();
        const userName = userData.firstName; // Get firstName from user document in Firestore

        const eventRef = doc(FIRESTORE_DB, 'events', selectedEvent.id);

        // Update Firestore to add the current user to the attendees list
        await updateDoc(eventRef, {
          attendees: arrayUnion({
            name: userName,
            uid: user.uid,
            attended: false,
            arrivalTime: null, // Initialize as null for editable timestamps
            departTime: null,  // Initialize as null for editable timestamps
            timeWorked: "0h 0m 0s", // Initialize time worked as 0
          }),
        });

        // Update local state to reflect the change
        setAttendees((prev) => [
          ...prev,
          { uid: user.uid, name: userName, attended: false, arrivalTime: null, departTime: null, timeWorked: "0h 0m 0s" },
        ]);
        setIsUserJoined(true); // Set user joined state to true
      } else {
        console.error("User document does not exist in Firestore.");
      }
    } catch (error) {
      console.error("Error joining event:", error);
    }
  };

  // Toggle Attendees List
  const handleToggleAttendees = () => {
    setShowAttendees(!showAttendees); // Toggle the visibility of the attendees list
  };

  // Handle marking the attendee as arrived
  const handleMarkArrived = async (index) => {
    const currentTime = new Date(); // Capture the current time
    const updatedAttendees = [...attendees];
    updatedAttendees[index].attended = true; // Mark as attended
    updatedAttendees[index].arrivalTime = Timestamp.fromDate(currentTime); // Set arrival time to current time

    setAttendees(updatedAttendees); // Update state

    // Update Firestore
    if (selectedEvent) {
      const eventRef = doc(FIRESTORE_DB, 'events', selectedEvent.id);
      await updateDoc(eventRef, {
        attendees: updatedAttendees,
      });
    }
  };

  // Handle marking the attendee as departed
  const handleMarkDeparted = async (index) => {
    const currentTime = new Date(); // Capture the current time
    const updatedAttendees = [...attendees];
    updatedAttendees[index].departTime = Timestamp.fromDate(currentTime); // Set departure time to current time

    // Calculate time worked
    const arrivalTime = updatedAttendees[index].arrivalTime.toDate();
    const departTime = currentTime;
    const timeDiffMs = departTime - arrivalTime; // Difference in milliseconds

    const hours = Math.floor(timeDiffMs / (1000 * 60 * 60)); // Calculate hours
    const minutes = Math.floor((timeDiffMs % (1000 * 60 * 60)) / (1000 * 60)); // Calculate minutes
    const seconds = Math.floor((timeDiffMs % (1000 * 60)) / 1000); // Calculate seconds

    const timeWorkedFormatted = `${hours}h ${minutes}m ${seconds}s`; // Format time worked
    updatedAttendees[index].timeWorked = timeWorkedFormatted; // Store formatted time worked

    setAttendees(updatedAttendees); // Update state

    // Update Firestore
    if (selectedEvent) {
      const eventRef = doc(FIRESTORE_DB, 'events', selectedEvent.id);
      await updateDoc(eventRef, {
        attendees: updatedAttendees,
      });
    }
  };

  // Placeholder function for "Chat with Other Volunteers"
  const handleChatWithVolunteers = () => {
    if (selectedEvent) {
      navigate(`/chat/${selectedEvent.id}`, { state: { eventTitle: selectedEvent.title } });
    }
  };

  return (
    <div>
      <h1>Upcoming Events</h1>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: '600px' }}
        onSelectEvent={handleSelectEvent} // Set event click handler
      />

      {/* Event Details Modal */}
      <Dialog open={isModalOpen} onClose={handleCloseModal}>
        <DialogTitle>Event Details</DialogTitle>
        <DialogContent>
          {selectedEvent && (
            <>
              <Typography variant="h6">{selectedEvent.title}</Typography>
              <Typography variant="body1">
                <strong>Date:</strong> {selectedEvent.start.toLocaleString()}
              </Typography>
              <Typography variant="body1">
                <strong>Location:</strong> {selectedEvent.location}
              </Typography>
              <Typography variant="body1">
                <strong>Description:</strong> {selectedEvent.description}
              </Typography>
              <Typography variant="body1">
                <strong>Duration:</strong> {selectedEvent.duration + ' hours'}
              </Typography>
              <Button variant="outlined" onClick={handleToggleAttendees} sx={{ mt: 2 }}>
                {showAttendees ? 'Hide Attendees' : 'List of Attendees'}
              </Button>
              {showAttendees && (
                <Box sx={{ maxHeight: 200, overflowY: 'auto', mt: 2 }}>
                  <Typography variant="h6">Attendees:</Typography>
                  {attendees.length > 0 ? (
                    <List>
                      {attendees.map((attendee, index) => (
                        <ListItem key={attendee.uid}>
                          <ListItemText primary={attendee.name} />
                          {user && (user.role === 'Manager' || user.role === 'Executive') ? ( // Ensure user is defined
                            <>
                              {!attendee.attended ? (
                                <>
                                  <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={() => handleMarkArrived(index)}
                                  >
                                    Arrived
                                  </Button>
                                </>
                              ) : (
                                <>
                                  {attendee.departTime ? (
                                    <>
                                      <CheckIcon color="success" /> {/* Show check icon if departed */}
                                      <Typography variant="body2" sx={{ ml: 1 }}>
                                        {attendee.timeWorked} {/* Display time worked */}
                                      </Typography>
                                    </>
                                  ) : (
                                    <Button
                                      variant="contained"
                                      color="error"
                                      onClick={() => handleMarkDeparted(index)}
                                    >
                                      Departed
                                    </Button>
                                  )}
                                </>
                              )}
                            </>
                          ) : null // No additional text or input for non-managers
                          }
                        </ListItem>
                      ))}
                    </List>
                  ) : (
                    <Typography variant="body2">None</Typography> // Display "None" if no attendees
                  )}
                </Box>
              )}
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal} color="primary">
            Close
          </Button>
          {user && (
            isUserJoined ? (
              <Button onClick={handleChatWithVolunteers} color="primary">
                Chat with Other Volunteers
              </Button>
            ) : (
              <Button onClick={handleJoinEvent} color="primary">
                Join as Volunteer
              </Button>
            )
          )}
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default Events;
