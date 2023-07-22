import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { auth } from "../config/firebase";
import useAuth from "../composables/useAuth";
import LoginPage from "../pages/LoginPage";
import HomePage from "../pages/HomePage";
import RoomPage from "../pages/RoomPage";
import GuardedRoute from "../components/GuardedRoute";
import LoadingComponent from "../components/LoadingComponent";

function RouterPage() {
  const { userInfo } = useAuth();
  const [loading, setLoading] = useState(true);
  const isAuthenticated = !!userInfo;

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(() => {
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <>
        <LoadingComponent />
      </>
    );
  }

  return (
    <div className="App">
      <Routes>
        <Route
          element={
            <GuardedRoute
              isRouteAccessible={!isAuthenticated}
              redirectRoute="/home"
            />
          }
        >
          <Route path="/login" element={<LoginPage />} />
        </Route>

        <Route
          element={
            <GuardedRoute
              isRouteAccessible={isAuthenticated}
              redirectRoute="/login"
            />
          }
        >
          <Route path="/home" element={<HomePage />} />
        </Route>

        <Route
          element={
            <GuardedRoute
              isRouteAccessible={isAuthenticated}
              redirectRoute="/login"
            />
          }
        >
          <Route path="/room/:roomID" element={<RoomPage />} />
        </Route>
      </Routes>
    </div>
  );
}

export default RouterPage;
