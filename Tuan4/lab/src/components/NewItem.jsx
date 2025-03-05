import { useEffect } from "react"
import { useState } from "react"
import Item from "./Item"
export default function NewItem() {
    const [arr, setArr] = useState([])
    useEffect(() => {
        fetch('https://67c83e5f0acf98d070859495.mockapi.io/api/v1/vukhung')
            .then(data => data.json())
            .then(data => setArr(data))
    }, []);
    return (
        <div>
             <Item data={arr} />
        </div>
    )
}
