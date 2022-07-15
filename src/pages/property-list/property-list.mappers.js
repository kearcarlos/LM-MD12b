export const mapPropertyListFromApiToViewModel = (propertyList) => {
    return propertyList.map((property) => mapPropertyFromApiToViewModel(property));
};


const mapPropertyFromApiToViewModel = (property) => {
    return {
        id: property.id,
        title: property.title,
        rooms: `${property.rooms} ${getRoomWord(property.rooms)}`,
        squareMeter: `${property.squareMeter} m2`,
        notes: `${property.notes.substring(0, 240)}...`,//substring para cortar unas notas con un límite maximo decaracteres            
        price: `${property.price.toLocaleString()} €`,// para poner el punto en miles o millones. Transforma el texto que recibe en el idioma local o la forma de escritura local.
        image: Array.isArray(property.images) ? property.images[0] : '',//Aquí primero miramos que haya alguna imagen subida con la función Array.isArray(), nos devuelve un booleano y ya después hacemos el ternario para que si no hay ninguna imagen deje un string vacío.

    };
};

const getRoomWord = (rooms) => {
    return rooms > 1 ? 'habitaciones' : 'habitación';
};

export const mapFilterToQueryParams = filter => {
    let queryParams = '';

    if (filter.saleTypeId) {
        queryParams = `${queryParams}saleTypeIds_like=${filter.saleTypeId}&`;
    }
    if (filter.provinceId) {
        queryParams = `${queryParams}provinceId=${filter.provinceId}&`;
    }

    if (filter.minRooms) {
        queryParams = `${queryParams}rooms_gte=${filter.minRooms}&`;
    }

    if (filter.minBathRooms) {
        queryParams = `${queryParams}bathrooms_gte=${filter.minBathRooms}&`;
    }

    if (filter.minPrice) {
        queryParams = `${queryParams}price_gte=${filter.minPrice}&`;
    }
    if (filter.maxPrice) {
        queryParams = `${queryParams}price_lte=${filter.maxPrice}&`;
    }
    return queryParams.slice(0, -1); // Para quitar el último & de la dirección y evitar que de algún error
}