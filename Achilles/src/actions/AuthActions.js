import { USERNAME_CHANGED, PASSWORD_CHANGED, LOGIN_USER_SUCCESS, LOGIN_USER_FAILED, LOGIN_USER, NAME_CHANGED, EMAIL_CHANGED, SIGNUP_USER, SIGNUP_SUCCESS, SIGNUP_FAILED } from './types';
import NavigationService from '../NavigationService';
export const usernameChanged = (text) => {
    return ({
        type: USERNAME_CHANGED,
        payload: text
    })
}
export const passwordChanged = (text) => {
    return ({
        type: PASSWORD_CHANGED,
        payload: text
    })
}

export const emailChanged = (text) => {
    return ({
        type: EMAIL_CHANGED,
        payload: text
    })
}
export const nameChanged = (text) => {
    return ({
        type: NAME_CHANGED,
        payload: text
    })
}

export const loginUser = ({ username, password }) => {
    // Authenticate user with API
    console.log("Called loginUser action creator")
    return ((dispatch) => {
        dispatch({ type: LOGIN_USER });
        fetch('http://ec2-54-201-123-10.us-west-2.compute.amazonaws.com:5000/get_user_info', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                userid: username,
                password: password,
            }),
        })
            .then((response) => response.json())
            .then(data => {
                if (data.error) {
                    console.log("Login Error: " + data.error);
                    // Set error text to true
                    dispatch({ type: LOGIN_USER_FAILED })
                }
                else {
                    dispatch({ type: LOGIN_USER_SUCCESS, payload: data })
                    // Routing to Dashboard
                    NavigationService.navigate('Main', {});

                }
            })
            .catch(error => console.log(error))
    });

}

export const registerUser = ({ name, email, username, password }) => {
    return ((dispatch) => {
        dispatch({ type: SIGNUP_USER });
        fetch('http://ec2-54-201-123-10.us-west-2.compute.amazonaws.com:5000/is_uid_available?userid=' + username)
            .then(response => response.json())
            .then(data => {
                if (data.avl) {
                    fetch('http://ec2-54-201-123-10.us-west-2.compute.amazonaws.com:5000/login_info', {
                        method: 'POST',
                        headers: {
                            Accept: 'application/json',
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            userid: username,
                            name: name,
                            email: email,
                            password: password
                        }),
                    })
                        .then(() => {//Call questionnaire screeen 
                            dispatch({ type: SIGNUP_SUCCESS })
                        })
                        .catch((error) => dispatch({ type: SIGNUP_FAILED, payload: 'Unable to register user.' }))
                }
                else {
                    //Call error set logic
                    dispatch({ type: SIGNUP_FAILED, payload: 'Username already in use.' })
                }
            })
    }

    )
}