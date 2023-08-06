import styled from "styled-components";
import toast from "react-hot-toast";
import { RoomModel } from "../interfaces/room";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShareAlt } from "@fortawesome/free-solid-svg-icons";

interface ComponentProps {
  roomData: RoomModel | null;
}

const HeaderContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: #efe1d1;
  font-family: "Tektur", cursive;
  font-size: 8px;
  height: 32px;
  display: flex;
  align-items: center;
  margin-bottom: 16px;
`;

const HeaderAction = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  border: 1px #efe1d1 solid;
  padding: 4px;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    color: white;
    border-color: white;
  }
`;

const EditorHeader: React.FC<ComponentProps> = ({ roomData }) => {
  const copyRoomCode = () => {
    navigator.clipboard.writeText(roomData?.id as string);
    toast.success("Room code copied!");
  };

  return (
    <>
      <HeaderContainer>
        <h1>{roomData?.room_name}</h1>

        <HeaderAction onClick={copyRoomCode}>
          <FontAwesomeIcon size="2x" icon={faShareAlt} />
        </HeaderAction>
      </HeaderContainer>
    </>
  );
};

export default EditorHeader;
