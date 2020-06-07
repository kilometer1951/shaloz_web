import React, { useState } from "react";
import { TextField } from "@material-ui/core";
import { CircularProgress } from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";
import jwtDecode from "jwt-decode";
import * as actions from "actions";

const Login = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [isLoading, setLoading] = useState(false);
  const [loginError, setLoginError] = useState("");

  const validateEmail = (email) => {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  };

  const signin = async (e) => {
    try {
      e.preventDefault();

      if (email === "") {
        setEmailError("Please enter your email");
        return;
      } else if (!validateEmail(email)) {
        setEmailError("Email not valid");
        return;
      } else {
        setEmailError("");
      }

      if (password === "") {
        setPasswordError("Please create a password");
        return;
      } else {
        setPasswordError("");
      }

      setLoading(true);
      await actions.loginUser(email, password, async (resData) => {
        if (!resData.status) {
          setLoginError("User not found");
          return;
        }
        //user found save to local storage and dispatch user
        //store
        localStorage.setItem("token", resData.token);
        //dispatch
        window.location.reload();
        //let decode_token = jwtDecode(resData.token)
        // await dispatch(actions.dispatchUser(resData.user))
      });
      setLoading(false);
    } catch (e) {
      setLoading(false);
      dispatch(actions.handleNetworkerror(true))
    }
  };

  return (
    <form autoComplete="off" noValidate style={{ marginTop: 40 }}>
      {loginError && (
        <div>
          <p
            style={{
              fontFamily: "poppins_regular",
              marginBottom: 10,
              color: "red",
            }}>
            Error: email or password not valid
          </p>
        </div>
      )}

      <div>
        <TextField
          error={emailError ? true : false}
          label="Email address"
          variant="outlined"
          style={{ width: "100%" }}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          helperText={emailError}
          autoComplete="email"
        />
      </div>
      <div style={{ marginTop: 30 }}>
        <TextField
          error={passwordError ? true : false}
          label="Password"
          variant="outlined"
          type="password"
          style={{ width: "100%" }}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          helperText={passwordError}
          autoComplete="new-password"
        />
      </div>
      <div style={{ marginTop: 10 }}>
        <p
          style={{
            marginRight: 15,
            cursor: "pointer",
            textDecoration: "underline",
            fontFamily: "poppins_extra_light",
            fontSize: 13,
          }}>
          Forgot your password?
        </p>
      </div>
      <div>
        <button
          onClick={signin}
          className="auth-button"
          style={{ opacity: isLoading ? 0.7 : 1 }}
          disabled={isLoading ? true : false}>
          {isLoading && (
            <div>
              <CircularProgress color="inherit" thickness={3} size={30} />
            </div>
          )}
          Sign in
        </button>
      </div>
    </form>
  );
};

export default Login;
