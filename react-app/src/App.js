import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
import LoginFormPage from "./components/LoginFormPage";
import { authenticate } from "./store/session";
import Navigation from "./components/Navigation";
import Boards from "./components/Boards"
import ProtectedRoute from "./components/auth/ProtectedRoute";
import MyProfile from "./components/MyProfile"
import PinsAll from "./components/PinsAll";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(authenticate()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route path="/login" >
            <LoginFormPage />
          </Route>
          <Route path="/signup">
            <SignupFormPage />
          </Route>
          <ProtectedRoute path='/myprofile'>
            <MyProfile />
          </ProtectedRoute>
          <ProtectedRoute path='/boards/:id'>
            <Boards />
          </ProtectedRoute>
          <Route path='/pins'>
            <PinsAll />
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
