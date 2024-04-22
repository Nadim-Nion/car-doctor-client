import React, { useEffect, useState } from 'react';
// import { AuthContext } from '../../providers/AuthProvider';
import BookingRow from './BookingRow';
import useAuth from '../../hooks/useAuth';
import useAxiosSecure from '../../hooks/useAxiosSecure';
// import axios from 'axios';

const Bookings = () => {
    // const { user } = useContext(AuthContext);
    const { user } = useAuth();
    const [bookings, setBookings] = useState([]);
    const axiosSecure = useAxiosSecure();

    // const url = `https://car-doctor-server-eight-delta.vercel.app/bookings?email=${user?.email}`;
    // const url = `https://car-doctor-server-eight-delta.vercel.app/bookings?email=${user?.email}`;
    const url = `/bookings?email=${user?.email}`;

    useEffect(() => {
        /* axios.get(url, { withCredentials: true })
            .then(res => {
                setBookings(res.data);
            }) */

        /* fetch(url, { credentials: 'include' })
            .then(res => res.json())
            .then(data => {
                setBookings(data);
            }) */

        axiosSecure.get(url)
            .then(res => {
                setBookings(res.data);
            })

    }, [url, axiosSecure]);

    return (
        <div>
            <h2 className="text-5xl text-center font-semibold my-3">Your Bookings: {bookings.length}</h2>
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>
                                <label>
                                    <input type="checkbox" className="checkbox" />
                                </label>
                            </th>
                            <th>Service Name</th>
                            <th>Customer Name</th>
                            <th>Email</th>
                            <th>Price</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            bookings?.map(booking => <BookingRow
                                key={booking._id}
                                booking={booking}
                                bookings={bookings}
                                setBookings={setBookings}
                            ></BookingRow>)
                        }

                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Bookings;