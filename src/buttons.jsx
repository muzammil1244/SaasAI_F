

import { CornerLeftUp } from 'lucide-react';
import { LogOut } from 'lucide-react';

export const Buttons = ({onclick})=>{


    return(

        <button onClick={()=>onclick()} className="  justify-center items-center flex hover:scale-105 duration-100  bg-white text-sm hover:bg-gray-200 duration-100 hover:cursor-pointer  text-black px-2 py-1 rounded-xl">
<CornerLeftUp className= ' w-4 h-4 hover:text-black text-gray-600'/>
            </button>
    )
}


export const Signout=()=>{

    return(

        <button className="  justify-center items-center flex hover:scale-105 duration-100  bg-white text-sm hover:bg-gray-200 duration-100 hover:cursor-pointer  text-black px-2 py-1 rounded-xl">
            <LogOut  className= '   w-4 h-4 hover:text-black text-gray-600'/>
        </button>


    )

}