import {useEffect, useState} from "react";
import axios from "axios";

export default function User() {
    const [user, setUser] = useState({})
    useEffect(() => {
        readUser("92TajfiKrSoAJ90lykrB").then((x) => {
            setUser(x.data)
        })
    }, [])

    async function readUser(id) {
        return axios.get(`http://localhost:3000/user/${id}`)
            .then((x) => {
                return x
            })
            .catch((e) => {
                console.log(e);
            })
    }


    return (
        <>
            <div className="app-div">
                <p>ID: {user.id}</p>
                <p>Name: {user.name}</p>
                <p>Age: {user.age}</p>
                <p>Created: {user.created}</p>
                <p>Updated: {user.updated}</p>
            </div>
            {/*<button onClick={() => (getUser(user.id))}>Clicky</button>*/}
        </>
    )

}