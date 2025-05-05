import React, { useState } from 'react';
import { postDataToServer, deleteDataFromServer } from '../server-requests';

export default function Bookmark({bookmarkId ,postId, token}) {
    const [stateBookmarkId, setStateBookmarkId] = useState(bookmarkId);

    async function createBookmark() {
        console.log("creating a bookmark...")
        const sendData = {
            post_id: postId,
        };
        const responseData = await postDataToServer(token, "/api/bookmarks/", sendData);
        console.log(responseData)
        setStateBookmarkId(responseData.id);
    }

    async function deleteBookmark() {
        console.log("deleting a bookmark...")
        const endPoint=`/api/bookmarks/${stateBookmarkId}`
        const responseData = await deleteDataFromServer(token, endPoint);
        setStateBookmarkId(null);

    }


    if (stateBookmarkId) {    
        return (
            <button onClick={deleteBookmark}
            aria-label="UnBookmark This Post" aria-checked="true" aria-roledescription="toggle"
            >
                <i  
                
                  className="fas fa-bookmark"></i>
            </button>
        );
    } else {
        return (
            <button onClick={createBookmark}
            aria-label="Bookmark This Post" aria-checked="false" aria-roledescription="toggle"

             >
                <i 
                aria-label="Bookmark This Post" aria-checked="false" aria-roledescription="toggle"
                 className="far fa-bookmark"></i>
            </button>
        );
    }
}