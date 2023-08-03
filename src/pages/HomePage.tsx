import { useState } from "react";
import { useNavigate } from "react-router-dom";
import RoomList from "../components/RoomList";
import useRoom from "../composables/useRoom";
import usePageTitle from "../composables/usePageTitle";
import CreateNewRoom from "../components/CreateNewRoom";

const HomePage: React.FC = () => {
  usePageTitle("Our Code - Home");
  const { createNewRoom } = useRoom();
  const navigate = useNavigate();
  const [formState, setFormState] = useState<string>("create");
  const [buttonLoading, setButtonLoading] = useState<boolean>(false);

  interface MyFormValues {
    roomName: string;
  }

  const createRoom = (values: MyFormValues) => {
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
        console.log(err);
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
      ) : null}
      <RoomList />
    </>
  );
};

export default HomePage;
