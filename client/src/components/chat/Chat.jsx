import { useRef, useState } from "react";
import "./chat.scss";
import { AuthContext } from "../../context/AuthContext";
import { useContext, useEffect } from "react";
import apiRequest from "../../lib/apiRequest";
import { format } from 'timeago.js'
import { SocketContext } from "../../context/SocketContext";
import { useNotificationStore } from "../../lib/notificationStore"; 
import { useLocation } from "react-router-dom";

function Chat({allchats, ownerId}) {
  const [isCreatingNewChat, setIsCreatingNewChat] = useState(false);
  const [chat, setChat] = useState(null);
  const [chats, setChats] = useState(allchats);
  const { currentUser } = useContext(AuthContext);
  const { socket } = useContext(SocketContext) 
  const messageEndRef = useRef()
  const decrease = useNotificationStore((state) => state.decrease);

  useEffect(()=> {
    if(chats.length==0 && !isCreatingNewChat){
      setIsCreatingNewChat(true)
      apiRequest.post("/chats/" , { receiverId:ownerId })
      .then(async (res)=>{
        console.log("craeted chat",res); 
        const newChats = await apiRequest("/chats/")
        console.log("newChats", newChats)
        setChats(prev=> [...prev,newChats.data[0]]); 
        setIsCreatingNewChat(false)
      })
      .catch(err=>{console.err(err)}) 
    }
  },[])
  

  useEffect( () => {
    messageEndRef.current?.scrollIntoView({behaviour: "smooth"})
  }, [chat])

  const handleOpenChat = async (id, receiver) => {
    try {
      const res = await apiRequest("/chats/" + id);
      console.log("asd",res)
      if (!res.data.seenBy.includes(currentUser.id)) {
        decrease();
      } 
      setChat({ ...res.data, receiver });
    } catch (err) {
      console.log(err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const text = formData.get("text");
     if (!text) return;
    try {
      const res = await apiRequest.post("/messages/" + chat.id, { text });
      setChat((prev) => ({ ...prev, messages: [...prev.messages, res.data] }));
      e.target.reset();
      socket.emit("sendMessage", {
        receiverId: chat.receiver.id,
        data: res.data
      })
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const read = async () => {
      try {
        await apiRequest.put("/chats/read/" + chat.id);
      } catch (err) {
        console.log(err);
      }
    };

    if (chat && socket) {
      socket.on("getMessage", (data) => {
        if (chat.id === data.chatId) {
          setChat((prev) => ({ ...prev, messages: [...prev.messages, data] }));
          read();
        }
      });
    }
    return () => {
      socket.off("getMessage");
    };
  }, [socket, chat]);

  return (
    <div className="chat">
      <div className="messages">
        <h1>Messages</h1>
        {chats?.map((c)=>(
          <div className="message" key={c.id}
          style={{
            backgroundColor:
              c.seenBy?.includes(currentUser.id) || chat?.id ===c.id ? "white" : "#fecd514e",
          }}
          onClick={() => handleOpenChat(c.id, c.receiver)}
          >
          
          <img
            src={c.receiver?.avatar ||"noimage.jpeg"}
            alt=""
          />
          <span>{c.receiver?.username}</span>
          <p>{c.lastMessage} </p>
        </div>
        ))}
      </div>
      {chat && (
        <div className="chatBox">
          <div className="top">
            <div className="user">
              <img
                src={chat.receiver?.avatar || "noimage.jpeg"}
                alt=""
              />
              {chat.receiver?.username}
            </div>
            <span className="close" onClick={() => { setChat(null) }}>X</span>
          </div>
          <div className="center">
            {chat.messages?.map((message) => (
              <div className="chatMessage" 
                style={{
                  alignSelf:
                    message.userId === currentUser.id
                      ? "flex-end"
                      : "flex-start",
                  textAlign:
                    message.userId === currentUser.id ? "right" : "left",
                }}
                key={message.id}>
              <p>{message.text}</p>
              <span>{format(message.createdAt)}</span>
              </div>
            ))}
            <div ref={messageEndRef}></div>
          </div>
          <form onSubmit={handleSubmit} className="bottom">
            <textarea name="text"></textarea>
            <button>Send</button>
          </form>
        </div>
      )}
    </div>
  );
}

export default Chat;
