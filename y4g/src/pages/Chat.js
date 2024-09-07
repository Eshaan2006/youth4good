import React, { useEffect, useState } from 'react';
import { collection, addDoc, onSnapshot, query, orderBy, doc, getDoc } from 'firebase/firestore';
import { FIRESTORE_DB } from '../data/FirebaseConfig';
import { useAuth } from '../AuthProvider'; // Custom hook for user authentication
import { TextField, Button, Container, Box, Typography, List, ListItem, ListItemText, Avatar, ListItemAvatar } from '@mui/material';
import { useParams } from 'react-router-dom'; // Import useParams

const Chat = () => {
  const { eventId } = useParams(); // Use useParams to get the eventId from the URL
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const { user } = useAuth(); // Get the current user from the auth context
  const [userName, setUserName] = useState(''); // State to store the user's name

  useEffect(() => {
    if (!eventId) {
      console.error('Event ID is undefined.');
      return; // Exit early if eventId is not defined
    }

    // Reference to the "chats" collection for the specific event in Firestore
    const chatRef = collection(FIRESTORE_DB, 'events', eventId, 'chats');
    // Query to order messages by timestamp in ascending order
    const chatQuery = query(chatRef, orderBy('timestamp', 'asc'));

    // Real-time listener for fetching chat messages
    const unsubscribe = onSnapshot(chatQuery, (snapshot) => {
      const chatMessages = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setMessages(chatMessages);
    });

    // Cleanup function to unsubscribe from the listener when the component unmounts
    return () => unsubscribe();
  }, [eventId]);

  useEffect(() => {
    // Fetch user details from Firestore when the component mounts
    const fetchUserName = async () => {
      if (user) {
        const userDocRef = doc(FIRESTORE_DB, 'users', user.uid);
        const userDocSnap = await getDoc(userDocRef);

        if (userDocSnap.exists()) {
          const userData = userDocSnap.data();
          setUserName(userData.firstName); // Set the user's name
        } else {
          console.error('User document does not exist in Firestore.');
        }
      }
    };

    fetchUserName();
  }, [user]);

  // Handle sending a new message
  const handleSendMessage = async () => {
    if (newMessage.trim() === '') return; // Prevent sending empty messages

    try {
      if (!eventId) {
        console.error('Event ID is undefined.');
        return;
      }

      const chatRef = collection(FIRESTORE_DB, 'events', eventId, 'chats');
      await addDoc(chatRef, {
        text: newMessage,
        uid: user.uid,
        displayName: userName || 'Anonymous', // Use fetched userName or fallback to 'Anonymous'
        timestamp: new Date(),
      });

      setNewMessage(''); // Clear the input field after sending
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  if (!eventId) {
    return (
      <Container maxWidth="sm">
        <Typography variant="h6" color="error" align="center">
          Event ID is undefined. Unable to load chat.
        </Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="sm">
      <Box display="flex" flexDirection="column" alignItems="center" mt={4}>
        <Typography variant="h4" gutterBottom>
          Chat
        </Typography>
        <List sx={{ width: '100%', maxHeight: 400, overflowY: 'auto', mb: 2, bgcolor: 'background.paper' }}>
          {messages.map((message) => (
            <ListItem key={message.id} alignItems="flex-start">
              <ListItemAvatar>
                <Avatar>
                  {message.displayName ? message.displayName.charAt(0).toUpperCase() : 'A'}
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={message.displayName || 'Anonymous'}
                secondary={<Typography variant="body2">{message.text}</Typography>}
              />
            </ListItem>
          ))}
        </List>
        <TextField
          label="Type a message..."
          variant="outlined"
          fullWidth
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          sx={{ mb: 2 }}
        />
        <Button variant="contained" color="primary" onClick={handleSendMessage}>
          Send
        </Button>
      </Box>
    </Container>
  );
};

export default Chat;
