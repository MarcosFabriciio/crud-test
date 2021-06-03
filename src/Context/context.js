import { createContext, useState } from "react";

const CrudContext = createContext({});

export const CrudProvider = ({children}) => {
    const [activateCliente, setActivateCliente] = useState(false);

    function activate(){
        if(activateCliente){
            return setActivateCliente(false);
        }
    
        setActivateCliente(true);
    }

    return(
        <CrudContext.Provider value={{ activate, activateCliente }}>
            {children}
        </CrudContext.Provider>
    );
} 

export default CrudContext;