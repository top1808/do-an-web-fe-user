interface FormLogin {
	email?: string;
	password?: string;
	remember?: boolean;
}

interface FormRegister extends FormLogin {
	id?: string;
	email?: string;
	name?: string;
	image?: string;
}

export type { FormLogin, FormRegister };
