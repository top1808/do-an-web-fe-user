export const validatePhoneNumber = (rule: any, value: string): Promise<void | string> => {
	if (!value || value.trim() === '') {
		return Promise.resolve();
	}
	// Regular expression for 10-12 digit phone numbers starting with 0 or +84
	const phoneRegex = /^(0|\+84)\d{9,11}$/;

	if (!phoneRegex.test(value)) {
		return Promise.reject('Please enter a valid phone number !');
	}
	return Promise.resolve();
};
export const validateEmail = (rule: any, value: string): Promise<void | string> => {
	if (!value || value.trim() === '') {
		return Promise.resolve(); // Don't validate if empty
	}
	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

	if (!emailRegex.test(value)) {
		return Promise.reject('Please enter a valid email address (e.g., top@example.com)');
	}
	return Promise.resolve();
};
