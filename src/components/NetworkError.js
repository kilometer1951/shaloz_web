import React, {useEffect} from "react";
import { useSelector, useDispatch } from "react-redux";
import * as actions from "actions";
import Alert from "@material-ui/lab/Alert";

const NetworkError = (props) => {
  const dispatch = useDispatch();

  useEffect(() => {
    setTimeout(() => {
        dispatch(actions.handleNetworkerror(false))
     }, 1000)
   
  }, []);
  return (
    <div className="network-error-container">
      <Alert variant="filled" severity="error">
        <p style={{textAlign:"center", fontFamily:"poppins_regular"}}> Snap network error!!</p>
      </Alert>
    </div>
  );
};

export default NetworkError;
