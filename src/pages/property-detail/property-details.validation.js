import { Validators, createFormValidation } from "@lemoncode/fonk";

const validationSchema = {
    field: {
        email: [{
            validator: Validators.required,
            message: 'Campo requerido',
        },
        {
            validator: Validators.email,
            message: 'Email no válido',
        }
        ], // Es solo un validador indicando que es un campo requerido.
        message: [{
            validator: Validators.required,
            message: 'Campo requerido',
        },
        {
            validator: Validators.maxLength,
            customArgs: { length: 100 },
        },
        ],      // Es solo un validador indicando que es un campo requerido.

    },
};
export const formValidation = createFormValidation(validationSchema);