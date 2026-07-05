import { useEffect, useState } from "react"
import { Chat } from "./chat"
import { Side } from "./sid"
import { useNavigate } from "react-router"


export const Home=()=>{

    const [get_token , set_token] = useState(null)


    let navigate = useNavigate()
    useEffect(()=>{
        let token = localStorage.getItem("token")

        if(token === null){

           navigate("/")


        }

        set_token(token)



    },[])

    return(

    <div className="w-screen h-screen grid gap-2 overflow-hidden  grid-cols-5 p-1 bg-white h-full">


<div className= " w-full h-full col-span-1  ">

<Side/>

</div>


<div className=" w-full h-full col-span-4  ">
   <Chat/>
</div>

    </div>


    )


}