// LocationTracker.js
import React, { useEffect, useState } from "react";
import Geolocation from "react-native-geolocation-service";
import io from "socket.io-client";
const LocationTracker = () => {
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    // Initialize socket connection
    const newSocket = io("https://viewlytics.in/api/v2/app/location_track");
    setSocket(newSocket);

    // Function to retrieve current location
    const getCurrentLocation = () => {
      Geolocation.getCurrentPosition(
        (position) => {
          setLatitude(position.coords.latitude);
          setLongitude(position.coords.longitude);
        },
        (error) => {
          console.error("Error getting location:", error);
        },
        { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
      );
    };

    // Initial location retrieval
    getCurrentLocation();

    // Timer to update location and send data every 10 minutes
    const timer = setInterval(() => {
      getCurrentLocation();
      sendData();
    }, 10 * 60 * 1000); // 10 minutes in milliseconds

    // Clear the timer and close the socket on component unmount
    return () => {
      clearInterval(timer);
      if (socket) {
        socket.close();
      }
    };
  }, []);

  const sendData = () => {
    if (latitude !== null && longitude !== null && socket) {
      const data = {
        latitude: latitude,
        longitude: longitude,
      };

      // Emit 'locationUpdate' event to the server
      socket.emit("location", data);

      // Log success message
      console.log("Data sent successfully:", data);
    }
  };

  return null; // No need to render anything in this component
};

export default LocationTracker;
