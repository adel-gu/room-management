import styled, { css } from 'styled-components';

interface WrapperProps {
  direction?: 'hr' | 'vr';
}

const Wrapper = styled.div<WrapperProps>`
  display: flex;

  ${(props) =>
    (props.direction ?? 'vr') === 'hr' &&
    css`
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
    `}

  ${(props) =>
    (props.direction ?? 'vr') === 'vr' &&
    css`
      flex-direction: column;
      gap: 2rem;
    `}
`;
export default Wrapper;
