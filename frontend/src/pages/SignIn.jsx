import { useState } from "react"
import { SubHeading } from "../component/SubHeading";
import { Heading } from "../component/Heading";
import { InputBox } from "../component/InputBox";
import { Button } from "../component/Button";
import { BottomWarning } from "../component/BottomWarning";

export const SignIn = () => {
    const [userEmail , setEmail] = useState("");
    const [password , setPassword] = useState("");
    return <div className="h-screen bg-slate-300 flex justify-center">
        <div className="flex flex-col justify-center">
            <div className="rounded-lg w-80 bg-white text-center h-max px-4 p-2">
                 <Heading label = {"Sign In"}/>
                 <SubHeading label={"Enter your credentials to access your account"}/>
                 <InputBox placeholder="jaggy@gmail.com" label={"Email"} onchange={(e) => setEmail(e.target.value)} />
                 <InputBox placeholder="1234" label={"Password"} onchange={(e) => setPassword(e.target.value)} />
                 <div className="pt-4">
                    <Button onClick = { async() => {
                       const response = await axios.post("http://localhost:3000/api/v1/user/signIn" , {
                        userEmail , 
                        password
                       });
                       localStorage.setItem("token" , response.data.token);
                       Navigate("/dashboard")

                    }} label ={"Sign In"}/>
                 </div>
                 <BottomWarning label={"Don't have an account"} buttonText={"Sign Up"} to = {"/signUp"}/>
            </div>

        </div>

    </div>
}
