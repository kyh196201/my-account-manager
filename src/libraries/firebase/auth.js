import { GoogleAuthProvider, getAuth, signInWithRedirect } from 'firebase/auth';

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

export { googleSignIn };

export { onAuthStateChanged } from 'firebase/auth';

export default auth;
