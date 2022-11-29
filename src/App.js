
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navigation from "./components/Navigation";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Single from "./pages/Single";
import Updateuser from "./pages/Updateuser";
import Write from "./pages/Write";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ProctectedRoute from "./pages/ProctectedRoute";

function App() { 

  return(
    <BrowserRouter>
       <Navigation />
        <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/login" element={<Login />} />
          <Route path="/single" element={<Single />} />
          <Route path="/update/user" element={
            <ProctectedRoute>
               <Updateuser />
            </ProctectedRoute>
          

          } />
          <Route path="/write" element={
            <ProctectedRoute>
                <Write />
            </ProctectedRoute>
          
          } />
        </Routes>
       <ToastContainer position="top-right" />
       {/* <Login /> */}
    </BrowserRouter>
    
  ) 
}

export default App;
