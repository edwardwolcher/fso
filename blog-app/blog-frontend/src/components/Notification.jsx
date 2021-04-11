import React from "react";
import { useSelector } from "react-redux";

const Notification = () => {
  const notification = useSelector((state) => state.notification);

  if (!notification) return <></>;

  return (
    <div className="message" data-state={notification.type}>
      {notification.text}
    </div>
  );
};

export default Notification;
