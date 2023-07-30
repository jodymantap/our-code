import styled from "styled-components";
import useRoom from "../composables/useRoom";
import { useNavigate } from "react-router-dom";

const RoomListContainer = styled.div`
  margin-top: 8px;
  height: 150px;
  overflow: scroll;
`;

const RoomListItem = styled.div`
  background-color: #3f2e3e;
  padding: 12px;
  color: #efe1d1;
  text-align: center;
  cursor: pointer;
  &:hover {
    background-color: #4f3c4e;
  }
  margin-bottom: 8px;
  font-family: "Tektur", cursive;
  font-size: 12px;
`;

const RoomList: React.FC = () => {
  const { rooms } = useRoom();
  const navigate = useNavigate();

  const enterRoom = (id: string | null) => {
    if (id) {
      navigate(`room/${id}`);
    } else {
      console.log("Invalid room ID");
    }
  };

  return (
    <>
      <RoomListContainer>
        {rooms?.map((room) => (
          <RoomListItem
            onClick={() => enterRoom(room?.id as string)}
            key={room?.id}
          >
            {room?.room_name}
          </RoomListItem>
        ))}
      </RoomListContainer>
    </>
  );
};

export default RoomList;
