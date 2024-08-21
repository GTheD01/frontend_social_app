import { useState, useEffect } from "react";
import { useEditProfileMutation } from "../redux/features/authApiSlice";

import { toast } from "react-toastify";
import { useAppSelector } from "../redux/hooks";

const useEditUserSettings = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const user = useAppSelector((state) => state.user);

  const [editProfile, { isLoading }] = useEditProfileMutation();

  const [formData, setFormData] = useState<Record<string, string>>({
    full_name: "",
    username: "",
    email: "",
    avatar: "",
  });

  useEffect(() => {
    if (user) {
      setFormData({
        full_name: user.full_name || "",
        username: user.username || "",
        email: user.email || "",
        avatar: user.get_avatar || "",
      });
    }
  }, [user]);

  const { email, full_name, username } = formData;

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData({ ...formData, [name]: value });
  };

  const imageUploadHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setSelectedFile(e.target.files[0]);
    }
    e.target.value = null!;
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
        if (selectedFile) {
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
  };
};

export default useEditUserSettings;
