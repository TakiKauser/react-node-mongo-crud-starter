import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Users = () => {
    const [users, setUsers] = useState([]);

    // const url = `http://localhost:5000/users`;
    useEffect(() => {
        fetch(`http://localhost:5000/users`)
            .then(response => response.json())
            .then(jsonData => setUsers(jsonData))
    }, [])

    // DELETE an user
    const handleDeleteUser = id => {
        const confirmation = window.confirm("Are you sure???");
        if (confirmation) {
            const url = `http://localhost:5000/users/${id}`;
            fetch(url, {
                method: "DELETE"
            })
                .then(response => response.json())
                .then(jsonData => {
                    if (jsonData.deletedCount) {
                        alert("Deleted Succsessfully.");
                        const remainingUsers = users.filter(user => user._id !== id)
                        setUsers(remainingUsers);
                    }
                })
        }
    }
    return (
        <div>
            <h2 className="my-4">User List of {users.length} users</h2>
            <div className="d-flex justify-content-center align-items-center">
                <div className="row">
                    {users?.map((user) => (
                        <div key={user._id} className="col-md-4">
                            <div className="user border rounded p-2 m-2 bg-secondary text-white">
                                <h3>{user.name}</h3>
                                <h6>{user.email}</h6>
                                <button onClick={() => handleDeleteUser(user._id)} className="btn btn-danger p-1 m-2">Delete</button>
                                <Link to={`/users/update/${user._id}`}>
                                    <button className="btn btn-warning p-1 m-2">Update</button>
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Users;