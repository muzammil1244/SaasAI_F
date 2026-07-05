export const Page1 = ()=>{


    return(

        <div 
         style={{
          backgroundImage: "radial-gradient(circle, #0E211D 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
        className="w-screen h-screen flex justify-center items-center bg-white  overflow-hidden
        ">




 

<div className=" container flex justify-center items-center  w-full h-full ">


{/* front */}

<div className="  frontcard  bg-white">
<h1 
style={
{animation:"text_gradient_animation 2s linear infinite , flip_card 2s linear infinite" ,}
}
className=" text-3xl font-bold bg-gradient-to-r bg-[length:200%_auto] from-gray-800 via-gray-300 to-gray-800
 bg-clip-text text-transparent " >
    Appointly
    </h1>

</div>

{/* back */}

<div className=" absolute backcard w-fit bg-white">
 
 <h1  className="text-gray-90 text-xl  flex">

   <span className=" text-cyan-500 not-[]:">EASY</span> APPOINTMENT
 </h1>

</div>






</div>






        </div>

       
    )
}