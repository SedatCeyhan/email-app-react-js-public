import React, { useEffect } from "react";
import "./App.css";
import Header from "./Header";
import Sidebar from "./Sidebar";
import Mail from "./Mail";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import EmailList from "./EmailList";
import SendMail from "./SendMail";
import { useDispatch, useSelector } from "react-redux";
import { selectSendMessageIsOpen } from "./features/mailSlice";
import { login, selectUser } from "./features/userSlice";
import Login from "./Login";
import { auth } from "./firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import Spinner from "react-spinkit";
import CircularProgress from '@material-ui/core/CircularProgress';


function App() {
  const sendMessageIsOpen = useSelector(selectSendMessageIsOpen);
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const [userGoogle, loading] = useAuthState(auth);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        // the user is logged in
        dispatch(
          login({
            displayName: user.displayName,
            email: user.email,
            photoUrl: user.photoURL,
          })
        );
      }
    });
  }, []);

  if (loading) {
    return (
      <div className="appLoading">
        <div className="appLoadingContents">
          <img
            src="https://raw.githubusercontent.com/SedatCeyhan/LogoStorage/1e5fe42a8d6444a4aa8008e3c37c8eb686c6027b/email-final-logo.svg"
            alt=""
          />

          {/* <Spinner
            className="app__spinner"
            name="ball-spin-fade-loader"
            color="purple"
            fadeIn="none"
          /> */}
          <CircularProgress/>
        </div>
      </div>
    );
  }


  return (
    <Router>
      {!user ? (
        <Login />
      ) : (
        <div className="app">
          <Header />

          <div className="app__body">
            <Sidebar />
            <Switch>
              <Route path="/mail">
                <Mail />
              </Route>
              <Route path="/">
                <EmailList />
              </Route>
            </Switch>
          </div>

          {sendMessageIsOpen && <SendMail />}
        </div>
      )}
    </Router>
  );
}

export default App;
