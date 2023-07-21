import { useParams } from "react-router-dom";

const RoomPage: React.FC = () => {
  const { roomID } = useParams();
  console.log(roomID);
  return <div>Room Page {roomID}</div>;
};

export default RoomPage;
