import { GoogleAuthProvider, getAuth, signInWithRedirect } from 'firebase/auth';

import app from '.';

import store from '@/store';
import router from '@/router';

const auth = getAuth(app);

// 인증 제공업체
const providers = {
	google: new GoogleAuthProvider(),
};

auth.languageCode = 'it';

// 구글 로그인
function googleSignIn() {
	return signInWithRedirect(auth, providers.google);
}

export { googleSignIn };

export { onAuthStateChanged } from 'firebase/auth';

// 사용자 로그인 여부 체크
const unsubscribe = auth.onAuthStateChanged(async user => {
	unsubscribe();

	if (user) {
		store.dispatch('auth/SET_AUTH', user);

		const { rPath } = router.currentRoute.query;

		await router.push({
			name: rPath || 'Daily',
		});

		store.commit('END_LOADING');

		await store.dispatch('transactions/GET_TRANSACTIONS');
	} else {
		store.commit('END_LOADING');
	}
});

export default auth;
