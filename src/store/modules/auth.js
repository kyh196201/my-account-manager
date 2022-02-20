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
		 */
		user: null,
		providerId: '', // 'google.com'
	}),
	getters: {
		isAuthenticated: state => !!state.user,
	},
	mutations: {
		SET_USER(state, user) {
			const { email, accessToken, photoURL } = user;
			state.user = {
				email,
				accessToken,
				photoURL,
			};
		},

		SET_PROVIDER_ID(state, providerId) {
			state.providerId = providerId;
		},
	},
	actions: {
		// 구글 로그인
		GOOGLE_SIGNIN() {
			return googleSignIn();
		},

		SET_AUTH({ commit }, userCredential) {
			if (!userCredential) return;

			commit('SET_USER', userCredential.user);
			commit('SET_PROVIDER_ID', userCredential.providerId);
		},
	},
};
