import { store } from "./app/store/store";
import { baseApi } from "./services/baseApi";

export function startServerSentEventListener() {
  var stream = new EventSource(
    `${import.meta.env.VITE_API_BASE}/tasks/stream`,
    {
      withCredentials: true,
    },
  );

  stream.onopen = function (event) {
    console.log(event);
  };
  stream.onmessage = function (event) {
    console.log(event);
    let eventData = event?.data;
    if (eventData) {
      console.log(eventData);
      eventData = JSON.parse(eventData);

      const type = eventData?.type;

      if (["TASK_UPDATED", "TASK_CREATED", "TASK_DELETED"].includes(type)) {
        store.dispatch(baseApi.util.invalidateTags(["Tasks"]));
      }
    }
    // alert(event?.data);
  };

  stream.onerror = function (event) {
    console.log(event);
    stream.close();
  };
}
