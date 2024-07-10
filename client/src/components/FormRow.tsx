import React from 'react';
import { FieldError, useFormContext } from 'react-hook-form';
import styled from 'styled-components';

interface Props {
  children: React.ReactNode;
  label?: string;
  id?: string;
  ischeckbox?: string;
}

const StyledFormRow = styled.div<{ ischeckbox?: string }>`
  display: grid;
  grid-template-columns: 24rem ${(props) =>
      props.ischeckbox === 'true' ? 'auto' : '1.2fr'} 1.5fr;
  align-items: center;
  gap: 2.4rem;

  padding: 1.2rem 0;

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }

  &:has(button) {
    display: flex;
    justify-content: flex-end;
    gap: 1rem;
  }
`;

const Label = styled.label`
  font-weight: 500;
`;

const Error = styled.span`
  font-size: 1.4rem;
  color: var(--color-red-700);
`;

const FormRow = ({
  children,
  label,
  id,
  ischeckbox: ischeckbox = 'false',
}: Props) => {
  const {
    formState: { errors },
  } = useFormContext();

  let error;
  if (id) error = errors[id] as FieldError | undefined;

  return (
    <StyledFormRow ischeckbox={ischeckbox}>
      <Label htmlFor={id}>{label}</Label>
      {children}
      {error && <Error>{error.message}</Error>}
    </StyledFormRow>
  );
};
export default FormRow;
