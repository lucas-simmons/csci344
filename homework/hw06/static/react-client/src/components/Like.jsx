import React, { useState } from 'react';
import { postDataToServer, deleteDataFromServer } from '../server-requests';

export default function Like({LikeId, postId, token}) {
    const [stateLikeId, setStateLikeId] = useState(LikeId);
    
        async function createLike() {
            console.log("creating a like..")
            const sendData = {
                post_id: postId,
            };
            const responseData = await postDataToServer(token, "/api/likes/", sendData)
            console.log(responseData)
            setStateLikeId(responseData.id);
        }
    
        async function deleteLike() {
            console.log("deleting a like...")
            const endPoint=`/api/likes/${stateLikeId}`
            const responseData = await deleteDataFromServer(token, endPoint)
            setStateLikeId(null);
    
        }

    if(stateLikeId) {    
        return (
            <button
            aria-label="Unlike This Post" aria-checked="true" aria-roledescription="toggle"
            onClick={deleteLike}>
                <i className="fas text-red-600 fa-heart"></i>
            </button>
        )
    }
    else {
        return (
            <button 
            aria-label="Like This Post" aria-checked="false" aria-roledescription="toggle"
            onClick={createLike}>
                <i className="far fa-heart"></i>
            </button>
        )
    }
}