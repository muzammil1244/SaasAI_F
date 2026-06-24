import { Chat } from "./chat"
import { Side } from "./sid"


export const Home=()=>{


    return(

    <div className="w-full grid gap-2 overflow-hidden  grid-cols-5 p-1 bg-white h-full">


<div className= " w-full h-full col-span-1  ">

<Side/>

</div>


<div className=" w-full h-full col-span-4  ">
   <Chat/>
</div>

    </div>


    )


}