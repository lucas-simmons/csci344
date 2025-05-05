import React, { useState, useEffect } from "react";

export default function Suggestion({ token, postData}) {


    return (
        <section className="flex justify-between items-center mb-4 gap-2">
            <img src={postData.image_url} alt={"profile picture of " + postData.username} className="rounded-full w-14 h-14" />
            <div className="w-[180px]">
                <p className="font-bold text-sm">{postData.username}</p>
                <p className="text-gray-700 text-xs">suggested for you</p>
            </div>
            <button className="text-blue-700 text-sm py-2">follow</button>
        </section>
    )
}