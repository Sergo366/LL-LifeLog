import { formNames } from '@/app/(auth)/login/const';
import { fetchClient } from '@/services/api-client';

type Params = {
	[formNames.login]: string;
	[formNames.password]: string;
};

export const loginUser = async (params: Params) => {
	return fetchClient('/auth/sign-in', {
		method: 'POST',
		body: JSON.stringify(params),
	});
};
