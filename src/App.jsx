import './App.css'
import SearchUser from "./user/SearchUser.jsx";

function App() {


    const s = {
        border: "medium solid white",
        padding: "1rem",
        margin: "5% auto"
    }

    return (
        <>
            <div style={s}>
                <SearchUser/>
            </div>
        </>
    )
}

export default App
