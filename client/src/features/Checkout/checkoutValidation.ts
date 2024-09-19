import * as yup from 'yup';

export const ValidationSchema = [
    yup.object(
        {
            fullName : yup.string().required("fullname is required"),
            address1 : yup.string().required("address1 is required"),
            address2 : yup.string().required("address2 is necessary"),
            city : yup.string().required("city is required"),
            state : yup.string().required("state is required"),
            zipCode : yup.string().required("zipcode is required"),
            country : yup.string().required("country is required"),
        }
    ),
    yup.object(),
    yup.object(
        {
            nameOnCard:yup.string().required("Name is Required")
        }
    )
]