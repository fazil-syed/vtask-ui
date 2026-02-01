import { notification } from "antd";

export let notificationApi = null;

export function NotificationProvider({ children }) {
  const [api, contextHolder] = notification.useNotification({
    placement: "topRight",
  });

  // expose AFTER first render
  notificationApi = api;

  return (
    <>
      {contextHolder}
      {children}
    </>
  );
}
