import React from 'react';
import Bookmark from './Bookmark';
import Like from './Like';
import Comments from './Comments';

export default function Post({postData, token}) {

    return (
        <section className="bg-slate-300  shadow-xl mb-10 rounded-xl">
        <div className="p-4 flex justify-between">
                <h3 className="text-lg font-Comfortaa font-bold">{postData.user.username}</h3>
                <button aria-label="settings of the post - currently not applicable" className="icon-button"><i className="fas fa-ellipsis-h"></i></button>
            </div>
        <img src={postData.image_url} alt={postData.alt_text || "Post Photo"} width="300" height="300"
                className="w-full bg-cover" />
        <div className="p-4">
                <div className="flex justify-between text-2xl mb-3">
                    <div className=" flex gap-2">
                        <Like token={token} postId={postData.id} LikeId={postData.current_user_like_id} />
                        <button aria-label="leave a comment, but this currently is not applicable"><i className="far fa-comment"></i></button>
                        <button aria-label="share the post, but this is currently not applicable"><i className="far fa-paper-plane"></i></button>
                    </div>
                    <div>                        
                        <Bookmark token={token} bookmarkId={postData.current_user_bookmark_id} postId={postData.id} />
                    </div>
                </div>
                <p className="font-bold mb-3">{postData.likes.length} likes</p>
                <div className="text-sm mb-3">
                    <p className=" flex gap-2">
                        <strong>{postData.user.username}</strong>
                        {postData.caption}
                        <button className="button">more</button>
                    </p>
                </div>
                <Comments postId={postData.comments} />
                <p className="uppercase text-gray-700 text-xs">{postData.display_time}</p>
        </div>
        
        </section>

    )
}