import React from "react";

const ErrorMessages = ({ messages }) => {
  return (
    <div className="message-pane">
      {messages.map((item) => (
        <div className="message error">{item}</div>
      ))}
    </div>
  );
};

export default ErrorMessages;