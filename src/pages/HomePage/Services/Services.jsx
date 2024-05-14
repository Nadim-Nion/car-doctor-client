import React, { useEffect, useState } from 'react';
import ServiceCard from './ServiceCard/ServiceCard';
import { axiosSecure } from '../../../hooks/useAxiosSecure';

const Services = () => {
    const [services, setServices] = useState([]);
    const [asc, setAsc] = useState(true);
    const [searchText, setSearchText] = useState('');

    useEffect(() => {
        /* fetch('https://car-doctor-server-eight-delta.vercel.app/services')
            .then(res => res.json())
            .then(data => setServices(data)) */

        axiosSecure(`/services?sort=${asc ? 'asc' : 'desc'}&search=${searchText}`)
            .then(res => setServices(res.data))
    }, [asc, searchText]);

    const handleSearch = event => {
        event.preventDefault();

        const form = event.target;
        const search = form.search.value;
        // console.log(search);
        setSearchText(search);
    }

    return (
        <div className='mt-4'>
            <div className='text-center'>
                <h3 className='text-2xl font-bold text-yellow-600'>Service</h3>
                <h2 className="text-5xl">Our Service Area</h2>
                <p>the majority have suffered alteration in some form, by injected humour, or random <br /> words which do not look even slightly believable. </p>
                <form onSubmit={handleSearch} className='mt-2'>
                    <input className='mr-2 p-1' type="text" name="search" id="" placeholder='Type to search' />
                    <input type="submit" value="Search" className='btn btn-primary' />
                </form>
                <button
                    className="btn btn-primary my-2"
                    onClick={() => setAsc(!asc)}
                >
                    {asc ? 'Price: High to Low' : 'Price: Low to High'}
                </button>
            </div>
            <div className='grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-6'>
                {
                    services.map(service => <ServiceCard
                        key={service._id}
                        service={service}
                    ></ServiceCard>)
                }
            </div>
        </div>
    );
};

export default Services;