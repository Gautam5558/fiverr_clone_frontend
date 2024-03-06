import { useReducer } from "react";
import { createContext } from "react";





const INITIAL_STATE = {
    user: JSON.parse(localStorage.getItem("user")),
    loading: false,
    error: null
}


export const AuthContext = createContext(INITIAL_STATE)

const authReducer = (state, action) => {
    switch (action.type) {
        case "LOGIN_START":
            return {
                user: null,
                loading: true,
                error: null
            }
            break;
        case "LOGIN_SUCCESS":
            localStorage.setItem("user", JSON.stringify(action.payload))
            return {
                user: action.payload,
                loading: false,
                error: null
            }

            break;
        case "LOGIN_FAILURE":
            return {
                user: null,
                loading: false,
                error: action.payload
            }
            break;
        case "LOGOUT":
            localStorage.clear()
            return {
                user: null,
                loading: false,
                error: null
            }
            break;
        default:
            return state
    }
}

export const AuthProvider = ({ children }) => {

    const [state, dispatch] = useReducer(authReducer, INITIAL_STATE)

    return (
        <AuthContext.Provider value={{ user: state.user, loading: state.loading, error: state.error, dispatch }}>
            {children}
        </AuthContext.Provider>
    )
}

