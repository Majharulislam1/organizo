import { createContext, useEffect, useState } from 'react';
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";
 
import PropTypes from 'prop-types';
import auth from './firebase.config';

export const AuthContext = createContext();
const Authentication = ({ children }) => {

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const provider = new GoogleAuthProvider();


    

    const handleRegister = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password)
    }

    const handleLogin = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    }

    const handleGoogle_Login = () => {
        setLoading(true);
        return signInWithPopup(auth, provider)
    }

    

    const handleLogOut = () => {
        setLoading(true);
        return signOut(auth);
    }

    useEffect(() => {

        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setLoading(false);
        });
        return () => unsubscribe();
    }, []);



    const value = {
        handleGoogle_Login,
     
        handleLogOut,
        handleLogin,
        handleRegister,
        user,
        loading
    }


    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

Authentication.propTypes = {
    children: PropTypes.node,
}

export default Authentication;