import { RouterProvider } from "react-router-dom";

import router from "./router/router";
import Setup from "./lib/Setup";

import "react-toastify/dist/ReactToastify.css";
import "./App.css";

function App() {
  return (
    <>
      <Setup />
      <RouterProvider router={router} />
    </>
  );
}

export default App;
