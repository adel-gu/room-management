import styled from 'styled-components';

const PhotoInput = styled.input.attrs({ type: 'file' })`
  font-size: 1.4rem;
  border-radius: var(--border-radius-sm);

  &::file-selector-button {
    font: inherit;
    font-weight: 500;
    color: var(--color-brand-50);
    background-color: var(--color-brand-600);
    border: none;
    border-radius: var(--border-radius-sm);
    padding: 0.8rem 1.2rem;
    margin-right: 1.2rem;
    cursor: pointer;
    transition: color 0.2s, background-color 0.2s;

    &:hover {
      background-color: var(--color-brand-700);
    }
  }
`;
export default PhotoInput;
