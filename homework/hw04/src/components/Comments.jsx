import React, { useState } from 'react';
import { postDataToServer, deleteDataFromServer } from '../server-requests';

export default function Comments({postId}) {
    
    
    function renderComment(postId) {
        const template = 
                      <p className="text-sm mb-3 flex gap-2">
                          <strong>{postId.user.username}</strong>
                          {postId.text}
                      </p>
        ;
        return template;
      }
    function renderComments(postId) {
       // console.log(postId)
        let template = "";
        if (postId.length > 1) {
          template = <div className="">
            {renderComment(postId[0])}
            
            <button className="link text-sm text-sky-700">View all {
                postId.length
            } comments</button>
            </div>
            ;
        } else if (postId.length === 1) {
          console.log(` less than or equal to 1  | ${postId.length}`);
          template = `
          ${renderComment(postId[0])}
        `;
        }
        return template;
    }


    return (
        
        renderComments(postId)
        

    );
}