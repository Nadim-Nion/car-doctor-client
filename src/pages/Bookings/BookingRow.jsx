import React from 'react';

const BookingRow = ({ booking }) => {

    const { img, title, price, first, email } = booking;

    return (
        <tr>
            <th>
                <label>
                    <input type="checkbox" className="checkbox" />
                </label>
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
                <button className="btn btn-warning btn-xs">Details</button>
            </th>
        </tr>
    );
};

export default BookingRow;