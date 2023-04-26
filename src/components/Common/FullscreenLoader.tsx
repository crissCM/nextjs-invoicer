import styled from "styled-components";
import { FlexRow } from "./Containers";

const CenteredWrapper = styled(FlexRow)`
    place-content: center
    height: 100vh;
    width: 100vw;
`;

function FullScreenLoader() {
  return <CenteredWrapper>Loading route ...</CenteredWrapper>;
}

export default FullScreenLoader;
