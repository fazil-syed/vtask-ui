import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import App from "./App.jsx";
import { store } from "./app/store/store.js";
import "./index.css";

if ("servieWorker" in navigator) {
  window.addEventListener("load", async () => {
    const reg = await navigator.serviceWorker.register("/service-worker.js");
    reg.update();
    let refreshing = false;
    navigator.serviceWorker.addEventListener("controllerchange", () => {
      if (refreshing) return;
      refreshing = true;
      window.location.reload();
    });
    // reg.addEventListener("updatefound", () => {
    //   const newWorker = reg.installing;

    //   newWorker.addEventListener("statechange", () => {
    //     if (newWorker.state == "activated") {
    //       window.location.reload();
    //     }
    //   });
    // });
  });
}

var stream = new EventSource(`${import.meta.env.VITE_API_BASE}/tasks/stream`, {
  withCredentials: true,
});

stream.onopen = function (event) {
  console.log(event);
};
stream.onmessage = function (event) {
  console.log(event);
  alert(event?.data);
};

stream.onerror = function (event) {
  console.log(event);
  stream.close();
};

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>,
);
