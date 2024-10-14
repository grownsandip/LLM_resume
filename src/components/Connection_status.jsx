import React,{useState,useEffect} from 'react'
import { Detector } from "react-detect-offline";
import "./connection_status.css";
const Connection_status = () => {
    const [showNotification, setShowNotification] = useState(false); // Control visibility of the notification
    const [notificationMessage, setNotificationMessage] = useState(""); // Message to show
    const [notificationType, setNotificationType] = useState(""); // "online" or "offline"
  
    useEffect(() => {
      if (showNotification) {
        // Hide the notification after 3 seconds
        const timer = setTimeout(() => {
          setShowNotification(false);
        }, 5000); // Adjust the time as needed (3000 = 3 seconds)
  
        return () => clearTimeout(timer); // Cleanup the timer on unmount
      }
    }, [showNotification]);
  return(
    <Detector
    render={({ online }) => {
      if (online && notificationType !== "online") {
        setNotificationMessage("Welcome back");
        setNotificationType("online");
        setShowNotification(true); // Show notification when online
      } else if (!online && notificationType !== "offline") {
        setNotificationMessage("Oops, please check your connection!");
        setNotificationType("offline");
        setShowNotification(true); // Show notification when offline
      }

      return (
        <>
          {showNotification && (
            <div className={`notification ${notificationType}`}>
              {notificationMessage}
            </div>
          )}
          </>
      );
    }}
  />
);
};

export default Connection_status