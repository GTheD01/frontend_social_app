import { MouseEventHandler } from "react";
import { Dispatch } from "redux";

interface ModalProps {
  closeModal: MouseEventHandler<HTMLButtonElement>;
}

export default function Modal({
  closeModal,
  children,
}: React.PropsWithChildren<ModalProps>) {
  return (
    <div className="fixed h-screen top-0 left-0 bg-black/30 w-full flex  justify-center items-center">
      <div className="bg-white p-4 relative">
        {children}
        <span
          className="absolute -top-5 -right-3 hover:scale-125 cursor-pointer text-white"
          onClick={closeModal}
        >
          X
        </span>
      </div>
    </div>
  );
}
