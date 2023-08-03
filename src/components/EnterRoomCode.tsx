import { Formik, Field, Form, FieldProps } from "formik";
import styled from "styled-components";
import * as yup from "yup";
import LoadingComponent from "../components/LoadingComponent";

interface MyFormValues {
  roomCode: string;
}

interface ComponentProps {
  enterRoomCode: (values: MyFormValues) => void;
  toggleFormState: (values: string) => void;
  buttonLoading: boolean;
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

const ToggleFormLink = styled.p`
  text-decoration: underline;
  cursor: pointer;
  text-align: center;
  font-family: "Tektur", cursive;
  font-size: 12px;
`;

const EnterRoomCode: React.FC<ComponentProps> = ({
  enterRoomCode,
  toggleFormState,
  buttonLoading,
}) => {
  const validationSchema = yup.object({
    roomCode: yup
      .string()
      .required("Room Code is required")
      .matches(/^[a-zA-Z0-9]+$/, "Invalid Room Code format")
      .label("Room Code"),
  });
  return (
    <>
      <Formik
        validationSchema={validationSchema}
        initialValues={{ roomCode: "" }}
        onSubmit={(values, actions) => {
          enterRoomCode(values);
          actions.setSubmitting(false);
        }}
      >
        <Form>
          <FormContainer>
            <Field name="roomCode">
              {({ field, meta }: FieldProps) => (
                <>
                  <InputField {...field} placeholder="Input a room code" />
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
                <div>Enter Room</div>
              )}
            </SubmitButton>
            <ToggleFormLink onClick={() => toggleFormState("create")}>
              Or create a new room
            </ToggleFormLink>
          </FormContainer>
        </Form>
      </Formik>
    </>
  );
};

export default EnterRoomCode;
