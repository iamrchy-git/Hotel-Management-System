import { Toaster } from "sonner";

const Toast = () => {
  return (
    <Toaster
      position="top-right"
      closeButton
      duration={1000}
      toastOptions={{
        style: {
          background: "#2563eb",
          border: "1px solid #1d4ed8",
          color: "#ffffff",
          boxShadow: "0 10px 24px rgba(37, 99, 235, 0.24)",
        },
        classNames: {
          toast:
            "border border-blue-700 bg-blue-600 text-white shadow-lg shadow-blue-200/70",
          success: "border-blue-700 bg-blue-600 text-white",
          error: "border-blue-700 bg-blue-600 text-white",
          closeButton:
            "border-blue-300 bg-blue-500 text-white hover:bg-blue-700",
        },
      }}
    />
  );
};

export default Toast;
