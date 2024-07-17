import React from 'react';
import { FieldError, useFormContext } from 'react-hook-form';
import styled from 'styled-components';

interface Props {
  children: React.ReactNode;
  label?: string;
  id?: string;
}

const StyledFormRow = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  padding: 1.2rem 0;
`;

const Label = styled.label`
  font-weight: 500;
`;

const Error = styled.span`
  font-size: 1.4rem;
  color: var(--color-red-700);
`;

const FormRowVertical = ({ children, label, id }: Props) => {
  const {
    formState: { errors },
  } = useFormContext();

  let error;
  if (id) error = errors[id] as FieldError | undefined;

  return (
    <StyledFormRow>
      <Label htmlFor={id}>{label}</Label>
      {children}
      {error && <Error>{error.message}</Error>}
    </StyledFormRow>
  );
};
export default FormRowVertical;
