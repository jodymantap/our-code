import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faSignOut } from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";
import useAuth from "../../composables/useAuth";

const NavbarContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #3f2e3e;
  padding: 20px 32px 20px 32px;
`;

const LogoText = styled.div`
  font-family: "Tektur", cursive;
  font-size: 20px;
  color: #efe1d1;
  text-transform: uppercase;
  letter-spacing: 4px;
`;

const LogoSpan = styled.span`
  color: #a78295;
`;

const ProfileLogo = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #efe1d1;
  color: #a78295;
  font-family: "Noto Sans", sans-serif;
  width: 40px;
  height: 40px;
  cursor: pointer;
`;

const ProfileDropdown = styled.div`
  background-color: #efe1d1;
  color: #a78295;
  width: 300px;
  padding: 12px;
  border-radius: 10px;
  position: fixed;
  right: 32px;
  top: 70px;
`;

const UserData = styled.div`
  display: flex;
  align-items: start;
  padding-bottom: 20px;
`;

const UserImage = styled.img`
  width: 40px;
  height: 40px;
`;

const UserName = styled.div`
  font-family: "Noto Sans", sans-serif;
  font-size: 16px;
  font-weight: 600;
  margin-left: 8px;
`;

const LogoutButton = styled.div`
  font-family: "Noto Sans", sans-serif;
  font-weight: 500;
  font-size: 12px;
  width: 100%;
  color: #b31312;
  cursor: pointer;
`;

const NavbarComponent: React.FC = () => {
  const { userInfo, logout } = useAuth();
  const [dropdown, setDropdown] = useState(false);

  const toggleDropdown = () => {
    setDropdown(!dropdown);
  };

  const onLogout = () => {
    logout()
      .then(() => {
        setDropdown(false);
        return;
      })
      .catch(() => {
        return;
      });
  };

  return (
    <>
      <NavbarContainer>
        <LogoText>
          <LogoSpan>O</LogoSpan>ur <LogoSpan>C</LogoSpan>ode
        </LogoText>
        {userInfo ? (
          <UserImage src={userInfo?.photoURL} onClick={toggleDropdown} />
        ) : (
          <ProfileLogo>
            <FontAwesomeIcon icon={faUser} />
          </ProfileLogo>
        )}
        {dropdown ? (
          <ProfileDropdown>
            <UserData>
              <UserImage src={userInfo?.photoURL} />
              <UserName>{userInfo?.displayName}</UserName>
            </UserData>
            <hr />
            <LogoutButton onClick={onLogout}>
              <FontAwesomeIcon icon={faSignOut} />
              &nbsp; Logout
            </LogoutButton>
          </ProfileDropdown>
        ) : null}
      </NavbarContainer>
    </>
  );
};

export default NavbarComponent;
