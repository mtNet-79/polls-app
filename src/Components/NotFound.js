import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/nowhere.scss";


const Nowhere = (props) => {
 
  const navigate = useNavigate();

  useEffect(() => {
    document.body.style.backgroundImage = `url('https://assets.codepen.io/1538474/star.svg'), linear-gradient(to bottom, #05007A, #4D007D)`;

    return () => {
      document.body.style.backgroundImage = 'none';
    }
  }, [])
  return (
    <>
      <div className="mars"></div>
      <img src="https://assets.codepen.io/1538474/404.svg" alt="" className="logo-404" />
      <img src="https://assets.codepen.io/1538474/meteor.svg" alt="" className="meteor" />
      <p className="title">Halt!!</p>
      <p className="subtitle">
        You’re either misspelling the URL <br /> or requesting a page that's no
        longer here.
      </p>
      <div align="center">
        <span className="btn-back" onClick={() => navigate("/")}>
          Back to Home page
        </span>
        
      </div>
      <img
        src="https://assets.codepen.io/1538474/astronaut.svg"
        className="astronaut"
        alt="astronaut"
      />
      <img
        src="https://assets.codepen.io/1538474/spaceship.svg"
        className="spaceship"
        alt="spaceship"
      />
    </>
  );
};


export default Nowhere;
