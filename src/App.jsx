import Navbar from "./common/Navbar.jsx";
import {Route, Routes} from "react-router-dom";
import Home from "./pages/Home.jsx";
import Box from "@mui/material/Box";
import {Container} from "@mui/material";
import Test from "./pages/Test.jsx";
import FirestoreSearch from "./components/FirestoreSearch.jsx";

function App() {

    const containerStyle = {
        border: "1px solid red"
    }

    const boxStyle = {
        border: "1px solid green",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
    }

    return (
        <>
            <Navbar/>
            <Container sx={containerStyle}>
                <Box sx={boxStyle}>
                    <Routes>
                        <Route exact path="/" element={<Home/>}/>
                        <Route path="/search" element={<FirestoreSearch/>}/>
                        <Route path="/test" element={<Test/>}/>
                    </Routes>
                </Box>
            </Container>
        </>
    )
}

export default App
