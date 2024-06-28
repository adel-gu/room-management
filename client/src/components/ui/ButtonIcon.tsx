import styled from 'styled-components';

const ButtonIcon = styled.button`
  background: none;
  border: none;
  border-radius: 0.8rem;
  padding: 0.4rem 0.6rem;
  transition: all ease-in 5ms;
  color: var(--color-brand-600);

  &:hover {
    background-color: var(--color-grey-100);
  }

  & > svg {
    width: 2rem;
    color: var(--color-brand-600);
  }
`;

export default ButtonIcon;
