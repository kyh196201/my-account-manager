import {
	GoogleAuthProvider,
	getAuth,
	signInWithRedirect,
	getRedirectResult,
} from 'firebase/auth';

import app from '.';

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

/**
 * SNS 로그인 리다이렉트 이벤트 핸들러
 * @param {function} handleSuccess
 * @param {function} handleError
 */
function handleRedirect(handleSuccess, handleError) {
	getRedirectResult(auth)
		.then(result => {
			if (!result) return;

			handleSuccess(result);
		})
		.catch(error => {
			handleError(error);
		});
}

export { googleSignIn, handleRedirect };

export default auth;
