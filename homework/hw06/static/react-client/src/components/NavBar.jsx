import React from "react";

export default function NavBar({ username }) {
    // This component is implemented for you:
    return (
        <nav className="flex justify-between shadow-xl py-5 px-9 bg-slate-300 border-b sticky w-full top-0">
            <h1 className="font-Comfortaa font-bold text-2xl">Photo App</h1>
            <ul className="flex gap-4 text-sm items-center justify-center">
                <li>
                    <span>{username}</span>
                </li>
                <li><a className="text-blue-700 py-2" href="/api">API Docs</a></li>
                <li>
                    <a className="text-blue-700 py-2" href="/logout">Sign out</a>
                </li>
            </ul>
        </nav>
    );
}
