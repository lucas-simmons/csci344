import React, { useState, useEffect } from "react";
import { getDataFromServer } from "../server-requests";
import Post from "./Post";

// JOB: FETCH post data from the server and iterate thru
export default function Posts({ token }) {
    const [posts, setPosts] = useState([]);

    async function getPosts() {
        const data = await getDataFromServer(token, "/api/posts");
        console.log(data);
        setPosts(data);
    }

    useEffect(() => {
        getPosts();
    }, []);

        function outputPost(postObj) {
            return <Post token={token} key={postObj.id} postData={postObj} />
        }

    return (
             <div>
                {
                posts.map(outputPost)
                }
            </div>
            );
}
