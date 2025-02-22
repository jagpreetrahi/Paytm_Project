import { useState } from "react"
import { useNavigate } from "react-router-dom";
import { SubHeading } from "../component/SubHeading";
import { InputBox } from "../component/InputBox";
import { Heading } from "../component/Heading";
import { Button } from "../component/Button";
import { BottomWarning } from "../component/BottomWarning";

export const SignUp = () => {
    const [firstName , setFirstName] = useState("");
    const [lastName , setLastName] = useState("");
    const [userEmail , setEmail] = useState("");
    const [password , setPassword] = useState("");
    const navigate = useNavigate();

    return <div className="h-screen bg-slate-300 flex justify-center">
         
        <div className="flex flex-col justify-center">
            <div className="rouded-lg bg-white w-80 h-max p-2 px-4 text-center">
                <Heading label={"Sign Up"}/>
                <SubHeading label={"Enter your infromation to create an account"}/>
                <InputBox placeholder={"John"} label={"First Name"} onChange={(e) => setFirstName(e.target.value)}/>
                <InputBox placeholder={"Doe"} label={"Last Name"} onChange={(e) => setLastName(e.target.value)}/>
                <InputBox placeholder={"xyz@gmail.com"} label={"Email"} onChange={(e) => setEmail(e.target.value)}/>
                <InputBox placeholder={"1234"} label={"Password"} onChange={(e) => setPassword(e.target.value)}/>
                <div className="pt-4">
                    <Button onClick={async () => {
                        const response = await axiox.post("http://localhost:3000/api/v1/user/signUp"  , {
                            userEmail,
                            firstName,
                            lastName,
                            password
                        });
                        localStorage.setItems('token' , response.data.token)
                        navigate("/dashboard")
                    }} label={"Sign Up"}/>
                        
                </div>
                <BottomWarning label={"Don't have an account"} buttonText={"Sign In"} to={"/signIn"}/>

            </div>
        </div>
    </div>
}