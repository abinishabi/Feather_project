import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import CustomInput from "./components/CustomInput";
import CustomButton from "./components/CustomButton";


const Auth = () => {
  const [Email, setEmail] = React.useState("");
  const [Password, setPassword] = React.useState("");
  const [Username, setUsername] = React.useState("");
  const [show, setShow] = React.useState("Login");

  const navigate = useNavigate();

  const base_url = "http://localhost:3000";
  const [data, setData] = React.useState([]);

  const handleLogin = async () => {
    try {
      const loginResponse = await axios.post(`${base_url}/loginUser`, {
        user_email: Email,
        user_password: Password,
      });
      console.log(loginResponse.data, "loginResponse");

      if (loginResponse.data.message == "success") {
        const user = await axios.post(`${base_url}/getUserById`, {
          _id: loginResponse.data.id,
        });
        setData(user.data.data.user_email, "user");
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleRegister = async () => {
    try {
      const RegisterResponse = await axios.post(`${base_url}/createUser`, {
        user_Name: Username,
        user_email: Email,
        user_password: Password,
      });
      console.log(RegisterResponse, "RegisterResponse");
    } catch (error) {
      console.log(error);
    }
  };
  const userId = async () => {
    try {
      const response = await axios.get(`${base_url}/getUser/${userId}`);
      setUserData(response.data);
      console.log(response.data, "UserData");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className=" justify-center  py-24 items-center flex flex-col  ">
      <div className="  border border-zinc-400 shadow-xl  rounded-2xl h-auto w-60 py-11 px-10  ">
        <div className="flex justify-center space-x-3 border text-white bg-purple-700 hover:bg-purple-800 focus:outline-none focus:ring-4 focus:ring-purple-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900">
          <button onClick={() => setShow("SignUp")}>SignUp</button>
          <button onClick={() => setShow("Login")}>Login</button>
        </div>
        {show == "Login" && (
          <div className="space-y-5 justify-between items-center ">
            <CustomInput
              type="text"
              placeholder="Email"
              value={Email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <CustomInput
              type="password"
              placeholder="password"
              value={Password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <div className="flex justify-center text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">
              <CustomButton button={"Login"} onClick={handleLogin} />
            </div>
          </div>
        )}
        {show == "SignUp" && (
          <div className="space-y-5">
            <CustomInput
              type="text"
              placeholder="Username"
              value={Username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <CustomInput
              type="text"
              placeholder="Email"
              value={Email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <CustomInput
              type="text"
              placeholder="Password"
              value={Password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <div className="flex justify-center text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">
              <CustomButton button={"Register"} onClick={handleRegister} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Auth;
