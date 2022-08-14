import { handleInitialData } from "../actions/shared";
import PollPage from "./PollPage";
import { useState, useEffect, Fragment } from "react";
import Dashboard from "./Dashboard";
import { connect } from "react-redux";
import Nav from './Nav';
import LogIn from "./LogIn";
import Leaderboard from "./Leaderboard";
import AddUser from "./AddUser";
import LoadingBar from "react-redux-loading-bar";
import { Routes, Route } from "react-router-dom";
import CreatePoll from "./CreatePoll";
import { useLocation, useNavigate, useParams } from "react-router-dom";

const withRouter = (Component) => {
  const ComponentWithRouterProp = (props) => {
    let location = useLocation();
    let navigate = useNavigate();
    let params = useParams();
    return <Component {...props} router={{ location, navigate, params }} />;
  };

  return ComponentWithRouterProp;
};

const App = (props) => {
  console.log("app props: ", props);
  const [image, setImage] = useState("");
  useEffect(() => {
   
    const generateRandomAvatar = () => {
      fetch("https://avatar-endpoint.herokuapp.com/api/").then((res) => {
        res.blob().then((blobRes) => {
          const data = blobRes;
          const urlCreator = window.URL || window.webkitURL;
          const urlObj = urlCreator.createObjectURL(data);
          setImage(urlObj);
          console.log("trigged in generateavatar");
          props.dispatch(handleInitialData());
        });
      });
    }

    const alreadyLoggedIn = () => {
      console.log("triggerd at already")
      props.dispatch(handleInitialData());
    }
    
    props.authedUser === null 
      ? generateRandomAvatar() 
      : alreadyLoggedIn();
  }, []);



  return (
    <Fragment>
      <LoadingBar />       
        {props.loading ? null : (   
            <div className="container">              
              {props.location.pathname === "/add-user" 
                ? <AddUser image={image} />
                : props.authedUser
                  ? (
                    <Fragment>                   
                      <Nav />
                      <Routes>
                        <Route path="/" exact element={<Dashboard />} />                        
                        <Route path="/login" element={<LogIn image={image} />} />
                        <Route path="/new" element={<CreatePoll />} />
                        <Route path="/leaderboard" element={<Leaderboard />} />
                        <Route path="/questions/:pid" element={<PollPage image={image}/>} />
                      </Routes>
                    </Fragment>   
                  )           
                  : <LogIn image={image} />                  
              }            
            </div>
        )}
    </Fragment>
  );
};

const mapStateToProps = ({  authedUser, loading, users }, props) => {  
  // const keys = Object.keys(users);
  const { location } = props.router;
  return {
    loading: loading,
    authedUser,
    avatarURL: users[authedUser]?.avatarURL,
    location,
  }
    
    
};
  

export default withRouter(connect(mapStateToProps)(App));
