import React, { Component } from "react";
import { ToastProvider } from "./components/toast/toast-manager";
import Dashboard from "./features/dashboard/Dashboard";

class App extends Component {
  state = {
    hasError: false,
  };

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    // You can also log the error to an error reporting service
    console.log(error, info);
  }

  render() {
    return (
      <div className="App">
        <ToastProvider>
          <Dashboard />
        </ToastProvider>
      </div>
    );
  }
}

export default App;
