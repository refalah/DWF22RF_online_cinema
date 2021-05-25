import {createContext, useReducer} from 'react'

export const Context = createContext();

const initialState = {
    isLogin: false,
    user: null,
    isVisibleLogin: false,
    isVisibleRegister: false
}

const reducer = (state, action) => {
    const { type, payload } = action

    switch (type) {
        case "OPENLOGIN":
            return {
                ...state,
                isVisibleLogin: true
            };
        case "CLOSELOGIN":
            return {
                ...state,
                isVisibleLogin: false
            };
        case "OPENREGISTER":
            return {
                ...state,
                isVisibleRegister: true
            };
        case "CLOSEREGISTER":
            return {
                ...state,
                isVisibleRegister: false
            };
        case "USER_SUCCESS":
        case "LOGIN_SUCCESS":
            localStorage.setItem("token", payload.token);
            return {
                ...state,
                isLogin: true,
                user: payload
            };
        case "AUTH_ERROR":
        case "LOGOUT":
            localStorage.removeItem("token");
            return {
                ...state,
                isLogin: false,
                user: null
            };

        
        case "REGISTER_SUCCESS":
           
            return {
                ...state,
                isLogin: false,
                user: payload
            };
        
        default:
            throw new Error();
    }
}

export const ContextProvider = ({children}) => {
    // const isLogin = false;
    // const titleContext = 'Context Incoming'

    const [ state, dispatch ] = useReducer(reducer, initialState)
    return (
        <Context.Provider value={[ state, dispatch ]}>
            {children}
        </Context.Provider>
    )
}
