import React from 'react';
import { Link } from 'react-router';
import Swal from 'sweetalert2';

const CoffeeCard = ({coffee}) => {
    const {_id, photo, name, price, chef} = coffee;

    const handleDelete = (id) =>{
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
            }).then((result) => {
            if (result.isConfirmed) {

                // start deleting the coffee
                fetch(`http://localhost:3000/coffees/${id}`, {
                    method: 'DELETE'
                })
                .then(res => res.json())
                .then(data =>{
                    if(data.deletedCount){
                        Swal.fire({
                            title: "Deleted!",
                            text: "Your Coffee has been deleted.",
                            icon: "success"
                        });
                    }
                })
            }
        });

    }

    return (
        <div className="card card-side bg-base-100 border">
            <figure>
                <img
                src={photo} className='w-[280px]'
                alt="Movie" />
            </figure>
            <div className="flex justify-around w-full mt-8">
                <div className="mt-3 space-y-1">
                    <h2 className="card-title">{name}</h2>
                    <p>Price: {price}</p>
                    <p>Chef: {chef}</p>
                </div>
                <div className="card-actions justify-end">
                    <div className="grid grid-cols-1 gap-2">
                        <button className="btn join-item">View</button>
                        <Link to={'/update'} className='btn join-item'>
                            Edit
                        </Link>
                        <button onClick={()=> handleDelete(_id)} className="btn join-item">X</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CoffeeCard;