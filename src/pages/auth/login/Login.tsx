import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const Login = () => {
  const [isPasswordHidden, setPasswordHidden] = useState(true);
  const navigate = useNavigate();
  return (
    <main className="w-full h-screen flex flex-col items-center justify-center px-4">
      <div className="max-w-md p-4 w-full text-gray-600 shadow-lg rounded-2xl  border-slate-300">
        <div className="text-center">
          {/* <img
            src="https://floatui.com/logo.svg"
            width={150}
            className="mx-auto"
          /> */}
          <div className="mt-5 space-y-2">
            <h3 className="text-gray-800 text-2xl font-bold sm:text-3xl">
              Log in to your account
            </h3>
            <p className="">
              Don't have an account?{" "}
              <a
                href="javascript:void(0)"
                className="font-medium text-orange-600 hover:text-orange-500"
              >
                Sign up
              </a>
            </p>
          </div>
        </div>
        <form onSubmit={(e) => e.preventDefault()} className="mt-8 space-y-5">
          <div className="flex flex-col">
            <label className="font-medium text-left">Email</label>
            <div className="flex items-center p-2 border rounded-md">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="text-gray-400 w-7 h-7"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
              </svg>
              <input
                type="email"
                placeholder="name@floatui.com"
                id="email"
                className="w-full p-1 ml-3 text-gray-500 outline-none bg-transparent"
              />
            </div>
          </div>
          <div className="flex flex-col">
            <label className="font-medium text-left">Password</label>
            <div className="relative mt-2">
              <button
                className="text-gray-400 bg-inherit border-none absolute right-3 inset-y-0 my-auto active:text-gray-600"
                onClick={() => setPasswordHidden(!isPasswordHidden)}
              >
                {isPasswordHidden ? (
                  <svg
                    className="w-6 h-6 border-none"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6 border-none"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
                    />
                  </svg>
                )}
              </button>
              <div className="flex items-center p-2 border rounded-md">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="text-gray-400 w-7 h-7"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
                  />
                </svg>

                <input
                  type={isPasswordHidden ? "password" : "text"}
                  placeholder="Enter your password"
                  className="w-full p-1 ml-3 text-gray-500 outline-none bg-transparent"
                />
              </div>
            </div>
          </div>
          <button
            onClick={() => navigate("/dashboard")}
            className="w-full px-4 py-2 text-white font-medium bg-orange-600 hover:bg-orange-500 active:bg-orange-600 rounded-lg duration-150"
          >
            Sign in
          </button>
          <div className="text-center">
            <a
              href="javascript:void(0)"
              className="hover:text-orange-400 text-orange-600"
            >
              Forgot password?
            </a>
          </div>
        </form>
      </div>
    </main>
  );
};
