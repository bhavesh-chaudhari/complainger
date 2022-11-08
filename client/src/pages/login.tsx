import React from 'react'
import LoginForm from '../components/auth/LoginForm';

const login = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="mb-4">
        <h1 className="mb-4 text-center px-3 text-2xl font-bold opacity-80 uppercase">
          Login to <span className="text-blue-600">Complaint Manager</span>
        </h1>
      </div>
      <div className="w-[90%] lg:w-[100%] max-w-[500px]">
        <LoginForm></LoginForm>
      </div>
    </div>
  );
}

export default login