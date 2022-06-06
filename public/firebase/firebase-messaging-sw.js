// It's a static script file, so it won't be covered by a module bundling system
// hence, it uses "importScripts" function to load the other libs
importScripts('https://www.gstatic.com/firebasejs/8.2.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.2.0/firebase-messaging.js');



// Replace the values with yours
const firebaseConfig = {
    apiKey: "AIzaSyBs16zd9-oa0TWr_Vni5IRSInRU3uvF630",
    authDomain: "next-push.firebaseapp.com",
    projectId: "next-push",
    storageBucket: "next-push.appspot.com",
    messagingSenderId: "228236797103",
    appId: "1:228236797103:web:b1c779becc9c762a3c605a"
  };



    firebase.initializeApp(firebaseConfig);

    const messaging = firebase.messaging();


    self.addEventListener('notificationclick', (event) => {
        event.notification.close()

        const pathname = event.notification?.data?.FCM_MSG?.notification?.data?.link
        if (!pathname) return
        const url = new URL(pathname, self.location.origin).href

        event.waitUntil(
            self.clients
                .matchAll({ type: 'window', includeUncontrolled: true })
                .then((clientsArr) => {
                    const hadWindowToFocus = clientsArr.some((windowClient) =>
                        windowClient.url === url ? (windowClient.focus(), true) : false
                    )

                    if (!hadWindowToFocus)
                        self.clients
                            .openWindow(url)
                            .then((windowClient) =>
                                windowClient ? windowClient.focus() : null
                            )
                })
        )
    })

    messaging.onBackgroundMessage(function(payload) {

        const notificationTitle = payload.notification.title;
        const notificationOptions = {
            body: payload.notification.body,
        };

        self.cookieStore.get('token').then(val=>{
            if (val !== null) {
                self.registration.showNotification(notificationTitle,notificationOptions);
                console.log('Received background message ', payload);
            }
        })


    });


