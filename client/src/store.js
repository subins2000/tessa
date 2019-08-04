import { createStore } from 'redux';

const initialUser = localStorage.getItem('userState') ? JSON.parse(localStorage.getItem('userState')) : {
    account: null
};

export const USER_SET_INFO = {type: 'USER_SET_INFO'};
export const USER_SET_BOOKS = {type: 'USER_SET_BOOKS'};
export const USER_LOG_OUT = {type: 'USER_LOG_OUT'};

function userReducer(state = initialUser, action) {
    switch(action.type) {
        case 'USER_SET_INFO':
            localStorage.setItem('account', action.account);
            return {
                ...state,
                account: action.account,
                name: action.name,
                books: []
            };

        case 'USER_SET_BOOKS':
            return {
                ...state,
                books: action.books,
            };

        case 'USER_LOG_OUT':
            localStorage.removeItem('userState');

            return {
                ...state,
                account: null,
                books: []
            };

        default:
            return state;
    }
}

export const userStore = createStore(userReducer, initialUser);

export function isLoggedIn() {
    return sessionStorage.getItem('selectedAddress') !== null;
}

export default userStore;
