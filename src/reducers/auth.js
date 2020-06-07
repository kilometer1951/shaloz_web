import {
 
    USER_INFO,
  } from "../actions/types";
  
  const INITIAL_STATE = {
      user: {},
  
  };
  
  export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
      case USER_INFO:
        return {
          ...state,
          user: action.payload,
        };
     
      default:
        return state;
    }
  };
  