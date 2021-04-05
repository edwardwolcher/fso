import React from "react";

const MessageBox = ({ message }) => {
  return (
    <div className="message" data-state={message.type}>
      {message.text}
    </div>
  );
};

export default MessageBox;
