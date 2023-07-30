import { Formik, Field, Form, FieldProps } from "formik";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import * as yup from "yup";
import RoomList from "../components/RoomList";
import useRoom from "../composables/useRoom";
import usePageTitle from "../composables/usePageTitle";
import { useState } from "react";
import LoadingComponent from "../components/LoadingComponent";

interface MyFormValues {
  roomName: string;
}

const FormContainer = styled.div`
  padding: 32px;
  background-color: #3f2e3e;
`;

const InputField = styled.input.attrs({
  type: "text",
})`
  padding: 12px;
  width: 300px;
  font-family: "Noto Sans", sans-serif;
  background-color: #efe1d1;
  border: 3px solid #a78295;
  outline: none;
  &:focus {
    outline: none;
    border: 3px solid #75c2f6;
  }
`;

const SubmitButton = styled.button`
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
`;

const ErrorContainer = styled.div`
  color: #f11a7b;
  font-family: "Tektur", cursive;
  font-size: 12px;
  height: 32px;
  display: flex;
  align-items: center;
`;

const HomePage: React.FC = () => {
  usePageTitle("Our Code - Home");
  const { createNewRoom } = useRoom();
  const navigate = useNavigate();
  const [buttonLoading, setButtonLoading] = useState<boolean>(false);

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

  const validationSchema = yup.object({
    roomName: yup.string().required().label("Room Name"),
  });
  return (
    <>
      <Formik
        validationSchema={validationSchema}
        initialValues={{ roomName: "" }}
        onSubmit={(values, actions) => {
          createRoom(values);
          actions.setSubmitting(false);
        }}
      >
        <Form>
          <FormContainer>
            <Field name="roomName">
              {({ field, meta }: FieldProps) => (
                <>
                  <InputField {...field} placeholder="Input new room name" />
                  <ErrorContainer>
                    {meta.error ? meta.error + "!" : ""}
                  </ErrorContainer>
                </>
              )}
            </Field>
            <br />
            <SubmitButton disabled={buttonLoading} type="submit">
              {buttonLoading ? (
                <LoadingComponent size="lg" />
              ) : (
                <div>Create Room</div>
              )}
            </SubmitButton>
          </FormContainer>
        </Form>
      </Formik>
      <RoomList />
    </>
  );
};

export default HomePage;
