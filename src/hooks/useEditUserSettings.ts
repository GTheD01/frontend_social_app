import { useState, useRef, useEffect } from "react";
import {
  useRetrieveUserQuery,
  useEditProfileMutation,
} from "../redux/features/authApiSlice";

import { toast } from "react-toastify";

const useEditUserSettings = () => {
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

  const { email, full_name, username } = formData;

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
  return {
    selectedFile,
    onSubmit,
    imageUploadHandler,
    onChange,
    email,
    username,
    full_name,
    isLoading,
    fileInputRef,
  };
};

export default useEditUserSettings;
