import React, { useState, useEffect } from "react";
import { getDataFromServer } from "../server-requests";
import Story from "./Story";

export default function Stories({ token }) {

    const [stories, setStories] = useState([]);
    
        async function getStories() {
            const data = await getDataFromServer(token, "/api/stories");
            console.log(data);
            setStories(data);
        }
    
        useEffect(() => {
            getStories();
        }, []);
    
        function outputStory(storyData) {
            return <Story token={token} key={storyData.id} storyData={storyData} />
        }
    
    return (
        <header className="flex gap-6 bg-slate-300 shadow-xl rounded-xl p-2 overflow-hidden mb-6">
            {
                stories.map(outputStory)
            }
        </header>
    );
}
