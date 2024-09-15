import { Form } from "react-router-dom";

import useEditUserSettings from "../../hooks/useEditUserSettings";
import Spinner from "../common/Spinner";

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
