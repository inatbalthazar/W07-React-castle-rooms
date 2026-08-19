import { Children } from "react";
import { MessageContext } from "./MessgeContext";
export const MessageProvider = ({children}) => {
    return  <MessageContext.Provider value={{}}>
                {Children}
            </MessageContext.Provider>
    
};