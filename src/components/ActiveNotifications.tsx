import styled from "styled-components";
import useGlobalNotifications from "../hooks/GlobalNotifications";
import { Alert } from "../state";
import { FlexColumn } from "./Common/Containers";
import { AutoDismissNotification } from "./Common/Notifications";

const NotificationGroup = styled(FlexColumn)`
  bottom: 1rem;
  height: 40vmin;
  left: 50%;
  margin: 0 auto 0 -300px;
  max-width: 600px;
  overflow: hidden auto;
  padding: 10px;
  position: fixed;
  width: 100%;
  z-index: 9999;

  ${AutoDismissNotification} {
    border-radius: 10px;
  }
`;

const ActiveNotifications = styled(() => {
  const { lastTenNotifications: msgs } = useGlobalNotifications();
  if (!msgs.length) return <></>;
  const timeout = (m: Alert) => (m.error ? 30000 : 5000);

  return (
    <NotificationGroup>
      {msgs.map((m) => (
        <AutoDismissNotification
          key={m.time}
          notification={m}
          timeout={timeout(m)}
        />
      ))}
    </NotificationGroup>
  );
})``;

export default ActiveNotifications;
