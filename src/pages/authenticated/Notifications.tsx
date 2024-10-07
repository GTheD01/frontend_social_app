import { Link } from "react-router-dom";

import { useReadNotificationMutation } from "../../redux/features/authApiSlice";

import { useNotificationsWebSocketContext } from "../../providers/NotificationsWebSocketContext";
import { useAppDispatch } from "../../redux/hooks";
import { setNotificationsCount } from "../../redux/features/userSlice";

const Notifications = () => {
  const { notifications, setNotifications } =
    useNotificationsWebSocketContext();
  const [readNotification] = useReadNotificationMutation();
  const dispatch = useAppDispatch();

  const readNotificationHandler = (id: string) => {
    readNotification(id)
      .unwrap()
      .then((res) => {
        setNotifications((prevNotifications) =>
          prevNotifications.filter((notification) => notification.id !== id)
        );
        dispatch(setNotificationsCount({ count: -1 }));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="flex flex-col items-start gap-4">
      <h2 className="font-bold">New</h2>
      {notifications?.map((notification) => (
        <Link
          onClick={() => readNotificationHandler(notification.id)}
          to={`${
            notification.notification_type === "new_follower"
              ? `/profile/${notification.created_for}`
              : `/post/${notification.post_id}`
          }`}
          className={`border border-gray-300 p-4 rounded-2xl  ${
            notification.is_read ? "" : "bg-blue-100"
          }`}
          key={notification?.id}
        >
          <p className="font-semibold">{notification?.body}</p>
        </Link>
      ))}
    </div>
  );
};

export default Notifications;
