// import { Children } from "react";
import { GoogleAuthProvider, createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import auth from "../Firebase/Firbase";
// import auth from "../Firebase/Firebase";

export const AuthContext = createContext(null);
const googleProvider = new GoogleAuthProvider();


const AuthProvider = ({children}) => {

    const [user,setUser] = useState(null);
    const [loading,setLoading] = useState(true)
    
// Sign up user
    const createUser = (email,password) =>{
        setLoading(true)
        return createUserWithEmailAndPassword( auth, email, password)
    }
// login user
const login = (email, password) => {
    setLoading(true);

    return signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential && userCredential.user;
            if (user) {
                console.log("Successfully signed in as:", user.displayName);
                setLoading(false);
                return user; // Return user object
            } else {
                setLoading(false);
                console.error("Error signing in: User information not available");
                throw new Error("User information not available");
            }
        })
        .catch((error) => {
            setLoading(false);
            console.error("Error signing in:", error.code, error.message);
            throw error; // Rethrow the error for further handling
        });
};






    const logOut=()=>{
    setLoading(true)
        return signOut(auth)
   }
// google 
   const googleSignIn = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      setUser(result.user);
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };


  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, currentUser => {
        console.log("current:", currentUser); //comment this
        setUser(currentUser);
        setLoading(false);
    });

    return () => unSubscribe();
}, []);
    


    const authInfo ={
        user,
        loading,
        createUser,
        login,
        logOut,
        googleSignIn,
        

    }

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;