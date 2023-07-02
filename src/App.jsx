import Navbar from "./common/Navbar.jsx";
import {Routes, Route} from "react-router-dom";
import SearchUser from "./user/SearchUser.jsx";
import Home from "./pages/Home.jsx";

function App() {

    return (
        <>
            <Navbar/>
            <Routes>
                <Route exact path="/" element={<Home/>}/>
                <Route path="/search" element={<SearchUser/>}/>
            </Routes>
        </>
    )
}

export default App
