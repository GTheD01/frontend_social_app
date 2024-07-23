import "./App.css";
import Setup from "./lib/Setup";
import CustomProvider from "./redux/provider";
import router from "./router/router";
import { RouterProvider } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <CustomProvider>
      <Setup />
      <RouterProvider router={router} />
    </CustomProvider>
  );
}

export default App;
