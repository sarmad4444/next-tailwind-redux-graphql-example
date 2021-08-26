import {RESTORE_AUTH_STATE, AUTHENTICATE, DEAUTHENTICATE} from "./constants";

export const authenticateAction = (user) => {
  return {
    type: AUTHENTICATE,
    payload: user
  };
};


export const deAuthenticateAction = () => {
  return {
    type: DEAUTHENTICATE,
  };
};

// No need for this now, but can be use later
export const restoreState = (authState) => {
  return {
    type: RESTORE_AUTH_STATE,
    payload: authState
  }
};


export const login = (loginDetails) => {
  return async dispatch => {
    try{
      dispatch(deAuthenticateAction());
      // login code. And storing data in result variable
      dispatch(authenticateAction(loginDetails));

    }catch (e) {
      dispatch(deAuthenticateAction());
    }
  };
};


export const logout = () => {
  return async dispatch => {
    dispatch(deAuthenticateAction())
  }
};


export const restore = (savedState) => {
  return dispatch => {
    dispatch(restoreState(savedState));
  };
};


