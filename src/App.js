import React, { useState, useEffect } from "react";
import { GoogleLogin, GoogleLogout } from "react-google-login";
import { gapi } from "gapi-script";

const clientId =
  "599342628827-0u1e45i4jqfj2qcfoshg24375k8mcros.apps.googleusercontent.com";

function App() {
  const [loading, setLoading] = useState("Loading...");
  const [user, setUser] = useState(null);

  const handleLoginSuccess = (response) => {
    console.log("Login Success ", response);
    setUser(response.profileObj);
    setLoading();
  };

  const handleLoginFailure = (error) => {
    console.log("Login Failure ", error);
    setLoading();
  };

  const handleLogoutSuccess = (response) => {
    console.log("Logout Success ", response);
    setUser(null);
  };

  const handleLogoutFailure = (error) => {
    console.log("Logout Failure ", error);
  };

  const handleRequest = () => {
    setLoading("Loading...");
  };

  const handleAutoLoadFinished = () => {
    setLoading();
  };

  const responseGoogle = (response) => {
    console.log(response);
  };

  const googleSuccess = async (res) => {
    console.log(res);
  };

  const googleFailure = (error) => {
    console.log(error);
    console.log("Google Sing In ha fracasado intentelo denuevo mas tarde");
  };

  useEffect(() => {
    function start() {
      gapi.client.init({
        clientId: clientId,
        scope: "email",
      });
    }

    gapi.load("client:auth2", start);
  }, []);

  return (
    <div>
      {user ? (
        <div>
          <div className="name">Welcome {user.name}!</div>
          <GoogleLogout
            clientId={clientId}
            onLogoutSuccess={handleLogoutSuccess}
            onFailure={handleLogoutFailure}
          />
          <pre>{JSON.stringify(user, null, 2)}</pre>
        </div>
      ) : (
        <GoogleLogin
          clientId={clientId}
          buttonText={loading}
          // onSuccess={googleSuccess}
          // onFailure={googleFailure}
          // onRequest={handleRequest}
          // onAutoLoadFinished={handleAutoLoadFinished}
          onSuccess={handleLoginSuccess}
          onFailure={handleLoginFailure}
          onRequest={handleRequest}
          onAutoLoadFinished={handleAutoLoadFinished}
          isSignedIn={true}
          cookiePolicy={"single_host_origin"}
        />
      )}
    </div>
  );
}

export default App;
