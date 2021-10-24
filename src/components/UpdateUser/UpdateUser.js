import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const UpdateUser = () => {
    const [user, setUser] = useState({});
    const { id } = useParams();

    useEffect(() => {
        const url = `http://localhost:5000/users/${id}`;
        fetch(url)
            .then(response => response.json())
            .then(jsonData => setUser(jsonData))
    }, [id])

    // update user
    const handleNameChange = e => {
        const updatedName = e.target.value;
        const updatedUser = { name: updatedName, email: user.email };
        setUser(updatedUser);
    }
    const handleEmailChange = e => {
        const updatedEmail = e.target.value;
        const updatedUser = { ...user };
        updatedUser.email = updatedEmail;
        setUser(updatedUser);
    }
    const handleUpdateUser = e => {
        const url = `http://localhost:5000/users/${id}`;
        fetch(url, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(user)
        })
            .then(response => response.json())
            .then(jsonData => {
                if (jsonData.modifiedCount) {
                    alert("User information updated successfully.");
                    setUser({});
                }
            })

        e.preventDefault();
    }
    return (
        <div>
            <h2 className="my-4">Update Informations of {user.name}</h2>
            <h6>ID: {id}</h6>

            <form onSubmit={handleUpdateUser}>
                <input type="text" value={user.name || ""} onChange={handleNameChange} placeholder="Name" /> <br /> <br />
                <input type="email" value={user.email || ""} onChange={handleEmailChange} placeholder="Email" /> <br /> <br />
                <input type="submit" value="Update" />
            </form>
        </div>
    );
};

export default UpdateUser;