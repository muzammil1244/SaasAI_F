
import { useState } from 'react'
import  {Page1} from './page1'
import {Page2} from './page2'
import { Page3 } from './page3'
import { Page4 } from './page4'
import {Auth} from '../auth/auth'
export const Main = () =>{

    const [ getauth , setauth ] = useState(false)

return(

<div className="  w-screen h-screen overflow-x-hidden bg-white overflow-y-scroll">

<div className='fixed top-5 left-5 z-[999] pointer-events-none'>

  <div
    onClick={() => {
        setauth(!getauth)
    }}
    className='relative z-[999] cursor-pointer pointer-events-auto bg-gray-100 px-4 py-2 rounded-lg text-black hover:bg-gray-50 duration-75   border border-gray-200'
  >
    Register
  </div>

</div>


<Page1/>
<Page2/>
<Page3/>
<Page4/>

{
    getauth &&<div
className=' absolute  top-0 w-screen h-screen'
>
    <Auth offauth={()=>setauth(false)}/>

</div>
}

</div>

)

}