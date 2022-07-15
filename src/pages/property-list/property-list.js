import {
    getPropertyList,
    getSaleTypeList,
    getProvinceList
} from './property-list.api';
import { mapFilterToQueryParams, mapPropertyListFromApiToViewModel } from './property-list.mappers';
import { addPropertyRows, setOptions, clearPropertyRows } from './property-list.helpers';
import {
    roomOptions,
    bathroomOptions,
    minPriceOptions,
    maxPriceOptions
} from './property-list.constants';
import { onUpdateField, onSubmitForm } from '../../common/helpers/element.helpers';

Promise.all([
    getPropertyList(),
    getSaleTypeList(),
    getProvinceList(),
]).then(([propertyList, saleTypeList, provinceList]) => {
    // lo de arriba se descompone aquí:
    // then(resultList => {
    //     const propertyList = resultList[0];
    //     const saleTypeList = resultList[1];
    //     const provinceList = resultList[2];
    //      una forma mas legible de lo de arriba la ponemos abajo y quitamos nombrar variables por separado
    // const [propertyList, saleTypeList, provinceList] = resultList; // usando detructurin
    loadPropertyList(propertyList);
    setOptions(saleTypeList, 'select-sale-type', '¿Qué venta?');
    setOptions(provinceList, 'select-province', '¿Dónde?');
    setOptions(roomOptions, 'select-room', '¿Habitaciones?');
    setOptions(bathroomOptions, 'select-bathroom', '¿Cuántos baños?');
    setOptions(minPriceOptions, 'select-min-price', 'Min (EUR)');
    setOptions(maxPriceOptions, 'select-max-price', 'Max (EUR)');
});

const loadPropertyList = propertyList => {
    const viewModelPropertyList = mapPropertyListFromApiToViewModel(propertyList);
    addPropertyRows(viewModelPropertyList);
};

let filter = {
    saleTypeId: '',
    provinceId: '',
    minRooms: '',
    minBathrooms: '',
    minPrice: '',
    maxPrice: '',
};
//hacer una función que simplifique lo de abajo
onUpdateField('select-sale-type', (event) => {
    const value = event.target.value;
    filter = {
        ...filter,
        saleTypeId: value,
    };
});
onUpdateField('select-province', (event) => {
    const value = event.target.value;
    filter = {
        ...filter,
        provinceId: value,
    };
});
onUpdateField('select-room', (event) => {
    const value = event.target.value;
    filter = {
        ...filter,
        minRooms: value,
    };
});
onUpdateField('select-bathroom', (event) => {
    const value = event.target.value;
    filter = {
        ...filter,
        minBathrooms: value,
    };
});
onUpdateField('select-min-price', (event) => {
    const value = event.target.value;
    filter = {
        ...filter,
        minPrice: value,
    };
});
onUpdateField('select-max-price', (event) => {
    const value = event.target.value;
    filter = {
        ...filter,
        maxPrice: value,
    };
});

onSubmitForm('search-button', () => {
    const queryParams = mapFilterToQueryParams(filter);
    clearPropertyRows();
    getPropertyList(queryParams).then(propertyList => {
        loadPropertyList(propertyList);
    });
});