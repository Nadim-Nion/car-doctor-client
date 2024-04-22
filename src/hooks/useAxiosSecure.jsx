import axios from 'axios';
import React, { useEffect } from 'react';
import useAuth from './useAuth';
import { useNavigate } from 'react-router-dom';

// axios instance
const axiosSecure = axios.create({
    baseURL: 'http://localhost:5000',
    withCredentials: true
});

const useAxiosSecure = () => {
    const { logOut } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        axiosSecure.interceptors.response.use(res => {
            return res;
        }),
            error => {
                console.log('error tracked in the interceptors:', error.response);

                if (error.response.status === 401 || error.response.status === 403) {
                    console.log('Logging out the user');
                    logOut()
                        .then(() => {
                            navigate('/login');
                        })
                        .catch((error) => {
                            console.log(error.message);
                        })
                }
            }
    }, [logOut, navigate]);
    return axiosSecure;
};

export default useAxiosSecure;