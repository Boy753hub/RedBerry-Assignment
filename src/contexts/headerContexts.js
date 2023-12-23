import { createContext, useContext, useMemo } from "react";
import useSessionStorage from "../Hooks/useSessionStorage";

const HeaderContexts = createContext(null)

const HeaderContextProvider = ({children}) => {
    const [isUser = true, setUser] = useSessionStorage("user", false);
    
    
    const contextValue = useMemo(()=> ({
        isUser,
        setUser
    }), [isUser,setUser])
    
    return(
        <HeaderContexts.Provider value={contextValue}>
            {children}
        </HeaderContexts.Provider>
    )
}

export const useHeaderContext = () => {
    const contextValue = useContext(HeaderContexts)
    if(contextValue === null){
        throw new Error("useHeaderContext must be used within a HeaderContextProvider")
    }
    return contextValue
}

export default HeaderContextProvider