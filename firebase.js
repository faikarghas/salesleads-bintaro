// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getMessaging, getToken } from 'firebase/messaging';

// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyBs16zd9-oa0TWr_Vni5IRSInRU3uvF630",
//   authDomain: "next-push.firebaseapp.com",
//   projectId: "next-push",
//   storageBucket: "next-push.appspot.com",
//   messagingSenderId: "228236797103",
//   appId: "1:228236797103:web:b1c779becc9c762a3c605a"
// };

// // Initialize Firebase
// export const firebaseInit = () => initializeApp(firebaseConfig);

// export async function getFCMToken() {
//     try {
//         // Don't forget to paste your VAPID key here
// 		// (you can find it in the Console too)
//         const messaging = getMessaging();
//         const token = await getToken(messaging,{ vapidKey: 'BM6PjGd7cIq0BLw6YqOqFctkCxkOJ4g3tPKzFFyLcTmONezjGaqWPh-4BU94k2tBcwyf9ZQz62CD5bbxeGEoclA' });
//         return token;
//     } catch (e) {
//         console.log('getFCMToken error', e);
//         return undefined
//     }
// }