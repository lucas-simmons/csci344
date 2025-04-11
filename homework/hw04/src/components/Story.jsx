import React, { useState, useEffect } from "react";

export default function Story({storyData, token}) {

    return (
        <div className="flex flex-col justify-center items-center flex-none">
                <img src={storyData.user.image_url} alt={"profile picture of " + storyData.user.username} className="rounded-full w-10 h-10 border-2 border-gray-300" />
                <p className="text-xs text-gray-500">{storyData.user.username}</p>
        </div>
    )
}