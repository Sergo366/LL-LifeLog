import { formNames } from '@/app/(auth)/login/const';
import { hostUrl } from '@/services/const';

type Params = {
	[formNames.login]: string;
	[formNames.password]: string;
};

export const loginUser = async (params: Params) => {
	const response = await fetch(`${hostUrl}/auth/login`, {
		method: 'POST',
		body: JSON.stringify(params),
	});

	if (!response.ok) {
		const errorBody = await response.json();
		throw new Error(errorBody.message || 'Ошибка авторизации');
	}
	return response.json();
};
