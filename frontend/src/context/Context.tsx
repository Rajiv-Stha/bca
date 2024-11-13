import React, { Dispatch, createContext, useReducer } from "react";

    type UserType ={
        username:string,
        email:string, 
        about:string
    }

interface ThriftState {
    user: UserType | null; // Assuming UserType is a type you've defined somewhere
    refresh:boolean;
  }
  

const initialState:ThriftState = {
    user: null,
    refresh:false,

}
type ThriftContextValue ={
    state: ThriftState;
    dispatch: Dispatch<any>; // Assuming ThriftAction is a type you've defined somewhere
  }


  export const ThriftContext = React.createContext<ThriftContextValue | undefined>(undefined);

const thriftReducer = (state=initialState,action:any)=>{

    switch (action.type) {
        case "addUser":
            return {...state, user:action.payload}

        case "removeUser":
                return {...state, user:null}

        case "setRefresh":
            return {...state,refresh:!state.refresh}

        default:
            return state
    }


}
type thriftContextProviderType = {
    children:React.ReactNode
}
export const ThriftContextProvider:React.FC<thriftContextProviderType> = ({children})=>{
    const [state, dispatch] = useReducer(thriftReducer, initialState)

    return(

        <ThriftContext.Provider value={{state:state,dispatch}}>{children}</ThriftContext.Provider>

    ) 
}