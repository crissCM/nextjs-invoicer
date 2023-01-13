import React, { useEffect, useMemo, useState } from "react";
import { Toast } from "react-bootstrap";
import styled from "styled-components";
import { Alert, removeNotification } from "../../state";
import { notificationTitle } from "../../utils";

const Notification = styled((props: NotificationProps) => {
  const { error, notification } = props;
  const [showNoti, setShowNoti] = useState(true);

  const msg = useMemo(() => {
    if (typeof notification === "string") return notification;
    if ((notification as Alert).msg) return notification?.msg;
    return "";
  }, []);

  const toggleShowNoti = () => setShowNoti(!showNoti);

  return (
    <Toast
      className="mb-2"
      show={showNoti}
      bg={`${error ? "warning" : "info"}`}
      onClose={toggleShowNoti}>
      <Toast.Header>
        <img src="noti-icon.png" className="rounded me-2" alt="" />
        <strong className="text-dark me-auto">{notificationTitle}</strong>
        <small className="text-muted">{`${error ? "Error" : "Info"}`}</small>
      </Toast.Header>
      <Toast.Body>
        <span className="text-dark">{msg}</span>
      </Toast.Body>
    </Toast>
  );
})``;

export default Notification;

export const AutoDismissNotification = styled((props: ADNProps) => {
  const { timeout = 5000, className, notification } = props;
  const [state, setState] = useState<ADNState>({
    timeout: null,
    class: `${className || ""} slide-in-left`,
  });
  const clear = () => {
    if (state.timeout) clearTimeout(state.timeout as NodeJS.Timeout);
    removeNotification(props.notification as Alert);
  };
  const animate = () => {
    clearTimeout(state.timeout as NodeJS.Timeout);
    setState({ class: `${className || ""} slide-out-left` });
    setTimeout(clear, 500);
  };

  useEffect(() => {
    if (state.timeout !== null) return;
    setState({ timeout: setTimeout(animate, timeout) });
  }, [state.class]);

  return (
    <Notification
      onClear={clear}
      className={state.class}
      notification={notification.msg}
    />
  );
})``;

type NotificationHandlers = {
  onClear(): void;
};

type NotificationBaseProps = {
  notification?: string | null | Alert;
  error?: boolean;
} & React.ComponentPropsWithRef<"div" | "section" | "button">;

type NotificationProps = NotificationBaseProps & NotificationHandlers;

type ADNProps = NotificationBaseProps & {
  notification: Alert;
  timeout?: number;
};

type ADNState = {
  timeout: NodeJS.Timeout | null;
  class: string;
} & any;
