import { useEffect, useState } from "react";
import ControlEmpresa from "../../back/control/controlEmpresa";

const useDataEmpresa = (empresaId) => {

    const [empresa,setEmpresa] = useState(null);
    const [isPending, setIsPending] = useState(true);

    useEffect(()=>{

        const abortCont = new AbortController();

        setTimeout(()=>{
            ControlEmpresa.getById(empresaId)
            .then(data=>{
                console.log(data);
                setEmpresa(data);
                setIsPending(false);
            })
        }, 1000)

        return abortCont.abort();

    }, [empresaId])

    return {empresa,isPending};
}
 
export default useDataEmpresa;