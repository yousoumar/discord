import { useState, useEffect } from "react";
import TimeAgo from "timeago-react";
import { useChatContext } from "../../contexts/ChatContextProvider";
import { useUserContext } from "../../contexts/UserContextProvider";
import Member from "../Member/Member";
import "./Message.scss";

export default function Message(props) {
  const [showForm, setShowForm] = useState(false);
  const [showDeletBox, setShowDeletBox] = useState(false);
  const { user } = useUserContext();
  const { socket, channel } = useChatContext();
  const [message, setMessage] = useState(props.message);
  useEffect(() => {
    socket.current.on("messageEdited", (message) => {
      console.log(message);
      setMessage(message);
    });
    return () => {};
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [socket.current]);
  const editMessage = async (event) => {
    event.preventDefault();
    const newText = event.currentTarget.text.value;
    const newMessge = {
      ...message,
      text: newText,
      isEdited: true,
      updatedAt: new Date(),
    };
    fetch("/api/message/editMessage", {
      method: "POST",
      body: JSON.stringify({
        text: newText,
        id: message._id,
      }),
      headers: { "Content-Type": "application/json" },
    });
    socket.current.emit("messageEdited", {
      roomId: channel._id,
      message: newMessge,
    });
    setMessage(newMessge);
    setShowForm(false);
  };
  const deleteMessage = async (event) => {
    event.preventDefault();
    const newMessge = {
      ...message,
      isDeleted: true,
      isEdited: true,
      updatedAt: new Date(),
    };
    fetch("/api/message/deleteMessage/" + message._id, {
      method: "PUT",
    });
    socket.current.emit("messageEdited", {
      roomId: channel._id,
      message: newMessge,
    });
    setMessage(newMessge);
    setShowDeletBox(false);
  };
  if (showForm) {
    return (
      <div className="message">
        <form action="" onSubmit={(e) => editMessage(e)}>
          <input type="text" name="text" defaultValue={message.text} />
          <div className="links">
            <button className="primary" type="submit">
              Register
            </button>
            <button onClick={() => setShowForm(false)}>Cancel</button>
          </div>
        </form>
      </div>
    );
  }
  if (showDeletBox) {
    return (
      <div className="message">
        <h1>Are you sure you wanna delete this message ?</h1>
        <div className="links">
          <button className="danger" onClick={(e) => deleteMessage(e)}>
            Yes
          </button>
          <button onClick={() => setShowDeletBox(false)}>No</button>
        </div>
      </div>
    );
  }
  return (
    <div
      className={message.isDeleted ? "message deleted" : "message"}
      key={message._id}
    >
      <div className="top">
        <Member member={message.owner} />
        {message.isEdited ? (
          <p className="date">
            {message.isDeleted ? "deleted " : "edited "}
            <TimeAgo datetime={message.updatedAt} opts={{ minInterval: 60 }} />
          </p>
        ) : (
          <p className="date">
            posted{" "}
            <TimeAgo datetime={message.createdAt} opts={{ minInterval: 60 }} />
          </p>
        )}
      </div>
      <div className="text">
        {message.isDeleted ? "Message deleted." : message.text}
      </div>

      {message.owner._id === user._id && !message.isDeleted && (
        <div className="links">
          <button className="primary" onClick={() => setShowForm(true)}>
            Edit
          </button>
          <button className="danger" onClick={() => setShowDeletBox(true)}>
            Delete
          </button>
        </div>
      )}
    </div>
  );
}
