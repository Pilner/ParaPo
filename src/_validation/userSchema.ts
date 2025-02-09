import * as yup from 'yup';

const requiredMessage = 'This field is required';

const userSchema = yup.object().shape({
	username: yup.string().required(requiredMessage).matches(/^\S*$/, 'Username must not contain spaces'),
	password: yup
		.string()
		.required(requiredMessage)
		.oneOf([yup.ref('confirmPassword')], 'Passwords must match'),
	confirmPassword: yup
		.string()
		.required(requiredMessage)
		.oneOf([yup.ref('password')], 'Passwords must match'),
});

export const validateUserSchema = async (payload: any) => {
	try {
		await userSchema.validate(payload, { abortEarly: false });
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
