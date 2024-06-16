import {useContext, createContext, useState, useEffect} from 'react'
import { GoogleAuthProvider, signOut, onAuthStateChanged, getAuth, signInWithRedirect } from "firebase/auth";

const AuthContext = createContext();


export const AuthContextProvider = ({children}) => {

    const [user, setUser] = useState("") // datos de la persona que se registro 
    

    const googleSingIn = async () => { // inicio de sesion 
        const provider = new GoogleAuthProvider();
        const auth = getAuth();
        return signInWithRedirect(auth, provider);
    }

    const googleSingOut = async () => {
        const auth = getAuth();
        const responseLogout = await signOut(auth);
        console.log(responseLogout);
    }

    // const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
    //             if(currentUser != null){
    //                 setUser(currentUser);
    //             }
    // })

    useEffect(() => {
        const auth = getAuth();
        const subscribe = onAuthStateChanged(auth, (currentUser) => {
            if(!currentUser){
                console.log("no hay usuario registrado");
                setUser("");
            }else{
                setUser(currentUser);
            }
    return () => {
        subscribe();
    }
})
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
