import * as yup from 'yup';

const requiredMessage = 'This field is required';

const locationSchema = yup.object().shape({
	location_name: yup.string().required(requiredMessage),
	latitude: yup
		.number()
		.required(requiredMessage)
		.min(-90, 'Latitude must be between -90 and 90')
		.max(90, 'Latitude must be between -90 and 90'),
	longitude: yup
		.number()
		.required(requiredMessage)
		.min(-180, 'Longitude must be between -180 and 180')
		.max(180, 'Longitude must be between -180 and 180'),
});

export const validateLocationSchema = async (payload: any) => {
	try {
		await locationSchema.validate(payload, { abortEarly: false });
		return null;
	} catch (error: unknown) {
		if (error instanceof yup.ValidationError) {
			const errors = error.inner.reduce((acc: Record<string, string>, err) => {
				if (err.path) {
					acc[err.path] = err.message;
				}
				return acc;
			}, {});
			return errors;
		}
		return null;
	}
};
