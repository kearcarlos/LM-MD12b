import {
    setCheckboxList,
    setOptionList,
    onAddFeature,
    onRemoveFeature,
    onAddImage,
} from './upload-property.helpers';
import { getSaleTypeList } from '../property-list/property-list.api'
import { getEquipmentsList, getProvincesList, insertPropertyList } from './upload-property.api'
import { onSubmitForm, onUpdateField, onAddFile, onSetError, onSetFormErrors } from '../../common/helpers/element.helpers';
import { formValidation } from './upload-property.validation';
let datesProperty = {
    id: '',
    title: '',
    notes: '',
    email: '',
    phone: '',
    price: '',
    saleTypes: [],
    address: '',
    city: '',
    provinceId: '',
    squareMeter: '',
    rooms: '',
    bathrooms: '',
    locationUrl: '',
    mainFeatures: [],
    equipmentIds: '',
    images: '',
};
Promise.all([
    getSaleTypeList(),
    getProvincesList(),
    getEquipmentsList()])
    .then(([saleTypeList, provincesList, equipmentsList]) => {
        setCheckboxList(saleTypeList, 'saleTypes');
        addSaleTypes(saleTypeList);
        setOptionList(provincesList, 'province');
        setCheckboxList(equipmentsList, 'equipments');
        addEquiments(equipmentsList);
    });

const addSaleTypes = saleTypeList => {
    saleTypeList.forEach(saleType => {
        onUpdateField(`${saleType.id}-${saleType.name}`, () => {
            const isChecked = document.getElementById(`${saleType.id}-${saleType.name}`);
            if (isChecked.checked) {
                datesProperty = {
                    ...datesProperty,
                    saleTypes: [...datesProperty.saleTypes, saleType.id],
                }
            } else {
                const index = datesProperty.saleTypes.indexOf(saleType.id);
                datesProperty.saleTypes.splice(index, 1);
            };
        }
        );
    });
}
const addEquiments = equipmentsList => {
    equipmentsList.forEach(equipment => {
        onUpdateField(`${equipment.id}-${equipment.name}`, () => {
            const isChecked = document.getElementById(`${equipment.id}-${equipment.name}`);
            if (isChecked.checked) {
                datesProperty = {
                    ...datesProperty,
                    equipmentIds: [...datesProperty.equipmentIds, equipment.id],
                }
            } else {
                const index = datesProperty.equipmentIds.indexOf(equipment.id);
                datesProperty.equipmentIds.splice(index, 1);
            };
        });
    });
}


onUpdateField('title', (event) => {
    const value = event.target.value;
    datesProperty = {
        ...datesProperty,
        title: value,
    }
    formValidation.validateField('title', datesProperty.title).then(result => {
        onSetError('title', result);
    });
});

onUpdateField('notes', (event) => {
    const value = event.target.value;
    datesProperty = {
        ...datesProperty,
        notes: value,
    }
    formValidation.validateField('notes', datesProperty.notes).then(result => {
        onSetError('notes', result);
    });
});

onUpdateField('email', (event) => {
    const value = event.target.value;
    datesProperty = {
        ...datesProperty,
        email: value,
    }
    formValidation.validateField('email', datesProperty.email).then(result => {
        onSetError('email', result);
    });
});


onUpdateField('phone', (event) => {
    const value = event.target.value;
    datesProperty = {
        ...datesProperty,
        phone: value,
    }
    formValidation.validateField('phone', datesProperty.phone).then(result => {
        onSetError('phone', result);
    });
});

onUpdateField('price', (event) => {
    const value = event.target.value;
    datesProperty = {
        ...datesProperty,
        price: Number(value),
    }
    formValidation.validateField('price', datesProperty.price).then(result => {
        onSetError('price', result);
    });
});

onUpdateField('address', (event) => {
    const value = event.target.value;
    datesProperty = {
        ...datesProperty,
        address: value,
    }
    formValidation.validateField('address', datesProperty.address).then(result => {
        onSetError('address', result);
    });
});

onUpdateField('city', (event) => {
    const value = event.target.value;
    datesProperty = {
        ...datesProperty,
        city: value,
    }
    formValidation.validateField('city', datesProperty.city).then(result => {
        onSetError('city', result);
    });
});

onUpdateField('province', () => {
    const idprovince = document.getElementById('province').value;
    datesProperty = {
        ...datesProperty,
        provinceId: idprovince,
    }
    formValidation.validateField('province', datesProperty.province).then(result => {
        onSetError('province', result);
    });
});

onUpdateField('squareMeter', (event) => {
    const value = event.target.value;
    datesProperty = {
        ...datesProperty,
        squareMeter: value,
    }
    formValidation.validateField('squareMeter', datesProperty.squareMeter).then(result => {
        onSetError('squareMeter', result);
    });
});

onUpdateField('rooms', (event) => {
    const value = event.target.value;
    datesProperty = {
        ...datesProperty,
        rooms: value,
    }
    formValidation.validateField('rooms', datesProperty.rooms).then(result => {
        onSetError('rooms', result);
    });
});

onUpdateField('bathrooms', (event) => {
    const value = event.target.value;
    datesProperty = {
        ...datesProperty,
        bathrooms: value,
    }
    formValidation.validateField('bathrooms', datesProperty.bathrooms).then(result => {
        onSetError('bathrooms', result);
    });
});

onUpdateField('locationUrl', (event) => {
    const value = event.target.value;
    datesProperty = {
        ...datesProperty,
        locationUrl: value,
    }
    formValidation.validateField('locationUrl', datesProperty.locationUrl).then(result => {
        onSetError('locationUrl', result);
    });
});

onSubmitForm('insert-feature-button', () => {
    const feature = document.getElementById('newFeature').value;
    datesProperty = {
        ...datesProperty,
        mainFeatures: [...datesProperty.mainFeatures, feature],
    }
    onAddFeature(feature);
    onSubmitForm(`delete-${feature}-button`, () => {
        onRemoveFeature(feature);

        const index = datesProperty.mainFeatures.indexOf(feature);
        datesProperty.mainFeatures.splice(index, 1);
    })
});
onUpdateField("add-image", () => {
    const photoFile = document.getElementById('add-image').value;
    console.log(photoFile);
    onAddFile('add-image', (photoFile) => {
        onAddImage(photoFile);
        return (datesProperty = {
            ...datesProperty,
            images: [...datesProperty.images, photoFile],
        }
        );
    });
});


onSubmitForm('save-button', () => {
    formValidation.validateForm(datesProperty).then(result => {
        console.log(datesProperty);
        onSetFormErrors(result);
        if (result.succeeded) {
            console.log(datesProperty);
            insertPropertyList(datesProperty).then(apiTransfer => {
                history.back();
            });
        }
    });
});







