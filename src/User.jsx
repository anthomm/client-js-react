import {useEffect, useState} from "react";
import axios from "axios";

export default function User({uid}) {
    const [user, setUser] = useState({})
    useEffect(() => {
        readUser(uid).catch((e) => (console.log(e)))
    })

    async function readUser(id) {
        axios.get(`http://localhost:3000/user/${id}`)
            .then((x) => (setUser(x.data)))
            .catch((e) => (console.log(e)))
    }

    const {id, name, age, created, updated} = user

    return (
        <div className="user">
            <p>ID: {id}</p>
            <p>Name: {name}</p>
            <p>Age: {age}</p>
            <p>Created: {created}</p>
            <p>Updated: {updated}</p>
            <button onClick={() => (readUser(user.id))}>Refresh</button>
        </div>
    )
}
