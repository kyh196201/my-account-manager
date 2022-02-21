/**
 * 사용자 인증 스토어 모듈
 */
import { googleSignIn } from '@/libraries/firebase/auth';

export default {
	namespaced: true,

	state: () => ({
		/**
		 * accessToken: string;
		 * email: stringl
		 * photoUrl: string;
		 * uid: string
		 */
		user: null,
		authProvider: '', // 'google.com'
	}),
	getters: {
		isAuthenticated: state => !!state.user?.accessToken,
	},
	mutations: {
		SET_USER(state, userCredential) {
			const { email, accessToken, photoURL, uid } = userCredential;
			state.user = {
				email,
				accessToken,
				photoURL,
				uid,
			};
		},

		SET_AUTH_PROVIDER(state, providerData) {
			const provider = providerData[0];

			state.authProvider = provider.providerId;
		},
	},
	actions: {
		// 구글 로그인
		GOOGLE_SIGNIN() {
			return googleSignIn();
		},

		SET_AUTH({ commit }, userCredential) {
			if (!userCredential) return;

			commit('SET_USER', userCredential);

			if (userCredential.providerData?.length) {
				commit('SET_AUTH_PROVIDER', userCredential.providerData);
			}
		},
	},
};
