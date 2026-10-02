import { Toaster } from "sonner";

const Toast = () => {
  return (
    <Toaster
      position="top-right"
      closeButton
      duration={1000}
      toastOptions={{
        classNames: {
          toast:
            "border border-indigo-100 bg-white text-slate-900 shadow-lg shadow-indigo-100/60",
          success: "border-indigo-200 bg-indigo-50 text-indigo-900",
          error: "border-indigo-200 bg-indigo-50 text-indigo-900",
          closeButton:
            "border-indigo-200 bg-white text-indigo-600 hover:bg-indigo-100",
        },
      }}
    />
  );
};

export default Toast;
