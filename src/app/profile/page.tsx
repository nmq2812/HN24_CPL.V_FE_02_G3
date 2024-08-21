"use client";

import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { getUser } from '@/services/get-user';

export default function Profile() {
    const [image, setImage] = useState('https://api.realworld.io/images/smiley-cyrus.jpeg');
    const [username, setUsername] = useState('');
    const [bio, setBio] = useState('');

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const user = await getUser();
                setImage(user.image || 'https://api.realworld.io/images/smiley-cyrus.jpeg');
                setUsername(user.username || '');
                setBio(user.bio || '');
            } catch (error) {
                console.error('Failed to fetch user data', error);
            }
        };

        fetchUserData();
    }, []);

    return ( 
        <div className="profile-page">
            <div className="user-info">
                <div className="container">
                    <div className="row">
                        <div className="col-xs-12 col-md-10 offset-md-1">
                            <img
                                src={image}
                                className="user-img"
                                alt="profile avatar" />
                            <h4>{username}</h4>
                            <p>{bio}</p>
                            <a className="btn btn-sm btn-outline-secondary action-btn" href="/settings"><i className="ion-gear-a"></i> Edit Profile Settings</a>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container">
                <div className="row">
                    <div className="col-xs-12 col-md-10 offset-md-1">
                        <div className="articles-toggle">
                            <ul className="nav nav-pills outline-active">
                                <li className="nav-item"><a className="nav-link active" href="">My Articles</a></li>
                                <li className="nav-item"><a className="nav-link " href="">Favorited Articles</a></li>
                            </ul>
                        </div>
                        <div>No articles are here... yet.</div>
                    </div>
                </div>
            </div>
        </div>
    );
}
