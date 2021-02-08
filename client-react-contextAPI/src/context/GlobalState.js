import React, { createContext, useReducer } from 'react';
import AppReducer from './AppReducer'

const initialState = {
    users: [
        // { id: 1, first_name: 'Ishan', last_name: 'Manandhar', image: 'Kathmandu', gender: 'M', email: 'ishan@gmail.com', phone: '9988776655' },
        // { id: 2, first_name: 'Ishan', last_name: 'Manandhar', image: 'Kathmandu', gender: 'M', email: 'ishan@gmail.com', phone: '9988776655' },
        // { id: 3, first_name: 'Ishan', last_name: 'Manandhar', image: 'Kathmandu', gender: 'M', email: 'ishan@gmail.com', phone: '9988776655' },
        // { id: 4, first_name: 'Ishan', last_name: 'Manandhar', image: 'Kathmandu', gender: 'M', email: 'ishan@gmail.com', phone: '9988776655' },
        // { id: 5, first_name: 'Ishan', last_name: 'Manandhar', image: 'Kathmandu', gender: 'M', email: 'ishan@gmail.com', phone: '9988776655' }
    ]
}

export const GlobalContext = createContext(initialState);
export const GlobalProvider = ({ children }) => {
    const [state, dispatch] = useReducer(AppReducer, initialState);

    function removeUser(id) {
        dispatch({
            type: 'REMOVE_USER',
            payload: id
        });
    };

    function addUser(users) {
        dispatch({
            type: 'ADD_USERS',
            payload: users
        });
    };

    function editUser(users) {
        dispatch({
            type: 'EDIT_USER',
            payload: users
        });
    };
    function getUser(users) {
        dispatch({
            type: 'GET_USER',
            payload: users
        });
    };

    return (<GlobalContext.Provider value={{
        users: state.users,
        removeUser,
        addUser,
        editUser,
        getUser
    }}>
        {children}
    </GlobalContext.Provider>);
}