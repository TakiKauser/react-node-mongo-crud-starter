import React, { useRef } from 'react';

const AddUser = () => {

    const nameRef = useRef();
    const emailRef = useRef();

    const handleAddUser = e => {
        const name = nameRef.current.value;
        const email = emailRef.current.value;
        const newUser = { name, email };
        console.log(newUser);

        const url = `http://localhost:5000/users`;
        fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newUser)
        })
            .then(response => response.json())
            .then(jsonData => {
                if (jsonData.insertedId) {
                    alert("User Added Successfully!");
                    e.target.reset();
                }
            })

        e.preventDefault();
    }
    return (
        <div>
            <h2>Add an User</h2>

            <form onSubmit={handleAddUser}>
                <input type="text" ref={nameRef} placeholder="Name" /> <br /> <br />
                <input type="email" ref={emailRef} placeholder="Email" /> <br /> <br />
                <input type="submit" value="Add User" />
            </form>
        </div>
    );
};

export default AddUser;