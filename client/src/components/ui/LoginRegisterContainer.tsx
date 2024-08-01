import styled from 'styled-components';

const LoginRegisterContainer = styled.div`
  min-height: 100vh;
  display: grid;
  grid-template-columns: auto;
  align-content: center;
  justify-content: center;
  gap: 3.2rem;
  background-color: var(--color-grey-50);

  & > span {
    text-align: center;

    & > a {
      color: var(--color-brand-500);

      &:hover {
        text-decoration: underline;
      }
    }
  }
`;

export default LoginRegisterContainer;
