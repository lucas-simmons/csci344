import React, { useState, useEffect } from "react";
import Suggestion from "./Suggestion";
import { getDataFromServer } from "../server-requests";

export default function Suggestions({ token }) {
    const [suggestions, setSuggestions] = useState([]);


    async function getSuggestions() {
        const data = await getDataFromServer(token, "/api/suggestions");
        console.log(data);
        setSuggestions(data);
    }

    useEffect(() => {
            getSuggestions();
    }, []);

    function outputSuggestion(postData) {
        return <Suggestion token={token} postData={postData} key={postData.id} />
    }

    return (
        <div className=" ">
            <p className="text-base text-gray-800 font-bold mb-4">
                Suggestions for you
            </p>

            
                {
                    suggestions.map(outputSuggestion)
                }
            
        </div>
    );
}
