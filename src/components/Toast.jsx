import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { CheckCircle, XCircle, AlertCircle } from 'lucide-react';

// 커스텀 토스트 컴포넌트
const CustomToast = ({ message, type }) => {
  const icons = {
    success: <CheckCircle className="text-green-500" />,
    error: <XCircle className="text-red-500" />,
    info: <AlertCircle className="text-blue-500" />
  };

  return (
    <div className="flex items-center">
      {icons[type]}
      <p className="ml-2">{message}</p>
    </div>
  );
};

// 토스트 컨테이너 래퍼
export const ToastContainerWrapper = () => (
  <ToastContainer
    position="bottom-center"
    autoClose={3000}
    hideProgressBar={false}
    newestOnTop={false}
    closeOnClick
    rtl={false}
    pauseOnFocusLoss
    draggable
    pauseOnHover
    theme="light"
  />
);

// 토스트 함수
export const showToast = (message, type = 'info') => {
  toast(<CustomToast message={message} type={type} />, {
    className: `bg-white shadow-lg rounded-lg`,
    bodyClassName: () => "text-sm font-semibold text-gray-800 block p-3",
    progressClassName: `${
      type === 'success' ? 'bg-green-500' : 
      type === 'error' ? 'bg-red-500' : 
      'bg-blue-500'
    }`
  });
};

export default CustomToast;