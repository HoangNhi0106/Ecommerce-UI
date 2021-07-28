import React from 'react';
import ConfirmReducer, { initialState } from './Reducer';

export const ConfirmContext = React.createContext();

const ConfirmProvider = ({children}) => {
    const [state, dispatch] = React.useReducer(ConfirmReducer, initialState);
    
    const value = {state, dispatch};
    return <ConfirmContext.Provider value={value}>
        {children}
    </ConfirmContext.Provider>
}

export default ConfirmProvider;