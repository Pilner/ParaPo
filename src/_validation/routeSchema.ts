import * as yup from 'yup';

const requiredMessage = 'This field is required';

const routeSchema = yup.object().shape({
	route_name: yup.string().required(requiredMessage),
	category: yup.string().required(requiredMessage),
	min_fare: yup.number().required(requiredMessage),
});

export const validateRouteSchema = async (payload: any) => {
	try {
		await routeSchema.validate(payload, { abortEarly: false });
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
