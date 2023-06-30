import {useState} from "react";
import axios from "axios";

export default function SearchUser() {
    const [users, setUsers] = useState([])
    const [error, setError] = useState("")
    const [randomUser, setRandomUser] = useState({})

    async function searchUser(field, op, value) {
        axios.get(`http://localhost:3000/user`,
            {
                params: {
                    q: [
                        `${field},${op},${value}`,
                    ]
                }
            })
            .then((x) => (setUsers(x.data)))
            .catch((e) => {
                try {
                    setError(e.response.data.message)
                } catch (_) {
                    setError(e.message)
                }
            })
    }

    async function deleteUserBatch(batch) {
        axios.put(`http://localhost:3000/user/delete`,
            {
                ids: batch
            })
            .then(() => (setUsers([])))
            .catch((e) => {
                try {
                    setError(e.response.data.message)
                } catch (_) {
                    setError(e.message)
                }
            })
    }


    function handleSubmit(e) {
        // Prevent the browser from reloading the page
        e.preventDefault();
        setError("")

        // Read the form data
        const form = e.target;
        const formData = new FormData(form);

        const {field, operator, value} = Object.fromEntries(formData.entries());
        searchUser(field, operator, value)
            .catch((e) => (console.log(e)))
    }

    const inputStyle = {
        justifyContent: "space-between",
        textAlign: "left",
        alignItems: "center",
        margin: "1em",
        display: "flex",
        flexDirection: "column",
        textIndent: "1em hanging"
    }

    const ids = users.map(x => x.id)

    return (
        <>
            <h1>Search Users</h1>
            <form method="post" onSubmit={handleSubmit}>
                <div style={inputStyle}>
                    <label>
                        Field: <input name="field"/>
                    </label>
                    <label>
                        Operator: <input name="operator"/>
                    </label>
                    <label>
                        Value: <input name="value"/>
                    </label>
                    <button>Search</button>
                </div>
            </form>
            {error && <p style={{color: "red"}}>{error}</p>}
            <hr/>
            {users.length === 0 && <p>Found: 0</p>}
            {users.length > 0 &&
                <>
                    <p>Found: {users.length}</p>
                    {Object.keys(randomUser).length > 0 &&
                        <pre style={{textAlign: "left"}}>{JSON.stringify(randomUser, null, 2)}</pre>}
                    <button onClick={() => (setRandomUser(randomElement(users)))}>Show Random User</button>
                </>
            }
            {ids.length > 0 &&
                <>
                    <hr/>
                    <button onClick={() => (deleteUserBatch(ids))}>Delete</button>
                </>
            }
        </>
    )
}

function randomElement(input) {

    if (!Array.isArray(input)) {
        return undefined
    }

    return input[Math.floor(Math.random() * input.length)];
}
