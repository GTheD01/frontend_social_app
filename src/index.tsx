import ReactDOM from "react-dom/client";

import App from "./App";

import "./index.css";
import CustomProvider from "./redux/provider";
import { WebSocketProvider } from "./providers/WebSocketContext";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  // <React.StrictMode>
  <CustomProvider>
    <WebSocketProvider>
      <App />
    </WebSocketProvider>
  </CustomProvider>
  //</React.StrictMode>
);
