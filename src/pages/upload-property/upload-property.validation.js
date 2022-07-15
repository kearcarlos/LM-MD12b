import { Validators, createFormValidation } from "@lemoncode/fonk";
import { isNumber } from '@lemoncode/fonk-is-number-validator';
import { isUrl } from '@lemoncode/fonk-is-url-validator';
import { arrayRequired } from '@lemoncode/fonk-array-required-validator';

const validationSchema = {
    field: {
        title: [{
            validator: Validators.required,
            message: 'Campo requerido',
        },
        {
            validator: Validators.maxLength,
            customArgs: { length: 60 },
            message: 'Hay un máximo de 60 caracteres',
        },],
        notes: [{
            validator: Validators.required,
            message: 'Campo requerido',
        },
        {
            validator: Validators.maxLength,
            customArgs: { length: 300 },
            message: 'Hay un máximo de 300 caracteres',
        },
        ],
        email: [{
            validator: Validators.required,
            message: 'Campo requerido',
        },
        {
            validator: Validators.email,
            message: 'Email no válido',
        }
        ],
        phone: [{
            validator: Validators.required,
            message: 'Campo requerido',
        },
        {
            validator: Validators.pattern,
            customArgs: { pattern: new RegExp(/^[679]{1}[0-9]{8}$/) },
            message: 'El número introducido es incorrecto',
        },
        ],
        price: [{
            validator: Validators.required,
            message: 'Campo requerido',
        },
        {
            validator: isNumber.validator,
            message: 'Debe introducir un número',
        },
        ],
        address: [{
            validator: Validators.required,
            message: 'Campo requerido',
        },
        {
            validator: Validators.maxLength,
            customArgs: { length: 75 },
            message: 'Hay un máximo de 75 caracteres',
        },
        ],
        city: [{
            validator: Validators.required,
            message: 'Campo requerido',
        },
        {
            validator: Validators.maxLength,
            customArgs: { length: 40 },
            message: 'Hay un máximo de 40 caracteres',
        },
        ],
        squareMeter: [{
            validator: Validators.required,
            message: 'Campo requerido',
        }, {
            validator: isNumber.validator,
            message: 'Debe introducir un número',
        }],
        rooms: [{
            validator: Validators.required,
            message: 'Campo requerido',
        }, {
            validator: isNumber.validator,
            message: 'Debe introducir un número',
        }],
        bathrooms: [{
            validator: Validators.required,
            message: 'Campo requerido',
        }, {
            validator: isNumber.validator,
            message: 'Debe introducir un número',
        }],
        locationUrl: [{
            validator: Validators.required,
            message: 'Campo requerido',
        },
        {
            validator: isUrl.validator,
            message: 'Debe introducir una url válida',
        },
        ],
        saleTypes: [{
            validator: arrayRequired.validator,
            customArgs: { minLength: 1, maxLength: 4 },
            message: 'Debe seleccionar al menos una opción',
        },

        ],
    },
};
export const formValidation = createFormValidation(validationSchema);