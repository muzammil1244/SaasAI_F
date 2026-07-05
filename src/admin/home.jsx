import { Upload } from "lucide-react"
import { Upload_document } from "./upload"
import { List } from "./list"
import {TodayAppointments} from "./today"
export const Admin_home=()=>{

    return(

        <div className="w-screen h-screen grid grid-cols-3  bg-green">

<div className="col-span-1 h-full">
    <Upload_document/>
</div>

<div className="col-span-1 h-full overflow-hidden " >
    <List/>

</div>

<div className="col-span-1 h-full overflow-hidden " >
    <TodayAppointments/>

</div>

        </div>
    )
}