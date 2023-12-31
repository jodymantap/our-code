import { useState } from "react";
import { useNavigate } from "react-router-dom";
import RoomList from "../components/RoomList";
import useRoom from "../composables/useRoom";
import usePageTitle from "../composables/usePageTitle";
import CreateNewRoom from "../components/CreateNewRoom";
import EnterRoomCode from "../components/EnterRoomCode";

const HomePage: React.FC = () => {
  usePageTitle("Our Code - Home");
  const { createNewRoom, enterRoomCode } = useRoom();
  const navigate = useNavigate();
  const [formState, setFormState] = useState<string>("create");
  const [buttonLoading, setButtonLoading] = useState<boolean>(false);

  interface MyCreateFormValues {
    roomName: string;
  }

  interface MyEnterFormValues {
    roomCode: string;
  }

  const createRoom = (values: MyCreateFormValues) => {
    setButtonLoading(true);
    createNewRoom(values.roomName)
      .then((res) => {
        if (res) {
          setButtonLoading(false);
          navigate(`room/${res.id}`);
        }
      })
      .catch((err) => {
        setButtonLoading(false);
        return err;
      });
  };

  const enterExistingRoomCode = (values: MyEnterFormValues) => {
    setButtonLoading(true);
    enterRoomCode(values.roomCode)
      .then(() => {
        setButtonLoading(false);
      })
      .catch((err) => {
        setButtonLoading(false);
        return err;
      });
  };

  const toggleFormState = (state: string) => {
    setFormState(state);
  };

  return (
    <>
      {formState === "create" ? (
        <CreateNewRoom
          createRoom={createRoom}
          toggleFormState={toggleFormState}
          buttonLoading={buttonLoading}
        />
      ) : (
        <EnterRoomCode
          enterRoomCode={enterExistingRoomCode}
          toggleFormState={toggleFormState}
          buttonLoading={buttonLoading}
        />
      )}
      <RoomList />
    </>
  );
};

export default HomePage;
