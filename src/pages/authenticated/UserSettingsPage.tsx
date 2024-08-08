import { Form } from "react-router-dom";
import logo from "../../assets/result.png";
import { useEffect, useRef, useState } from "react";
import {
  useEditProfileMutation,
  useRetrieveUserQuery,
} from "../../redux/features/authApiSlice";
import { toast } from "react-toastify";

const UserSettingsPage = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const { data } = useRetrieveUserQuery();

  const [editProfile, { isLoading }] = useEditProfileMutation();

  const [formData, setFormData] = useState<Record<string, string>>({
    full_name: "",
    username: "",
    email: "",
    avatar: "",
  });

  useEffect(() => {
    if (data) {
      setFormData({
        full_name: data.full_name || "",
        username: data.username || "",
        email: data.email || "",
        avatar: data.get_avatar || "",
      });
    }
  }, [data]);

  const { email, full_name, username, avatar } = formData;

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData({ ...formData, [name]: value });
  };

  const imageUploadHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const onSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    const sendFormData = new FormData();
    sendFormData.append("full_name", full_name);
    sendFormData.append("username", username);
    sendFormData.append("email", email);
    if (selectedFile) {
      sendFormData.append("avatar", selectedFile);
    }

    editProfile(sendFormData)
      .unwrap()
      .then(() => {
        if (fileInputRef.current) {
          setSelectedFile(null);
        }
        toast.success("Information updated");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Form onSubmit={onSubmit}>
      <div className="flex items-center gap-4">
        <img
          src={avatar}
          className="w-32 h-32 rounded-full border border-gray-400 object-contain"
        />
        <div>
          <p>{data?.full_name}</p>
          <p className="font-extrabold">@{data?.username}</p>
        </div>
      </div>

      <label
        htmlFor="avatar"
        className={`px-4 py-2 cursor-pointer inline-block border border-gray-400 my-4 hover:bg-gray-200 ${
          selectedFile && "text-blue-700"
        }`}
      >
        {selectedFile ? selectedFile["name"] : "Upload photo"}
      </label>
      <input
        ref={fileInputRef}
        type="file"
        id="avatar"
        name="avatar"
        className="hidden"
        onChange={imageUploadHandler}
      />

      <div className="flex flex-col gap-3">
        <label htmlFor="full_name">
          <p>Full Name</p>
          <input
            name="full_name"
            type="text"
            id="full_name"
            value={full_name}
            className="outline-none py-2 px-4 border border-black"
            onChange={onChange}
          />
        </label>

        <label htmlFor="username">
          <p>Username</p>
          <input
            name="username"
            id="username"
            type="text"
            value={username}
            className="outline-none py-2 px-4 border border-black"
            onChange={onChange}
          />
        </label>

        <label htmlFor="email">
          <p>Email</p>
          <input
            name="email"
            id="email"
            type="text"
            value={email}
            className="outline-none py-2 px-4 border border-black"
            onChange={onChange}
          />
        </label>
      </div>
      <button
        type="submit"
        className="block px-4 py-2 mt-2 border border-black hover:bg-gray-300"
      >
        Save
      </button>
    </Form>
  );
};

export default UserSettingsPage;
