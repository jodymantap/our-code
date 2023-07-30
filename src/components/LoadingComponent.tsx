import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCog } from "@fortawesome/free-solid-svg-icons";
import { SizeProp } from "@fortawesome/fontawesome-svg-core";
import styled, { keyframes } from "styled-components";

interface ComponentProps {
  size: SizeProp | undefined;
}

const rotateAnimation = keyframes`
from {
  transform: rotate(0deg)
}
to {
  transform: rotate(360deg)
}`;

const RotatingIcon = styled(FontAwesomeIcon)`
  animation: ${rotateAnimation} 2s infinite;
`;

const LoadingComponent: React.FC<ComponentProps> = (props) => {
  return (
    <>
      <RotatingIcon icon={faCog} color="#efe1d1" size={props?.size} />
    </>
  );
};

export default LoadingComponent;
