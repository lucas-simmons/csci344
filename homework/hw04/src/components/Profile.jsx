import React, { useState, useEffect } from 'react';
import { getDataFromServer } from "../server-requests";

export default function Profile({ token }) {
    const [profile, setProfile] = useState([]);

    useEffect(() => {
        async function getProfile() {
            const data = await getDataFromServer(token, "/api/profile");
            console.log(data);
            setProfile(data);
        }
        getProfile();
    }, [token]);
    


    return (
        <header className="flex gap-4 items-center">
        <img alt={"profile picture of " + profile.username} src={profile.image_url} className="rounded-full w-16 h-16" />
        <h2 className="font-Comfortaa font-bold text-2xl">{profile.username}</h2>
    </header>
    );
}
