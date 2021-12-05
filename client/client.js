const publicVapidKey = 'BDnTbgNtPOdS0xB4HUbBQv6tCZaKToXfFz0_kqYbP5F_EgEuOcfajHkfhc3QcGhT-1KEDwm3R0Bvloq3Cv8fBGA';
function urlBase64ToUint8Array(base64String) {
    const padding = "=".repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding)
      .replace(/\-/g, "+")
      .replace(/_/g, "/");
  
    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);
  
    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
}
//check if the serveice worker can work in the current browser
if('serviceWorker' in navigator){
    send().catch(err => console.error(err));
}

const requestNotificationPermission = async () => {
    // value of permission can be 'granted', 'default', 'denied'
    // granted: user has accepted the request
    // default: user has dismissed the notification permission popup by clicking on x
    // denied: user has denied the request.
  };

//register the service worker, register our push api, send the notification
async function send(){

    const permission = await window.Notification.requestPermission();
    if (permission !== "granted") {
        throw new Error("Permission not granted for Notification");
    }
  
    //register service worker
    const register = await navigator.serviceWorker.register('service.js', {
        scope: '/'
    });

    //register push
    const subscription = await register.pushManager.subscribe({
        userVisibleOnly: true,

        //public vapid key
        applicationServerKey: publicVapidKey
    });
   
    //Send push notification
    await fetch("/subscribe", {
        method: "POST",
        body: JSON.stringify(subscription),
        headers: {
            "content-type": "application/json"
        }
    });
}