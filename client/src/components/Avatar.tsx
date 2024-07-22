import { useGetCurrentAdmin } from '../hooks/admins';
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
  const { admin } = useGetCurrentAdmin();
  const API_BASE_URL = `${import.meta.env.VITE_API_BASE_URL}/profile`;


  if (!admin) return null;

  const fallbackAvatarImg = `https://ui-avatars.com/api/?name=${encodeURIComponent(admin.name)}&background=random`;

  const imageUrl = admin.image 
    ? `${API_BASE_URL}/${admin.image}` 
    : fallbackAvatarImg;

  return (
    <StyledAvatar>
      <AvatarImg src={imageUrl} alt={`Avatar for ${admin.name}`} />
      <span>{admin.name}</span>
    </StyledAvatar>
  );
};
export default Avatar;
