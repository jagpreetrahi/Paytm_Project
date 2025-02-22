import { useNavigate } from "react-router-dom"
import axios from "axios"
import { useEffect, useState } from "react"
import { Button } from "./Button";


export const Users  = () => {
    const [filter , setFilter] = useState("");
    const [users , setUser] = useState([]);


    useEffect( () => {
         axios.get("http://localhost:3000/api/v1/user/bulk?filter=" + filter)
        .then((response) => {
            setUser(response.data)
        })
         
    } , [filter])
   return  <>

        <div className="font-bold text-2xl mt-6 ml-3 mb-3">
            Users
        </div>
        <div>
            <input onChange={(e) => setFilter(e.target.value)} type="text" placeholder="Search Users...." className="w-3xl h-12 px-2  border rounded-lg bg-slate-200 ml-5" ></input>
        </div>
        <div>
            {users.map((user) => <User user = {user}/>)}
        </div>
        
   </>
   
}

function User({user}){
    const navigate = useNavigate();

    return <div className="flex justify-between">
          <div className="flex">
              <div className="rounded-full h-12 w-12 flex justify-center bg-slate-200 mt-1 mr-2">
                 <div className="flex flex-col h-full text-xl justify-center">
                     {user.firstName[0]}
                 </div>
              </div>
              <div className="flex flex-col h-full justify-center">
                    <div>
                        {user.firstName} {user.lastName}
                    </div>
               </div>
        </div>
        <div className="flex flex-col justify-center h-full">
            <Button onClick={() => {
                navigate("/send?id=" + user._id + "&name=" + user.firstName)
            }} label={"Send Money"}/>
        </div>
          
    </div>
}