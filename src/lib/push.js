export async function subscribeUser() {
  if (!("serviceWorker" in navigator)) {
    console.log("Service worker not supported");
    return;
  }
  if (!("PushManager" in window)) {
    console.log("push not supported");
    return;
  }
  if (Notification.permission === "granted") {
    console.log("Already subscribed");
    return;
  }

  if (Notification.permission === "denied") {
    console.log("User blocked notifications");
    return;
  }
  const registration = await navigator.serviceWorker.ready;

  const permission = await Notification.requestPermission();
  if (permission !== "granted") {
    console.log("Permission denied");
    return;
  }

  const subscription = await registration.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: urlBase64ToUint8Array(
      import.meta.env.VITE_VAPID_PUBLIC,
    ),
  });

  await fetch(`${import.meta.env.VITE_API_BASE}/push/subscribe`, {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },

    body: JSON.stringify(subscription),
  });
}

function urlBase64ToUint8Array(base64String) {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);

  const base64 = (base64String + padding).replace(/-/g, "+").replace(/_/g, "/");

  const rawData = atob(base64);

  return Uint8Array.from([...rawData].map((char) => char.charCodeAt(0)));
}
