import { USERNAME_CHANGED } from './types';
export const usernameChanged = (text) => {
    return ({
        type: USERNAME_CHANGED,
        payload: text
    })
}