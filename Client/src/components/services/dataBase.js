import axios from 'axios';

export default class DataBase {
	start = async () => {
		const res = await axios({
			method: 'post',
			url: '/',
		});

		if (res.status !== 200) {
			throw new Error('DataBase start failed');
		}
	}
}