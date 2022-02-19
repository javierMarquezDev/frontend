import config from "../config/config.json";

const connectionStr = config.route+"noticias/";

let SrvDaoNoticia = class DaoNoticia{

    static async create(noticiaJson = {}){

        return await fetch(
            connectionStr+noticiaJson.grupoempresa+"/"+noticiaJson.grupocodigo+"/"+noticiaJson.autor,
            {
                mode: 'cors',
                method: 'POST',
                headers:{
                    "access-token":localStorage.getItem('token'),
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(noticiaJson)

            }
        ).then((response) => response.json())
        .then(data => {
            console.log(data);
            return data;
        })

    };

    static async delete(noticia){

        return await fetch(
            connectionStr+noticia.grupoempresa+"/"+noticia.grupocodigo+"/"+noticia.autor+"/"+noticia.codigo,
            {
                mode: 'cors',
                method: 'DELETE',
                headers:{
                    "access-token":localStorage.getItem('token')
                }

            }
        ).then((response) => response.json())
        .then(data => {
            console.log(data);
            return data;
        })
    };

    static async edit(noticiaJson){

        return await fetch(
            connectionStr+noticiaJson.grupoempresa+"/"+noticiaJson.grupocodigo+"/"+noticiaJson.autor+"/"+noticiaJson.codigo,
            {
                mode: 'cors',
                method: 'PUT',
                headers:{
                    "access-token":localStorage.getItem('token'),
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(noticiaJson)

            }
        ).then((response) => response.json())
        .then(data => {
            console.log(data);
            return data;
        })
    };

    static async getAllByGrupo(empresa, grupocodigo){

        return await fetch(
            connectionStr+empresa+"/"+grupocodigo,
            {
                mode: 'cors',
                method: 'GET',
                headers:{
                    "access-token":localStorage.getItem('token')
                }

            }
        ).then((response) => response.json())
        .then(data => {
            console.log(data);
            return data;
        })

    };

    static async getAllByUsuarioAndGrupo(empresa, grupocodigo, autor){

        return await fetch(
            connectionStr+empresa+"/"+grupocodigo+"/"+autor,
            {
                mode: 'cors',
                method: 'GET',
                headers:{
                    "access-token":localStorage.getItem('token')
                }

            }
        ).then((response) => response.json())
        .then(data => {
            console.log(data);
            return data;
        })


    };

    static async getOneById(empresa, grupocodigo, autor, codigo){

        return await fetch(
            connectionStr+empresa+"/"+grupocodigo+"/"+autor+"/"+codigo,
            {
                mode: 'cors',
                method: 'GET',
                headers:{
                    "access-token":localStorage.getItem('token')
                }

            }
        ).then((response) => response.json())
        .then(data => {
            return data;
        })

    };

}

export default SrvDaoNoticia;