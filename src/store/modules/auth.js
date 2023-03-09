/**
 * 사용자 인증 스토어 모듈
 */
import { googleSignIn, signOut } from '@/libraries/firebase/auth';

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

		userUID: state => state.user?.uid,
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

		SIGN_OUT(state) {
			state.user = null;
			state.authProvider = '';
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

		SIGN_OUT() {
			return signOut().catch(() => {
				Promise.reject(new Error('sign out failed'));
			});
		},
	},
};
