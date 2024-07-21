import styled from 'styled-components';

interface Props {
  UserName: string;
  profileImageUrl: string;
}

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

const Avatar = ({ UserName, profileImageUrl }: Props) => {
  const API_BASE_URL = `${import.meta.env.VITE_API_BASE_URL}/profile`;

  const fallbackAvatarImg = `https://ui-avatars.com/api/?name=${encodeURIComponent(UserName)}&background=random`;

  const imageUrl = profileImageUrl 
    ? `${API_BASE_URL}/${profileImageUrl}` 
    : fallbackAvatarImg;

  return (
    <StyledAvatar>
      <AvatarImg src={imageUrl} alt={`Avatar for ${UserName}`} />
      <span>{UserName}</span>
    </StyledAvatar>
  );
};
export default Avatar;
