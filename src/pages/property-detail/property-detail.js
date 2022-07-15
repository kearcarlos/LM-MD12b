import { history } from '../../core/router/history';
import { getPropertyDetails, getEquipments, insertConstactsDates } from './property-details.api';
import { setPropertyValues } from './property-detail.helpers';
import { mapDetailsFromApiToViewModel } from './property-detail.mapper';
import { onUpdateField, onSubmitForm, onSetError, onSetFormErrors } from '../../common/helpers/element.helpers';
import { formValidation } from './property-details.validation';

const params = history.getParams();
const isId = Boolean(params.id);

if (isId) {
    Promise.all([getEquipments(), getPropertyDetails(params.id)]).then(([equipments, details]) => {
        const detailsProperty = mapDetailsFromApiToViewModel(equipments, details);
        console.log(detailsProperty);
        setPropertyValues(detailsProperty);
    });
};

let contactsDates = {
    email: '',
    message: '',
};

onUpdateField('email', (event) => {
    const value = event.target.value;
    contactsDates = {
        ...contactsDates,
        email: value,
    };
    formValidation.validateField('email', contactsDates.email).then(result => {
        onSetError('email', result);
    });
});

onUpdateField('message', (event) => {
    const value = event.target.value;
    contactsDates = {
        ...contactsDates,
        message: value,
    };
    formValidation.validateField('message', contactsDates.message).then(result => {
        onSetError('message', result);
    });
});

onSubmitForm('contact-button', () => {
    formValidation.validateForm(contactsDates).then(result => {
        console.log(contactsDates);
        onSetFormErrors(result);
        if (result.succeeded) {
            insertConstactsDates(contactsDates).then(apiTransfer => {
                history.back();
            });
        }
    });
});