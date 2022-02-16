let SrvDaoNoticia = class DaoNoticia{

    static create(noticiaJson = {}){

        return fetch(
            "https://localhost:8080/api/noticias",
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

    static delete(empresa, grupocodigo, autor, codigo){

        return fetch(
            "https://localhost:8080/api/noticias/"+empresa+"/"+grupocodigo+"/"+autor+"/"+codigo,
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

    static edit(empresa, grupocodigo, autor, codigo, noticiaJson = {}){
        return fetch(
            "https://localhost:8080/api/noticias/"+empresa+"/"+grupocodigo+"/"+autor+"/"+codigo,
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

    static getAllByGrupo(empresa, grupocodigo){

        return fetch(
            "https://localhost:8080/api/noticias/"+empresa+"/"+grupocodigo,
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

    static getAllByUsuarioAndGrupo(empresa, grupocodigo, autor);

    static getOneById(empresa, grupocodigo, autor, codigo){

        return fetch(
            "https://localhost:8080/api/noticias/"+empresa+"/"+grupocodigo+"/"+autor+"/"+codigo,
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

}

export default SrvDaoNoticia;