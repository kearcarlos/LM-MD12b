import Axios from 'axios';

const url = `${process.env.BASE_API_URL}/properties`;

export const getPropertyDetails = (id) =>
    Axios.get(`${url}/${id}`).then(response => {
        return response.data;
    });

const urlEquipment = `${process.env.BASE_API_URL}/equipments`;

export const getEquipments = () =>
    Axios.get(urlEquipment).then(response => {
        return response.data;
    });

const urlContact = `${process.env.BASE_API_URL}/contact`

export const insertConstactsDates = (contactsDates) => Axios.post(`${urlContact}`, contactsDates).then(response => {
    return response.data;
});