import { BrowserRouter , Route , Routes } from "react-router-dom"
import { SignUp } from "./pages/SignUp"
import { SignIn } from "./pages/SignIn"
import { Dashboard } from "./pages/DashBoard"
import { SendMoney } from "./pages/SendMoney"
import './App.css'
function App() {

  return (
    <BrowserRouter>
      <Routes>
         <Route path="/signIn" element={<SignIn/>}/>
         <Route path="/signUp" element={<SignUp/>}/>
         <Route path="/dashboard" element={<Dashboard/>}/>
         <Route path="/send" element={<SendMoney/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
