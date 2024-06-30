import { MoonLoader } from 'react-spinners';
import styled from 'styled-components';

const StyledSpinner = styled(MoonLoader)`
  margin-inline: auto;
`;
const Spinner = () => {
  return <StyledSpinner size={50} color="#4f46e5" speedMultiplier={0.5} />;
};
export default Spinner;
