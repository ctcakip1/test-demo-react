import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../services/apiService";
import { toast } from "react-toastify";
import { doLogout } from "../../redux/action/userAction";
import Language from "./Language";
import { useTranslation, Trans } from "react-i18next";

const Header = () => {
  const { t } = useTranslation();

  const navigate = useNavigate();
  const handleLogin = () => {
    navigate("/login");
  };
  const handleSignup = () => {
    navigate("/signup");
  };
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
  const account = useSelector((state) => state.user.account);
  const dispatch = useDispatch();
  const hanldeLogOut = async () => {
    let res = await logout(account.email, account.refresh_token);
    if (res && res.EC === 0) {
      // clear data redux
      dispatch(doLogout());
      navigate("/login");
    } else {
      toast.error(res.EM);
    }
  };
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        {/* <Navbar.Brand href="">Tuan Anh</Navbar.Brand> */}
        <NavLink to="/" className="navbar-brand">
          Tuan anh
        </NavLink>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <NavLink to="/" className="nav-link">
              {t("header.item1.home")}
            </NavLink>
            <NavLink to="/users" className="nav-link">
              {t("header.item1.users")}
            </NavLink>
            <NavLink to="/admins" className="nav-link">
              {t("header.item1.Admin")}
            </NavLink>
          </Nav>
          <Nav>
            {isAuthenticated === false ? (
              <>
                <button
                  className="btn-login"
                  onClick={() => {
                    handleLogin();
                  }}
                >
                  Log in
                </button>
                <button
                  className="btn-signup"
                  onClick={() => {
                    handleSignup();
                  }}
                >
                  Sign up
                </button>
              </>
            ) : (
              <NavDropdown
                title={t("header.item2.title")}
                id="basic-nav-dropdown"
              >
                <NavDropdown.Item>{t("header.item2.profile")}</NavDropdown.Item>
                <NavDropdown.Item
                  onClick={() => {
                    hanldeLogOut();
                  }}
                >
                  {t("header.item2.logout")}
                </NavDropdown.Item>
              </NavDropdown>
            )}
            <Language />
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
