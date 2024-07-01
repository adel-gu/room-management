import { Oval } from 'react-loader-spinner';
import styled from 'styled-components';

interface Props {
  size?: number;
  color?: string;
}

const StyledSpinner = styled.div`
  margin-inline: auto;
`;
const Spinner = ({ size = 50, color = '#4f46e5' }: Props) => {
  return (
    <StyledSpinner>
      <Oval
        visible={true}
        height={size}
        width={size}
        color={color}
        secondaryColor={color}
        strokeWidth={5}
      />
    </StyledSpinner>
  );
};
export default Spinner;
