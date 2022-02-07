import { Navigate } from "react-router-dom";

function Redirect(url){

    return(<Navigate to={url} />);
}

export default Redirect;