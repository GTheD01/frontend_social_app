import { useRetrieveUserQuery } from "../../redux/features/authApiSlice";

import EditUserSettingsForm from "../../components/forms/EditUserSettingsForm";
import Spinner from "../../components/common/Spinner";

const UserSettingsPage = () => {
  const { data, isLoading } = useRetrieveUserQuery();

  return (
    <>
      {isLoading ? (
        <Spinner lg />
      ) : (
        <>
          <div className="flex items-center gap-4">
            <img
              src={data?.get_avatar}
              alt="user avatar"
              className="w-32 h-32 rounded-full border border-gray-400 object-contain"
            />
            <div>
              <p>{data?.full_name}</p>
              <p className="font-extrabold">@{data?.username}</p>
            </div>
          </div>
          <EditUserSettingsForm />
        </>
      )}
    </>
  );
};

export default UserSettingsPage;
