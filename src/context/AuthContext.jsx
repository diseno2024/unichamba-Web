import {useContext, createContext, useState, useEffect} from 'react'
import { GoogleAuthProvider, signInWithRedirect, signOut, onAuthStateChanged, signInWithPopup } from "firebase/auth";
import { auth } from '../data/firebase'

const AuthContext = createContext();


export const AuthContextProvider = ({children}) => {

    const [user, setUser] = useState("") // datos de la persona que se registro 
    

    const googleSingIn = () => { // inicio de sesion 
        const provider = new GoogleAuthProvider();
        signInWithPopup(auth, provider);
    }

    const googleSingOut = () => {
        console.log('cierre de sesion')
        signOut(auth);
    }

    

    useEffect(() => {
        const suscribed = onAuthStateChanged( auth, (currentUser) => {
            if(!currentUser){
                console.log("no hay usuario suscrito")
                setUser("")
            }else{
                setUser(currentUser)
            }
            
            
        })
    
        return  () => suscribed();
    }, [])
    


    return (
        <AuthContext.Provider value={{googleSingIn, user, googleSingOut}}>
            {children}
        </AuthContext.Provider>
    )

}

// authentication del usuario 
export const UserAuth = () => {
    return useContext(AuthContext)
}