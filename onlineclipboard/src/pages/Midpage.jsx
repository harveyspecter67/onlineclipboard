
import { Link } from "react-router-dom";
export default function Midpage(){

    return(
       <div>
        <Link to = "/pastepage">Paste text</Link>
        <Link to = "/copypage">Copy text</Link>
       </div>
    )
}