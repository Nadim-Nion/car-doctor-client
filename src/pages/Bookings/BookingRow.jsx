import React from 'react';

const BookingRow = ({ booking, bookings, setBookings }) => {

    const { _id, img, title, price, first, email, status } = booking;

    const handleDelete = id => {
        const proceed = confirm('Do you want to delete this booking order?');
        if (proceed) {
            fetch(`http://localhost:5000/bookings/${id}`, {
                method: 'DELETE'
            })
                .then(res => res.json())
                .then(data => {
                    console.log(data);

                    if (data.deletedCount > 0) {
                        alert('Your booking data has been deleted');
                    }

                    const remaining = bookings.filter(booking => booking._id !== id);
                    setBookings(remaining);
                })
        }
    }

    const handleBookingConfirm = id => {

        fetch(`http://localhost:5000/bookings/${id}`, {
            method: 'PATCH',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({ status: 'confirm' })

        })
            .then(res => res.json())
            .then(data => {
                console.log(data);

                if (data.modifiedCount > 0) {
                    alert('Your booking is confirmed successfully');

                    const remaining = bookings.filter(booking => booking._id !== id);
                    const updated = booking.find(booking._id === id);
                    updated.status = 'confirm';
                    const newBooking = [updated, ...remaining];
                    setBookings(newBooking);

                }
            })


    }

    return (
        <tr>
            <th>
                <button onClick={() => handleDelete(_id)} className="btn btn-sm btn-circle btn-outline">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
            </th>
            <td>
                <div className="flex items-center gap-3">
                    <div className="avatar">
                        <div className="rounded w-24 h-24">
                            <img src={img} alt="Avatar Tailwind CSS Component" />
                        </div>
                    </div>
                    <div>
                        <div className="font-bold">{title}</div>
                    </div>
                </div>
            </td>
            <td>
                {first}
            </td>
            <td>{email}</td>
            <td>${price}</td>
            <th>
                {
                    status === 'confirm' ?
                        <span className='text-orange-600 font-bold'>Confirmed</span>
                        :
                        <button onClick={() => handleBookingConfirm(_id)} className="btn btn-warning btn-xs">Confirm</button>
                }
            </th>
        </tr>
    );
};

export default BookingRow;