import { firebase } from '@firebase/app'
import '@firebase/auth';
import '@firebase/firestore';
import '@firebase/functions';
import '@firebase/storage';

const firebaseConfig = {
	apiKey: "AIzaSyB7B0QvMmDoDw5muUyMI2G_0DtEYjBf2Go",
	authDomain: "confit-2022.firebaseapp.com",
	projectId: "confit-2022",
	storageBucket: "confit-2022.appspot.com",
	messagingSenderId: "863163818662",
	appId: "1:863163818662:web:2393a98bd91f55725cca67",
	measurementId: "G-K6KYW2THRC"  
};
  

if (!firebase?.apps?.length) {
    firebase.initializeApp(firebaseConfig);
}

export { firebase };
