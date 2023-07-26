import { Member } from "../../interfaces/room";

type ActionModel = {
  type: string;
  payload: Member[];
};

const reducer = (initialState: Member[] = [], action: ActionModel) => {
  switch (action.type) {
    case "PUSH_MEMBER":
      return action.payload;
    default:
      return initialState;
  }
};

export default reducer;
