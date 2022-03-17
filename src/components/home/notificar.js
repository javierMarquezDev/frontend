import { NotificationContext } from "../home/NotificationProvider";
import {v4} from "uuid";
import { useContext } from "react";

const useNotificar = () =>{

  const dispatch = useContext(NotificationContext);

  return (props)=>{

    dispatch({
      type: "ADD_NOTIFICATION",
      payload: {
        id: v4(),
        ...props
      }
    })
  }
  
    
}

export default useNotificar;