import { Link } from "react-router-dom";
import {
  useReadNotificationMutation,
  useRetrieveNotificationsQuery,
} from "../../redux/features/authApiSlice";

const Notifications = () => {
  const { data } = useRetrieveNotificationsQuery();

  const [readNotification] = useReadNotificationMutation();

  const readNotificationHandler = (id: string) => {
    readNotification(id)
      .unwrap()
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="flex flex-col items-start gap-4">
      <h2 className="font-bold">New</h2>
      {data?.map((notification) => (
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
          key={notification.id}
        >
          <p className="font-semibold">{notification?.body}</p>
        </Link>
      ))}
    </div>
  );
};

export default Notifications;
