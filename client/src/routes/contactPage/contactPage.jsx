import { useContext } from "react";
import SearchBar from "../../components/searchBar/SearchBar";
import "./contactPage.scss";
import Map from "../../components/map/Map";
import { AuthContext } from "../../context/AuthContext";

function ContactPage() {
  const { currentUser } = useContext(AuthContext)
  //console.log(currentUser)

  return (
    <div className="contactPage">
    <div className="textContainer">
      
        <div className="wrapper">
        <h1 className="title">Get in Touch with our Team</h1>
        <div className="boxes">
        <div className="box">
            <p >
            Business Hours
            Monday - Friday: 9:00 AM - 6:00 PM</p>
            <p>Saturday: 10:00 AM - 4:00 PM</p>
            <p>Sunday: Closed</p>   
          </div>
          <div className="box">
            <p>Office Address</p>
            <p>SweetHome Real Estate</p>
            <p>123 Main Street</p>
            <p>Boston, MA</p>
            <p>

            Call us at: (123) 456-7890
            
            </p>
          </div>
          </div>
          <div className="boxes">
          
          <div className="box">
            <img src="/lady2.png"/>
            <h2>Lorelai Gilmore</h2>
            <h2><a href="mailto:phool@sweethome.com">lorelai@sweethome.com</a></h2>
          </div>
          <div className="box">
            <img src="/man1.png"/>
            <h2>Michael Scott </h2>
            <h2><a href="mailto:phool@sweethome.com">michael@sweethome.com</a></h2>
          </div>
          
          
          
        </div>

        
      </div>
    </div>
    
    <div className="imgContainer">
      <img src="/bg.png" alt="" />
    </div>
  </div>
  );
}

export default ContactPage;
