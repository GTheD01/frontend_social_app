import { Form } from "react-router-dom";

import useEditUserSettings from "../../hooks/useEditUserSettings";
import Spinner from "../common/Spinner";
import { useState } from "react";
import Modal from "../pagecomponents/Modal";
import { useToggleMfaMutation } from "../../redux/features/authApiSlice";
import { useAppSelector } from "../../redux/hooks";
import { toast } from "react-toastify";

const EditUserSettingsForm = () => {
  const {
    onChange,
    onSubmit,
    imageUploadHandler,
    selectedFile,
    full_name,
    username,
    email,
    isLoading,
  } = useEditUserSettings();

  const [toggleMfa, { isLoading: mfaLoading }] = useToggleMfaMutation();
  const mfaEnabled = useAppSelector((store) => store.user.mfa_enabled);

  const [toggleMfaConfirmModal, setToggleMfaConfirmModal] =
    useState<boolean>(false);

  const closeModal = () => {
    setToggleMfaConfirmModal(false);
  };

  const activateMfa = () => {
    closeModal();
    try {
      toggleMfa(undefined)
        .unwrap()
        .then((response) => {
          // toast.success("MFA");
        })
        .catch((e) => {
          console.log(e);
        });
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Form onSubmit={onSubmit}>
      <label
        htmlFor="avatar"
        className={`px-4 py-2 cursor-pointer inline-block border border-gray-400 my-4 hover:bg-gray-200 ${
          selectedFile && "text-blue-700"
        }`}
      >
        {selectedFile ? selectedFile["name"] : "Upload photo"}
      </label>
      <input
        type="file"
        id="avatar"
        name="avatar"
        className="hidden"
        onChange={imageUploadHandler}
      />

      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-2">
          <p>Multi-factor authentication</p>
          <label className="relative inline-block w-[60px] h-[34px]">
            <input
              type="checkbox"
              className="opacity-0 w-0 h-0 peer"
              onClick={() => setToggleMfaConfirmModal((state) => true)}
            />
            <span
              style={{
                backgroundColor: mfaEnabled
                  ? "rgb(37, 99, 235)"
                  : "rgb(156, 163, 175)",
              }}
              className={`absolute inset-0 cursor-pointer rounded-full transition-all duration-400 before:absolute before:h-[26px] before:w-[26px] before:bg-white before:rounded-full before:bottom-[4px] before:left-[4px] before:transition before:duration-400 ${
                mfaEnabled ? "before:translate-x-[26px]" : ""
              }`}
            ></span>
          </label>
        </div>

        {toggleMfaConfirmModal && (
          <Modal closeModal={closeModal}>
            <h1 className="text-2xl w-[18ch] text-center">
              Are you sure you want to continue?
            </h1>
            <div className="flex justify-between mx-4 mt-10">
              <button
                type="button"
                className="bg-green-500 py-2 px-4"
                onClick={activateMfa}
              >
                Yes
              </button>
              <button
                type="button"
                className="bg-red-500 py-2 px-4"
                onClick={closeModal}
              >
                No
              </button>
            </div>
          </Modal>
        )}

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
        disabled={isLoading}
        type="submit"
        className="block px-4 py-2 mt-2 border border-black hover:bg-gray-300"
      >
        {isLoading ? <Spinner sm /> : "Save"}
      </button>
    </Form>
  );
};

export default EditUserSettingsForm;
