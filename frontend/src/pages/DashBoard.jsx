import { Balance } from "../component/Balance"
import {AppBar}  from "../component/AppBar"
import {Users} from "../component/Users"
export const Dashboard = () => {
   return <div>
     <AppBar/>
     <div>
        <Balance value={"10000"}/>
        <Users/>
     </div>

   </div>
}