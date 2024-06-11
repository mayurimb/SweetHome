import "./newChat.scss";
import Slider from "../../components/slider/Slider";
import Map from "../../components/map/Map";
import { singlePostData, userData } from "../../lib/dummydata";
import { useLoaderData , useNavigate, Await, useLocation} from "react-router-dom";
import DOMPurify from "dompurify"
import { useContext, Suspense, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";
import apiRequest  from "../../lib/apiRequest"; 
import { useState } from "react";
import Chat from "../../components/chat/Chat";

function NewChat() {
  const post = useLoaderData()
  const [saved, setSaved] = useState(post.isSaved);
  const {currentUser} = useContext(AuthContext)
  const navigate = useNavigate();
  const [chat, setChat] = useState(null);
  const location = useLocation();
  const ownerId = location.state.ownerId;
  
  useEffect(() => {
    if (!post) return;
    const ownerChat = post.profilePageData.chats.find(chat => chat.receiver.id === ownerId);
    if (ownerChat) {
      setChat(ownerChat);
    }
  }, [post, ownerId]);

  return (
    <div className="singlePage">
      <div className="details">
        <div className="wrapper">
          <Slider images={post.singlePageData.images} />
          <div className="info">
            <div className="top">
              <div className="post">
                <h1>{post.singlePageData.title}</h1>
                <div className="address">
                  <img src="/pin.png" alt="" />
                  <span>{post.singlePageData.address}</span>
                </div>
                <div className="price">$ {post.singlePageData.price}</div>
              </div>
              <div className="user">
                <img src={post.singlePageData.user.avatar || '/noimage.jpeg'} alt="" />
                <span>{post.singlePageData.user.username}</span>
              </div>
 
            </div>
            <div className="bottom" dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(post.singlePageData.postDetail.desc),
            }}></div>
          </div>
        </div>
      </div>
      
      <div className="chatContainer">
        <div className="wrapper">
              <Chat allchats={post.profilePageData.chats} ownerId={ownerId}/>
        </div>
      </div>
    </div>
    
  );
}

export default NewChat;
