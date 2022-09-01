import { handleInitialData } from "../actions/shared";
import PollPage from "./PollPage";
import { useState, useEffect, Fragment } from "react";
import Dashboard from "./Dashboard";
import { connect } from "react-redux";
import LogIn from "./LogIn";
import Leaderboard from "./Leaderboard";
import AddUser from "./AddUser";
import LoadingBar from "react-redux-loading-bar";
import { Routes, Route } from "react-router-dom";
import CreatePoll from "./CreatePoll";
// import { useLocation } from "react-router-dom";
import NotFound from "./NotFound";
import RequireAuth from "./wrappers/RequireAuth";
import Layout from "./wrappers/Layout";
import PropTypes from 'prop-types';

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
            <Routes>
              <Route path="/add-user" element={<AddUser image={image} />} />
              <Route path="/login" element={<LogIn image={image} />} />
              <Route path="/" element={<Layout />}>
                <Route index element={<Dashboard />} />
                <Route element={<RequireAuth />}>
                  <Route path="add" element={<CreatePoll />} />
                  <Route path="leaderboard" element={<Leaderboard />} />
                  <Route
                    path="questions/:pid"
                    element={<PollPage image={image} />}
                  />
                </Route>
              </Route>
              <Route
                path="*"
                element={
                  <RequireAuth>
                    <NotFound />
                  </RequireAuth>
                }
              />
            </Routes>
          </Fragment>
        </div>
      )}
    </Fragment>
  );
};

App.propTypes = {
  authedUser:PropTypes.string,
  loading: PropTypes.bool.isRequired, 
}

const mapStateToProps = ({ authedUser, loading }) => {
  return {
    loading,
    authedUser
  };
};

export default connect(mapStateToProps)(App);
