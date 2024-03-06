import { useState } from "react";
import "./Signup.scss";
import { useNavigate } from "react-router-dom";
import { postSignup } from "../../services/apiService";
import { toast } from "react-toastify";
import { FaEye, FaEyeSlash } from "react-icons/fa";
const Signup = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };
  const handleSignup = async () => {
    // validate
    const isValidEmail = validateEmail(email);
    if (!isValidEmail) {
      toast.error("Invalid Email");
      //toast.success();
      //toast.info();
      return;
    }
    if (!password) {
      toast.error("Invalid Password");
      return;
    }
    //submit api
    let data = await postSignup(email, password, username);
    if (data && data.EC === 0) {
      toast.success(data.EM);
      navigate("/login");
    }
    if (data && +data.EC !== 0) {
      toast.error(data.EM);
    }
  };
  return (
    <div className="signup-container">
      <div className="header">
        <span>Already have an account ?</span>
        <button
          onClick={() => {
            navigate("/login");
          }}
        >
          Log in{" "}
        </button>
      </div>
      <div className="title col-4 mx-auto">Tuan anh</div>
      <div className="welcome col-4 mx-auto">Start your journey?</div>
      <div className="content-form col-4 mx-auto">
        <div className="form-group ">
          <label>Email(*)</label>
          <input
            type="email"
            className="form-control"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
        </div>
        <div className="form-group pass-group ">
          <label>Password(*)</label>
          <input
            type={showPassword ? "text" : "password"}
            className="form-control"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <span className="icon-eyes" onClick={() => setShowPassword(!showPassword)}>
            {!showPassword ? <FaEye /> : <FaEyeSlash />}
          </span>
        </div>
        <div className="form-group">
          <label>UserName</label>
          <input
            type="text"
            className="form-control"
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          />
        </div>

        <div>
          <button
            className="btn-submit"
            onClick={() => {
              handleSignup();
            }}
          >
            Signup
          </button>
        </div>
        <div className="text-center">
          <span
            onClick={() => {
              navigate("/");
            }}
            className="back"
          >
            &#60;&#60;Go to HomePage
          </span>
        </div>
      </div>
    </div>
  );
};
export default Signup;
