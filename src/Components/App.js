import { handleInitialData } from "../actions/shared";
import PollPage from "./PollPage";
import { useState, useEffect, Fragment } from "react";
import Dashboard from "./Dashboard";
import { connect } from "react-redux";
import Nav from "./Nav";
import LogIn from "./LogIn";
import Leaderboard from "./Leaderboard";
import AddUser from "./AddUser";
import LoadingBar from "react-redux-loading-bar";
import { Routes, Route } from "react-router-dom";
import CreatePoll from "./CreatePoll";
import { useLocation } from "react-router-dom";
import NotFound from "./NotFound";
import RequireAuth from "./RequireAuth";

const withRouter = (Component) => {
  const ComponentWithRouterProp = (props) => {
    let location = useLocation();
    return <Component {...props} router={{ location }} />;
  };

  return ComponentWithRouterProp;
};

const App = (props) => {
  // console.log("app props: ", props);
  const [image, setImage] = useState("");
  const { dispatch, authedUser, loading } = props;
  useEffect(() => {
    // document.body.style.backgroundImage =  "none";
    const generateRandomAvatar = () => {
      fetch("https://avatar-endpoint.herokuapp.com/api/").then((res) => {
        res.blob().then((blobRes) => {
          const data = blobRes;
          const urlCreator = window.URL || window.webkitURL;
          const urlObj = urlCreator.createObjectURL(data);
          setImage(urlObj);
          dispatch(handleInitialData());
        });
      });
    };

    const alreadyLoggedIn = () => {
      dispatch(handleInitialData());
    };

    authedUser === null ? generateRandomAvatar() : alreadyLoggedIn();
  }, [dispatch, authedUser]);



  return (
    <Fragment>
      <LoadingBar />

      {loading ? null : (
        <div className="container">          
            <Fragment>
              {(props.location.pathname === "/" || authedUser) && <Nav />}
              <Routes>
                <Route
                  exact
                  path="/add-user"
                  element={<AddUser image={image} />}
                />
                <Route path="/login" element={<LogIn image={image} />} />
                <Route exact path="/" element={<Dashboard />} />
                <Route exact path="/add" element=
                  {<RequireAuth redirectTo="/login" navPath={props.location.pathname}>
                    <CreatePoll />
                  </RequireAuth>} />
                <Route
                  exact
                  path="/leaderboard"
                  element={
                    <RequireAuth redirectTo="/login" navPath={props.location.pathname}>
                      <Leaderboard />
                    </RequireAuth>
                  }
                />
                 <Route
                  exact
                  path="/answered/questions/:pid"
                  element={
                    <RequireAuth redirectTo="/login" navPath={props.location.pathname}>
                      <PollPage image={image} answered={true} />
                    </RequireAuth>
                  }
                />
                <Route
                  exact
                  path="/questions/:pid"
                  element={
                    <RequireAuth redirectTo="/login" navPath={props.location.pathname}>
                      <PollPage image={image} answered={false} />
                    </RequireAuth>
                  }
                />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Fragment>
        </div>
      )}
    </Fragment>
  );
};



const mapStateToProps = ({ authedUser, loading, users }, props) => {
  // const keys = Object.keys(users);
  const { location } = props.router;
  return {
    loading,
    authedUser,
    avatarURL: users[authedUser]?.avatarURL,
    location,
  };
};

export default withRouter(connect(mapStateToProps)(App));
