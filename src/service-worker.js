/// <reference lib="WebWorker" />
/// <reference types="vite/client" />
import {
  cleanupOutdatedCaches,
  createHandlerBoundToURL,
  precacheAndRoute,
} from "workbox-precaching";
import { NavigationRoute, registerRoute } from "workbox-routing";

const entries = self.__WB_MANIFEST;

precacheAndRoute(entries);

self.addEventListener("message", (event) => {
  if (event.data && event.data.type === "SKIP_WAITING") self.skipWaiting();
});

cleanupOutdatedCaches();
if (import.meta.env.PROD) {
  // to allow work offline
  registerRoute(new NavigationRoute(createHandlerBoundToURL("index.html")));
}
self.addEventListener("push", onPush);
self.addEventListener("notificationclick", onNotificationClick);

export function onPush(event) {
  console.log("[Service Worker] Push Received.");

  if (event.data) {
    const { title, ...rest } = event.data.json();

    event.waitUntil(
      self.registration.showNotification(title, {
        ...rest,
      })
    );
  }
}

export function onNotificationClick(event) {
  const reactToNotificationClick = new Promise((resolve) => {
    event.notification.close();
    resolve(openUrl(event.notification.data.url));
  });

  event.waitUntil(reactToNotificationClick);
}

function findBestClient(clients) {
  const focusedClient = clients.find((client) => client.focused);
  const visibleClient = clients.find(
    (client) => client.visibilityState === "visible"
  );

  return focusedClient || visibleClient || clients[0];
}

async function openUrl(url) {
  const clients = await self.clients.matchAll({ type: "window" });
  // Chrome 42-48 does not support navigate
  if (clients.length !== 0 && "navigate" in clients[0]) {
    const client = findBestClient(clients);
    await client.navigate(url).then((client) => client?.focus());
  }

  await self.clients.openWindow(url);
}
