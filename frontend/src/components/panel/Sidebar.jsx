import { Sidebar } from "flowbite-react";
import { Link } from "react-router-dom";
import {
  HiArrowSmRight,
  HiChartPie,
  HiShoppingBag,
  HiTable,
  HiUser,
  HiLogout,
} from "react-icons/hi";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../config/axiosSetup";

export function CustomSideBar() {
  const { logout } = useContext(AuthContext);
  const [userData, setUserData] = useState({});
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  useEffect(() => {
    axiosInstance.get("/api/auth/me").then((res) => {
      setUserData(res.data);
    });
  }, [setUserData]);

  const hasRole = (roleName) => {
    if (!userData?.roles) {
      return false;
    }
    return userData?.roles.some((role) => role.name === roleName);
  };

  return (
    <div className="h-screen flex">
      <Sidebar aria-label="Default sidebar example" className="h-full b">
        <Sidebar.Items>
          <Sidebar.ItemGroup>
            {/* <Sidebar.Item as={Link} to="" icon={HiChartPie}>
              Dashboard
            </Sidebar.Item> */}
            {hasRole("admin") && (
              <>
                <Sidebar.Item as={Link} to="/dashboard/users" icon={HiUser}>
                  Users
                </Sidebar.Item>
                <Sidebar.Item
                  as={Link}
                  to="/dashboard/roles"
                  icon={HiShoppingBag}
                >
                  Roles
                </Sidebar.Item>
                <Sidebar.Item
                  as={Link}
                  to="/dashboard/permissions"
                  icon={HiArrowSmRight}
                >
                  Permissions
                </Sidebar.Item>
              </>
            )}
            {(hasRole("admin") || hasRole("author") || hasRole("editor")) && (
              <Sidebar.Item as={Link} to="/dashboard/articles" icon={HiTable}>
                Articles
              </Sidebar.Item>
            )}
            <Sidebar.Item onClick={handleLogout} icon={HiLogout}>
              Logout
            </Sidebar.Item>
          </Sidebar.ItemGroup>
        </Sidebar.Items>
      </Sidebar>
    </div>
  );
}
