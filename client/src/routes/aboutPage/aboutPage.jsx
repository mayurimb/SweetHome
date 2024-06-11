import { useContext } from "react";
import SearchBar from "../../components/searchBar/SearchBar";
import "./aboutPage.scss";
import { AuthContext } from "../../context/AuthContext";

function AboutPage() {
  const { currentUser } = useContext(AuthContext)

  return (
    <div className="aboutPage">
      <div className="textContainer">
        <div className="wrapper">
          <h1 className="title">Welcome to SweetHome</h1>
          <p>
            At SweetHome, we believe that finding the perfect property should be a clear, straightforward journey. Whether you are searching for a cozy studio apartment or a sprawling estate, our mission is to bring you closer to your dream property through a seamless and enjoyable experience.

            Our Story

            Founded in 2005, SweetHome has grown from a small local office to a premier real estate agency with over a decade of unmatched expertise. Our team is made up of more than 100 dedicated agents who bring passion, deep local knowledge, and a client-first approach to every interaction.
          </p>

          <p>
            <h2> Our Promise </h2> 
              We promise to provide
              <li>Expert Guidance: From navigating property searches to closing deals, our experienced agents are with you every step of the way.</li>
              <li>Vast Selections: Access thousands of listings updated in real-time, ensuring you have the latest information at your fingertips.</li>
              <li>Personalized Service: We tailor our services to meet your individual needs, making your house hunting as unique as you are.</li>
          </p>

          <p>
            <h2>Why Choose SweetHome?</h2>
              <li>Trusted by Thousands: Over 5,000 happy clients and counting.</li>
              <li>Award-Winning Service: Recognized by industry leaders for our innovation and commitment to quality.</li>
              <li>Community Focus: We invest in the communities we serve, supporting local events and initiatives.</li>
          </p>
        </div>
      </div>
      <div className="imgContainer">
        <img src="/bg.png" alt="" />
      </div>
    </div>
  );
}

export default AboutPage;
