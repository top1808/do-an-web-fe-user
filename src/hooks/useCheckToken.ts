import axios from 'axios';
import { useCallback, useEffect, useState } from 'react';
import { toast } from 'react-toastify';

const useCheckToken = (token: string) => {
	const [response, setResponse] = useState<any>(null);

	const checkToken = useCallback(async () => {
		try {
			const res = await axios.get(process.env.API_URL + `auth/verify-email/${token}`);
			if (res) {
				setResponse(res);
				toast.success('Xác thực email thành công.');
			}
		} catch (err: any) {
			toast.error('Token không hợp lệ.');
		}
		window.location.assign('/login');
	}, [token]);

	useEffect(() => {
		checkToken();
	}, [checkToken, token]);

	return response;
};

export default useCheckToken;
