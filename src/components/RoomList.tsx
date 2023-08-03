import styled, { keyframes } from "styled-components";
import useRoom from "../composables/useRoom";
import { useNavigate } from "react-router-dom";
import LoadingComponent from "./LoadingComponent";

const bounceAnimation = keyframes`
  0%, 20%, 50%, 80%, 100% {
    transform: translateY(0);
  }
  40% {
    transform: translateY(-20px);
  }
  60% {
    transform: translateY(-10px);
  }`;

const RoomListLoading = styled.div`
  background-color: #3f2e3e;
  color: #efe1d1;
  text-align: center;
  padding: 8px;
  animation: ${bounceAnimation} 2s infinite;
`;

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
  const { rooms, roomsLoading } = useRoom();
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
        {roomsLoading ? (
          <RoomListLoading>
            <LoadingComponent size="xl" />
          </RoomListLoading>
        ) : (
          rooms?.map((room) => (
            <RoomListItem
              onClick={() => enterRoom(room?.id as string)}
              key={room?.id}
            >
              {room?.room_name}
            </RoomListItem>
          ))
        )}
      </RoomListContainer>
    </>
  );
};

export default RoomList;
