// @flow

import React from "react";
import { TOAST_TYPES } from "../../static/common";
import Alert from "./alert";

const Ctx = React.createContext();

// Styled Components
// ==============================

const ToastContainer = (props) => (
  <div
    style={{
      position: "fixed",
      bottom: 10,
      left: "50%",
      transform: "translateX(-50%)",
    }}
    {...props}
  />
);

// Provider
// ==============================

export function ToastProvider({ children }) {
  const [toasts, setToasts] = React.useState(null);

  const add = ({ type, message }) => {
    setToasts({ type, message });
  };
  const remove = () => {
    setToasts(null);
  };

  return (
    <Ctx.Provider value={{ add, remove }}>
      {children}
      <ToastContainer>
        {toasts && (
          <Alert
            type={toasts.type}
            message={toasts.message}
            onDismiss={remove}
          />
        )}
      </ToastContainer>
    </Ctx.Provider>
  );
}

// Consumer
// ==============================

export const useToasts = () => React.useContext(Ctx);
