import styled from "styled-components";
import { useSelector } from "react-redux";
import { RootState } from "../../state/store";

const MemberListContainer = styled.div`
  display: flex;
  align-items: center;
`;

const MemberListItem = styled.img`
  height: 30px;
  width: 30px;
  border-radius: 50%;
  background-color: unset;
`;

const MemberList: React.FC = () => {
  const members = useSelector((state: RootState) => state.members);

  return (
    <>
      <MemberListContainer>
        {members?.map((member, index) => (
          <MemberListItem key={index} src={member.photo_url} />
        ))}
      </MemberListContainer>
    </>
  );
};

export default MemberList;
