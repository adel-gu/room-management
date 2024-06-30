import styled from 'styled-components';

const StyledAvatar = styled.div`
  display: flex;
  align-items: center;
  gap: 1.2rem;

  font-weight: 500;
  font-size: 1.4rem;
  color: var(--color-grey-600);
`;

const AvatarImg = styled.img`
  display: block;
  width: 4rem;
  aspect-ratio: 1;
  object-fit: cover;
  object-position: center;
  border-radius: 50%;
  outline: 2px solid var(--color-gray-100);
`;

const Avatar = () => {
  return (
    <StyledAvatar>
      <AvatarImg />
      <span>UserName</span>
    </StyledAvatar>
  );
};
export default Avatar;
