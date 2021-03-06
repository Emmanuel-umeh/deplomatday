import axios from "axios"
import {returnErrors} from "./errorActions"
import browserHistory from 'react-router'


import {
    USER_LOADING,
    USER_LOADED,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    REGISTER_SUCCESS, 
    REGISTER_FAIL,
    GET_USERS,
    LOGIN_FAIL,
    LOGOUT_SUCCESS, 
    GET_ERRORS,
    CLEAR_TYPE
} from "./types"

import AWN from "awesome-notifications"

// https://elesarrdevelopment.herokuapp.com/api/signupuser/all

let notifier = new AWN
var location = window.location.href
// if(location.slice(0,17)== 'http://localhost:' || "https://elesarr.he" || "http://elesarr.her"){
//   axios.defaults.baseURL = 'https://elesarrdevelopment.herokuapp.com';
//   // axios.defaults.baseURL = 'http://localhost:5200';
// }
// else if(location.slice(0,17)==  "http://127.0.0.1:"){
//   axios.defaults.baseURL = 'https://elesarrdevelopment.herokuapp.com';
// }
// else{
  axios.defaults.baseURL = 'http://localhost:5200'
// }
// 

export const loadUser = () => (dispatch, getState) => {
  console.log("url ",   axios.defaults.baseURL)
    // console.log("getting user")
    // dispatch({type:USER_LOADING}) // dispatch user loading

    // user loading
    dispatch({type:USER_LOADING}) // dispatch user loading

    // console.log("token config ", tokenConfig(getState))
    try {

      axios
      .get(`/api/signupuser/oneUser`, tokenConfig(getState))
      .then( res=>  

        {
          if(res.data.message === "error"){
            localStorage.removeItem("token")
           return dispatch({
              type:AUTH_ERROR
          })
          }
          // console.log("user data ", res)
           dispatch({
               type:USER_LOADED,
               payload:res.data
           })
          //  console
          })
      .catch(err => {
          dispatch({
              type:AUTH_ERROR
          })
          // console.log("Eroor" , err.response.data)
          console.clear()
        
      })
    } catch(e){
      if(e){
        console.clear()
      }
    }
}


// export const register = 

export const login = ({email, password}) => dispatch => {
    // console.log("data received ", email, password)
    const config ={
        headers:{
            'Content-Type':'application/json'
        }
    };


    // REQUEST BODY
    const body = JSON.stringify({email, password})
    axios
        .post(`/api/login`, body, config)
        .then(res =>{
          dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data
          })

          // console.log("login res ", res)
    
        }
          // console.log("this is the res ", res)
        )
                .catch(err => {
                    dispatch(
                        returnErrors(err.response.data, err.response.status, "LOGIN_FAIL")
                    )
                    dispatch({
                        type:LOGIN_FAIL
                    })

                    dispatch({
                      type:CLEAR_TYPE
                  })

                  notifier.warning("Login Failed")
                })
}

export const clearType = () => dispatch => {
  dispatch({
    type:CLEAR_TYPE
})
}



// logout 
export const logout = () => {
    // localStorage.removeItem('referral')
    return{
        type:LOGOUT_SUCCESS
    }
}



// Register User
export const register = ({
    username, 
    email, password, confirmPassword}, history) => dispatch => {
  // Headers
  const config = {
      headers: {
    // 'Accept': 'application/json',
    'Content-Type': 'application/json'
  },
  };

  // console.log(config)

  // Request body
  const body = JSON.stringify({username, email, password, confirmPassword});
  // console.log("registering individual")
    // console.log("consoling the body from register action ",body)
    axios.post('/api/signupuser', body, config)
    .then(res =>{
        dispatch({
          type: REGISTER_SUCCESS,
          payload: res.data
        })
        // history.push('/dashboard')
        window.location.href="/dashboard"

    }
    )
    .catch(err => {

      notifier.warning("Registration failed")
      dispatch(
        returnErrors(err.response.data, err.response.status, 'REGISTER_FAIL')
      );
      // console.log(err)
      dispatch({
        type: REGISTER_FAIL
      });
    });
};



// Setup config/headers and token

export const tokenConfig =  getState => {
    // Get token from localstorage
    const token = getState().auth.token;
  
    // Headers
    const config = {
      headers: {
        'Content-type': 'application/json'
      }
    };
  
    // If token, add to headers
    if (token) {
      config.headers['x-auth-token'] = token;
      // console.log("token ", token)
    }
  
    return config;
  };
  
  