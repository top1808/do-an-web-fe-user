interface FormLogin {
	email?: string;
	password?: string;
	remember?: boolean;
}

interface FormChangePassword {
	password?: string;
	newPassword?: string;
	confirmPassword?: string;
}

interface FormRegister extends FormLogin {
	id?: string;
	email?: string;
	name?: string;
	image?: string;
}

export type { FormLogin, FormRegister, FormChangePassword };
