import { useState } from "react";
import "./Signup.scss";
import { useNavigate } from "react-router-dom";
import { postSignup } from "../../services/apiService";
import { toast } from "react-toastify";
const Signup = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const navigate = useNavigate();
  const handleSignup = async () => {
    // validate

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
        <span>Don't have an account yet?</span>
        <button>Sign up</button>
      </div>
      <div className="title col-4 mx-auto">Tuan anh</div>
      <div className="welcome col-4 mx-auto">Hello, who's this?</div>
      <div className="content-form col-4 mx-auto">
        <div className="form-group ">
          <label>Email</label>
          <input
            type="email"
            className="form-control"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            required
          />
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
        <div className="form-group ">
          <label>Password</label>
          <input
            type="password"
            className="form-control"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            required
          />
          <label>conmat</label>
        </div>
        <span className="forgot-password">Forgot Password</span>
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
