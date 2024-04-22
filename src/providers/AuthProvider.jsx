import React, { createContext, useEffect, useState } from 'react';
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
import app from '../firebase/firebase.config';
import axios from 'axios';

export const AuthContext = createContext(null);
const auth = getAuth(app);

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    }

    const signIn = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    }

    const logOut = () => {
        setLoading(true);
        return signOut(auth);
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, currentUser => {
            console.log('current user inside the auth state observer', currentUser);
            // const userEmail = currentUser?.email || user?.email;
            /* const userEmail = currentUser?.email;
            const loggedUser = { email: userEmail }; */
            const loggedUser = { email: currentUser?.email };
            setUser(currentUser);
            setLoading(false);

            // If current user exists, issue a token
            if (currentUser) {
                axios.post('https://car-doctor-server-eight-delta.vercel.app/jwt', loggedUser, { withCredentials: true })
                    .then(res => {
                        console.log('Token response', res.data);
                    })
            }
            else {
                // if user doesn't exist, clear the cookie from browser
                axios.post('https://car-doctor-server-eight-delta.vercel.app/logout', loggedUser, { withCredentials: true })
                    .then(res => {
                        console.log(res.data);
                    })
            }
        })

        return () => {
            return unsubscribe();
        }
    }, [])

    const authInfo = {
        auth,
        user,
        loading,
        createUser,
        signIn,
        logOut
    }

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;