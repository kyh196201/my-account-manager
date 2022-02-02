// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getDatabase } from 'firebase/database';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
	apiKey: 'AIzaSyDKFMjbuq2WLvmS9BM2UaDBH4NcBtRHg58',
	authDomain: 'my-account-manager-1b89f.firebaseapp.com',
	databaseURL:
		'https://my-account-manager-1b89f-default-rtdb.asia-southeast1.firebasedatabase.app',
	projectId: 'my-account-manager-1b89f',
	storageBucket: 'my-account-manager-1b89f.appspot.com',
	messagingSenderId: '230912335992',
	appId: '1:230912335992:web:1a0e398af69ee615888d8d',
	measurementId: 'G-WMLHLV4CR2',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const database = getDatabase(app);

export default app;

export { database, analytics };
