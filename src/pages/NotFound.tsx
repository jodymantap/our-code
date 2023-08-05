import usePageTitle from "../composables/usePageTitle";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRobot } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

const NotFoundContainer = styled.div`
  text-align: center;
  font-family: "Tektur", cursive;
  color: #efe1d1;
`;

const BackButton = styled.button`
  border: none;
  padding-top: 12px;
  padding-bottom: 12px;
  background-color: #78666f;
  width: 100%;
  color: #efe1d1;
  font-family: "Tektur", cursive;
  margin-top: 12px;
  cursor: pointer;
  &:hover {
    background-color: #8f7883;
  }
  margin-top: 100px;
`;

const NotFound: React.FC = () => {
  usePageTitle("Our Code - Page Not Found");
  const navigate = useNavigate();

  return (
    <>
      <NotFoundContainer>
        <h1>404 : PAGE NOT FOUND</h1>
        <FontAwesomeIcon size="6x" icon={faRobot} />
        <BackButton onClick={() => navigate("/")}>Go Home</BackButton>
      </NotFoundContainer>
    </>
  );
};

export default NotFound;
