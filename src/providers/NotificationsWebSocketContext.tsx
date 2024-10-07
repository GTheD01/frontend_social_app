import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import { NotificationProps } from "../types/types";
import { useAppDispatch } from "../redux/hooks";
import useWebSocket from "react-use-websocket";
import { useRetrieveNotificationsQuery } from "../redux/features/authApiSlice";
import {
  setMessagesCount,
  setNotificationsCount,
} from "../redux/features/userSlice";

interface NotificationsWebSocketContextType {
  notifications: NotificationProps[];
  setNotifications: Dispatch<SetStateAction<NotificationProps[]>>;
}

export const NotificationsWebSocketContext = createContext<
  NotificationsWebSocketContextType | undefined
>(undefined);

export const NotificationsWebSocketProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const dispatch = useAppDispatch();
  const [notifications, setNotifications] = useState<NotificationProps[]>([]);

  const { lastJsonMessage, lastMessage } = useWebSocket(
    `ws://127.0.0.1:8000/ws/notifications/`,
    {
      share: false,
      shouldReconnect: () => true,
    }
  );

  const { data: oldNotifications } = useRetrieveNotificationsQuery(
    undefined,
    {}
  );

  useEffect(() => {
    setNotifications(oldNotifications as NotificationProps[]);
  }, [oldNotifications]);

  useEffect(() => {
    if (lastMessage) {
      const data = JSON.parse(lastMessage?.data);
      if (data.type !== "new_message") {
        setNotifications((prev) => [
          ...prev,
          lastJsonMessage as NotificationProps,
        ]);
        dispatch(setNotificationsCount({ count: 1 }));
      }
      if (data.type === "new_message") {
        dispatch(setMessagesCount({ count: data?.unread_conversations_count }));
      }
    }
  }, [lastJsonMessage, dispatch]);

  return (
    <NotificationsWebSocketContext.Provider
      value={{ notifications, setNotifications }}
    >
      {children}
    </NotificationsWebSocketContext.Provider>
  );
};

export const useNotificationsWebSocketContext = () => {
  const context = useContext(NotificationsWebSocketContext);
  if (!context) {
    throw new Error(
      "useWebSocketContext must be used within a WebSocketProvider"
    );
  }
  return context;
};
