import { Link } from "react-router-dom";

const NotificationList = () => {
    return ( <div>
        <ul>
            <li>Notificacion 1 <Link>Eliminar</Link></li>
            <li>Notificacion 2 <Link>Eliminar</Link></li>
            <li>Notificacion 3 <Link>Eliminar</Link></li>
            <li>Notificacion 4 <Link>Eliminar</Link></li>
        </ul>
    </div> );
}
 
export default NotificationList;