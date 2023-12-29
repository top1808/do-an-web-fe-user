// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
	apiKey: 'AIzaSyB64kFtwaXYBwjh13h0YgRHKlufJsPPRHc',
	authDomain: 'do-an-web-7e477.firebaseapp.com',
	projectId: 'do-an-web-7e477',
	storageBucket: 'do-an-web-7e477.appspot.com',
	messagingSenderId: '542018707616',
	appId: '1:542018707616:web:31bfafc0fe1e7b826629c5',
	measurementId: 'G-D2RCS7H75K',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
