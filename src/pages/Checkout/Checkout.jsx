import React, { useContext } from 'react';
import { useLoaderData } from 'react-router-dom';
import { AuthContext } from '../../providers/AuthProvider';

const Checkout = () => {
    const loadedService = useLoaderData();
    // console.log(loadedService);
    const { _id, title, price, img } = loadedService;
    const { user } = useContext(AuthContext);

    const handleBookOrder = event => {
        event.preventDefault();

        const form = event.target;
        const first = form.first.value;
        const last = form.last.value;
        const phone = form.phone.value;
        const email = user?.email;
        const message = form.message.value;

        // console.log(first, last, phone, email, message);

        const order = { first, last, phone, email, message, _id, title, price, img };
        // console.log(order);

        fetch('https://car-doctor-server-eight-delta.vercel.app/bookings', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(order)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);

                if (data.insertedId) {
                    alert("Your order has been added");
                }
            })
    }

    return (
        <div>
            <h2 className='text-center text-3xl font-semibold'>Book our services: {title}</h2>
            <form onSubmit={handleBookOrder} className="card-body">
                <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">First Name</span>
                        </label>
                        <input type="text" name="first" placeholder="First Name" className="input input-bordered" required />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Last Name</span>
                        </label>
                        <input type="text" name='last' placeholder="Last Name" className="input input-bordered" required />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Your Phone</span>
                        </label>
                        <input type="text" name="phone" placeholder="Your Phone" className="input input-bordered" required />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Email</span>
                        </label>
                        <input type="email" name='email' defaultValue={user?.email} placeholder="email" className="input input-bordered" required />
                    </div>
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Your Message</span>
                    </label>
                    <textarea className="textarea w-full" name='message' placeholder='Your Message' cols="5" rows="5"></textarea>
                </div>
                <div className="form-control mt-6">
                    <input className="btn btn-warning btn-block" type="submit" value="Order Confirm" />
                </div>
            </form>
        </div>
    );
};

export default Checkout;