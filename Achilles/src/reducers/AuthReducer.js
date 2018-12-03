import {
    USERNAME_CHANGED,
    PASSWORD_CHANGED,
    LOGIN_USER_SUCCESS,
    LOGIN_USER_FAILED,
    LOGIN_USER,
    NAME_CHANGED,
    EMAIL_CHANGED,
    SIGNUP_USER,
    SIGNUP_SUCCESS,
    SIGNUP_FAILED
} from '../actions/types';

const INITIAL_STATE = {
    username: '',
    password: '',
    user: '',
    login_error: '',
    loading: false,
    name: '',
    email: '',
    signup_error: '',
}
export default (state = INITIAL_STATE, action) => {
    console.log(action);
    switch (action.type) {
        case USERNAME_CHANGED:
            return { ...state, username: action.payload }
        case PASSWORD_CHANGED:
            return { ...state, password: action.payload }
        case LOGIN_USER:
            console.log('Processing user login')
            return { ...state, login_error: '', loading: true }
        case LOGIN_USER_SUCCESS:
            console.log('User logged in successfully')
            return { ...state, user: action.payload, loading: false }
        case LOGIN_USER_FAILED:
            console.log("Setting error text")
            return { ...state, login_error: 'Authentication Failed.', password: '', loading: false }
        case NAME_CHANGED:
            console.log("Updating name")
            return { ...state, name: action.payload }
        case EMAIL_CHANGED:
            return { ...state, email: action.payload }
        case SIGNUP_USER:
            console.log('Sign up in progress')
            return { ...state, signup_error: '', loading: true }
        case SIGNUP_SUCCESS:
            console.log('User signed up successfully')
            return { ...state, user: action.payload, loading: false }
        case SIGNUP_FAILED:
            console.log("Setting error text: " + action.payload)
            return { ...state, signup_error: action.payload, password: '', loading: false }
        default:
            return state;
    }
}