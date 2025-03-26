import React from "react";
import Profile from  "./Profile.jsx";
import {Welcome} from "./Welcome.jsx";


 export default function App() {

     return (
         <>
             <header>
                 <h1>My First App</h1>
             </header>
             <main>
                 <Welcome name="Lucas" imgUrl="https://picsum.photos/200?a=b" />
                 <p>Hello React!</p>
             </main>
         </>
     );
 }