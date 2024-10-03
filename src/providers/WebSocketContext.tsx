import {
  ContextType,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { NotificationProps } from "../types/types";
import { useAppDispatch } from "../redux/hooks";
import useWebSocket from "react-use-websocket";
import {
  useLazyRetrieveNotificationsQuery,
  useRetrieveNotificationsQuery,
} from "../redux/features/authApiSlice";

interface WebSocketContextType {
  notifications: NotificationProps[];
  notificationsCount: number;
  setNotificationsCount: React.Dispatch<React.SetStateAction<number>>;
}

export const WebSocketContext = createContext<WebSocketContextType | undefined>(
  undefined
);

export const WebSocketProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [notifications, setNotifications] = useState<NotificationProps[]>([]);
  const [notificationsCount, setNotificationsCount] = useState(0);

  const { sendJsonMessage, lastJsonMessage, readyState } = useWebSocket(
    `ws://127.0.0.1:8000/ws/notifications/`,
    {
      share: false,
      shouldReconnect: () => true,
    }
  );

  // const [retrieveNotifications] = useLazyRetrieveNotificationsQuery();
  const { data: oldNotifications } = useRetrieveNotificationsQuery();

  useEffect(() => {
    setNotifications(oldNotifications as NotificationProps[]);
  }, [oldNotifications]);

  useEffect(() => {
    console.log(`Ready state: ${readyState}`);
  }, [readyState]);

  useEffect(() => {
    if (lastJsonMessage) {
      setNotifications((prev) => [
        ...prev,
        lastJsonMessage as NotificationProps,
      ]);
      setNotificationsCount((count) => count + 1);
    }
  }, [lastJsonMessage]);

  return (
    <WebSocketContext.Provider
      value={{ notifications, notificationsCount, setNotificationsCount }}
    >
      {children}
    </WebSocketContext.Provider>
  );
};

export const useWebSocketContext = () => {
  const context = useContext(WebSocketContext);
  if (!context) {
    throw new Error(
      "useWebSocketContext must be used within a WebSocketProvider"
    );
  }
  return context;
};
