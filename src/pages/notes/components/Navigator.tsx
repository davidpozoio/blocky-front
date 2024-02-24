import ROUTES from "../../../consts/routes";
import { useMutation, useQueryClient } from "react-query";
import { logout } from "../../../services/authService";
import { useAppStore } from "../../../store/store";
import CACHE_KEYS from "../../../consts/cache-keys";
import BlockLink from "../../../components/BlockLink";
import {
  CopyOutlined,
  DeleteOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import "../styles/navigator-styles.css";

const Navigator = () => {
  const queryClient = useQueryClient();
  const setAuth = useAppStore((state) => state.setAuth);
  const setBlockLinks = useAppStore((state) => state.setBlockLinks);

  const isNavOpen = useAppStore((state) => state.isNavOpen);
  const setIsNavOpen = useAppStore((state) => state.setIsNavOpen);

  const { mutate, isLoading } = useMutation({
    mutationFn: () => logout(),
    onSuccess: () => {
      setBlockLinks(false);
      setAuth(false);
      queryClient.setQueryData([CACHE_KEYS.NOTE], () => []);
      queryClient.setQueryData([CACHE_KEYS.NOTE_LIST], () => []);
    },
    onError: () => {
      setBlockLinks(false);
    },
  });

  const handleLogout = () => {
    setBlockLinks(true);
    mutate();
  };

  const handleLinkClick = () => {
    setIsNavOpen(false);
  };

  return (
    <>
      <nav
        className={isNavOpen ? "--nav navigator --nav-open" : "--nav navigator"}
      >
        <ul>
          <li onClick={handleLinkClick}>
            <BlockLink to={ROUTES.NOTES.ME} className="nav-link">
              <CopyOutlined className="icon" />
              <span>My notes</span>
            </BlockLink>
          </li>
          <li onClick={handleLinkClick}>
            <BlockLink to={ROUTES.NOTES.TRASH} className="nav-link">
              <DeleteOutlined className="icon" />
              Trash
            </BlockLink>
          </li>
          <li>
            <button
              className="nav-link logout"
              onClick={handleLogout}
              disabled={isLoading}
            >
              <LogoutOutlined className="icon" />
              <span>Log out</span>
            </button>
          </li>
        </ul>
      </nav>
      {isNavOpen && (
        <div
          className="nav-overlay opacity-transition"
          onClick={() => setIsNavOpen(false)}
        ></div>
      )}
    </>
  );
};
export default Navigator;
