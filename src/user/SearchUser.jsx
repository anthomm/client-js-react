import {useState} from "react";
import axios from "axios";

export default function SearchUser() {
    const [users, setUsers] = useState([])
    const [error, setError] = useState("")

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

    const idList = users.map(x => x.id)

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
                    <pre style={{textAlign: "left"}}>{JSON.stringify(users, null, 2)}</pre>
                </>
            }
            {idList.length > 0 &&
                <>
                    <hr/>
                    <button onClick={() => (deleteUserBatch(idList))}>Delete</button>
                </>
            }
        </>
    )
}
