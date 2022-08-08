// import firebase from 'firebase/app'
// import 'firebase/messaging'

// // For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
// 	apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
// 	authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
// 	projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
// 	storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
// 	messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
// 	appId: process.env.REACT_APP_FIREBASE_APP_ID,
// 	measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
// }
// firebase.initializeApp(firebaseConfig)

// export const messaging = firebase.messaging()

// export const getToken = async setTokenFound => {
// 	let currentToken = ''

// 	try {
// 		currentToken = await messaging.getToken({
// 			vapidKey: process.env.REACT_APP_FIREBASE_VAPID_KEY,
// 		})
// 		if (currentToken) {
// 			setTokenFound(true)
// 		} else {
// 			setTokenFound(false)
// 		}
// 	} catch (error) {
// 		console.log('An error occurred while retrieving token. ', error)
// 	}

// 	return currentToken
// }

// export const onMessageListener = () =>
// 	new Promise(resolve => {
// 		console.log('run on message in firebase init')
// 		messaging.onMessage(payload => {
// 			resolve(payload)
// 		})
// 	})
