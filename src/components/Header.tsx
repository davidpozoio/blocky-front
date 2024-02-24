import { Link, useNavigate } from "react-router-dom";
import ROUTES from "../consts/routes";
import BlockLink from "./BlockLink";
import "./styles/header-styles.css";
import { MenuOutlined } from "@ant-design/icons";
import Options from "./Options";
import useToggle from "../hooks/useToggle";
import { useAppStore } from "../store/store";

interface HeaderProps {
  path: string;
}

const Header = ({ path }: HeaderProps) => {
  const authOptions = useToggle(false);
  const setIsNavOpen = useAppStore((state) => state.setIsNavOpen);
  const navigate = useNavigate();
  return (
    <header className="header content-grid">
      <div className="content-header">
        {path.match("/notes") && (
          <button
            className="options --remove-button-styles"
            onClick={() => setIsNavOpen(true)}
          >
            <MenuOutlined />
          </button>
        )}
        <BlockLink
          to={path.match("/notes") ? ROUTES.NOTES.ME : ROUTES.HOME.ME}
          className="gradient-title"
        >
          Blocky
        </BlockLink>
        {path === ROUTES.HOME.ME && (
          <nav className="nav">
            <Link to={ROUTES.AUTH.LOGIN} className="button --dark">
              Log in
            </Link>
            <Link to={ROUTES.AUTH.SIGNUP} className="button --dark">
              Sign up
            </Link>
          </nav>
        )}
        {path === ROUTES.HOME.ME && (
          <button
            className="auth-options-button --remove-button-styles"
            onClick={() => authOptions.setTrue()}
          >
            <MenuOutlined />
          </button>
        )}

        <Options
          onClose={() => authOptions.setFalse()}
          show={authOptions.toggle}
          values={[
            {
              name: "Log in",
              onClick: () => {
                navigate(ROUTES.AUTH.LOGIN);
              },
            },
            {
              name: "Sign up",
              onClick: () => {
                navigate(ROUTES.AUTH.SIGNUP);
              },
            },
          ]}
        />
      </div>
    </header>
  );
};
export default Header;
