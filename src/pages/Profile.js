// src/pages/Profile.js
import React, { useContext } from 'react';
import AuthContext from '../context/AuthContext';

const Profile = () => {
    const { user } = useContext(AuthContext);

    return (
        <div>
            <h2>User Profile</h2>
            <p>Name: {user ? user.name : "N/A"}</p>
            <p>Email: {user ? user.email : "N/A"}</p>
        </div>
    );
};

export default Profile;
