import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
import LoginFormPage from "./components/LoginFormPage";
import { authenticate } from "./store/session";
import Navigation from "./components/Navigation";
import Board from "./components/Board"
import ProtectedRoute from "./components/auth/ProtectedRoute";
import MyProfile from "./components/MyProfile"
import PinsAll from "./components/PinsAll";
import PinDetails from "./components/PinDetails";
import CreatePinForm from "./components/CreatePin";
import MyPins from "./components/MyPins";
import EditPin from "./components/EditPin";
import FilterPins from "./components/FilteredPins";
import { get_all_boards } from "./store/board";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(authenticate()).then(() => setIsLoaded(true));
    dispatch(get_all_boards())
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route exact path='/'>
            <PinsAll />
          </Route>

          <Route path='/filtered'>
            <FilterPins />
          </Route>

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
            <Board />
          </ProtectedRoute>
          <Route path='/pins/:pinId' >
            <PinDetails />
          </Route>
          <ProtectedRoute exact path={'/pin-builder'}>
            <CreatePinForm />
          </ProtectedRoute>

          <ProtectedRoute exact path={'/created-pins'}>
            <MyPins />
          </ProtectedRoute>

            <ProtectedRoute exact path={'/edit-pin/:pinId'}>
              <EditPin />
            </ProtectedRoute>
        </Switch>
      )}
    </>
  );
}

export default App;
