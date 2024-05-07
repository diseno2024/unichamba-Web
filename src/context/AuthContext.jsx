import {useContext, createContext, useState, useEffect} from 'react'
import { GoogleAuthProvider, signInWithRedirect, signOut, onAuthStateChanged } from "firebase/auth";
import { auth } from '../data/firebase'

const AuthContext = createContext();


export const AuthContextProvider = ({children}) => {

    const [user, setUser] = useState({}) // datos de la persona que se registro 
    

    const googleSingIn = () => { // inicio de sesion 
        const provider = new GoogleAuthProvider();
        signInWithRedirect(auth, provider);
    }

    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
                if(currentUser != null){
                    setUser(currentUser);
                }
    })

    useEffect(() => {
        unsubscribe();
    
        return () => {
            unsubscribe
    }
    }, [])
    


    return (
        <AuthContext.Provider value={{googleSingIn, user}}>
            {children}
        </AuthContext.Provider>
    )

}

// authentication del usuario 
export const UserAuth = () => {
    return useContext(AuthContext)
}
