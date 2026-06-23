import { Chat } from "./chat"
import { Side } from "./sid"


export const Home=()=>{


    return(

    <div className="w-full grid gap-2  grid-cols-5 p-1 bg-white h-full">


<div className= " shadow-2xl rounded-2xl col-span-1  ">

<Side/>

</div>


<div className="shadow-2xl  rounded-2xl  col-span-4  ">
   <Chat/>
</div>

    </div>


    )


}