import ReactDOM from "react-dom/client";

import App from "./App";

import "./index.css";
import CustomProvider from "./redux/provider";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  // <React.StrictMode>
  <CustomProvider>
    <App />
  </CustomProvider>
  //</React.StrictMode>
);
