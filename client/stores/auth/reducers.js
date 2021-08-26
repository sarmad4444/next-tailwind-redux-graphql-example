import {RESTORE_AUTH_STATE, AUTHENTICATE, DEAUTHENTICATE} from "./constants";
// import {getCookie, setCookie, removeCookie} from '../../utils/cookie';

let initialState;

if (typeof localStorage !== "undefined") {
  // const authCookie = getCookie('auth');
  const token = localStorage.getItem('token')
  if (token) {
    // initialState = JSON.parse(JSON.stringify(decodeURIComponent(authCookie)));
    initialState = {
      isLoggedIn: true,
      token
    };
  } else {
    initialState = {
      isLoggedIn: false,
      token: null
    }
  }
} else {
  initialState = {
    isLoggedIn: false,
    token: null
  };
}


const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case DEAUTHENTICATE:
      // removeCookie("auth");
      localStorage.removeItem('token');
      return {
        isLoggedIn: false,
        token: null
      };

    case AUTHENTICATE:
      const authObj = {
        isLoggedIn: true,
        token: action.payload
      };
      // setCookie("auth", authObj);
      // console.log(authObj);
      localStorage.setItem('token', action.payload);
      return authObj;

    case RESTORE_AUTH_STATE:
      return {
        isLoggedIn: true,
        token: action.payload
      };

    default:
      return state;
  }
};

export default authReducer;