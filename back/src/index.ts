const recuperarData = async () => {

    try {
        const response = await fetch('https://swapi.dev/api/people/');
    
    if(!response.ok) throw new Error('Error al obtener los datos');
    
    const data = await response.json();

    return data;

    } catch (error) {
        console.log(error);
    }
   
}

recuperarData().then(data => console.log(data));