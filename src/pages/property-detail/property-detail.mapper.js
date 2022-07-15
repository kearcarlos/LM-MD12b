// export const mapPropertyDetailsFromApiToViewModel = propertyDetails => {
//     return propertyDetails.map((propertyDetail) => mapDetailsFromApiToViewModel(propertyDetail));

// };

// let details = {
//     id: '',
//     title: '',
//     notes: '',
//     email: '',
//     phone: '',
//     price: '',
//     saleTypeIds: '',
//     address: '',
//     city: '',
//     provinceId: '',
//     squareMeter: '',
//     rooms: '',
//     bathrooms: '',
//     locationUrl: '',
//     mainFeatures: '',
//     equipmentIds: '',
//     images: '',
// }

export const mapDetailsFromApiToViewModel = (equipmentList, propertyDetail) => {
    return {
        mainImage: propertyDetail.images[0],
        id: propertyDetail.id,
        title: propertyDetail.title,
        notes: propertyDetail.notes,
        email: propertyDetail.email,
        phone: propertyDetail.phone,
        price: `${propertyDetail.price.toLocaleString()} €`,
        saleTypeIds: propertyDetail.saleTypeIds,
        address: propertyDetail.address,
        city: propertyDetail.city,
        provinceId: propertyDetail.provinceId,
        squareMeter: `${propertyDetail.squareMeter} m2`,
        rooms: `${propertyDetail.rooms} ${getRoomWord(propertyDetail.rooms)}`,
        bathrooms: `${propertyDetail.bathrooms} ${getBarhRoomWord(propertyDetail.bathrooms)}`,
        locationUrl: propertyDetail.locationUrl,
        mainFeatures: propertyDetail.mainFeatures,
        equipments: getPropertyEquipments(equipmentList, propertyDetail.equipmentIds),
        images: propertyDetail.images,
    }
};

const getRoomWord = (rooms) => {
    return rooms > 1 ? 'habitaciones' : 'habitación';
};
const getBarhRoomWord = (bathroom) => {
    return bathroom > 1 ? 'baños' : 'baño';
};

const getPropertyEquipments = (equipments, propertypEquips) => {
    const equipmentList = propertypEquips.map(propertypEquip => {
        return equipments.find(equipment => equipment.id === propertypEquip).name;
    })
    return equipmentList;
};