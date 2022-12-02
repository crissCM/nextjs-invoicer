import styled from 'styled-components';

type FlexContainerProps = {
  inline?: boolean;
  padded?: boolean;
};

export const ExLink = styled.a.attrs({
  target: '_blank',
  rel: 'noopener noreferrer'
})``;

/** General-purpose default container */
export const BaseContainer = styled.section``;

/** Flex-container for displaying items in a row */
export const FlexRow = styled(
  BaseContainer,
)<FlexContainerProps>`
  align-items: center;
  display: ${({ inline }) => (inline ? 'inline-' : '')}flex;
  padding: ${({ padded }) => (padded ? 10 : 0)};
`;

/** Flex-container for displaying items in a column */
export const FlexColumn = styled(FlexRow)`
  flex-direction: column;

  > * {
    width: 100%;
  }
`;

export const GridContainer = styled.div<{ columns?: string }>`
  display: grid;
  grid-template-columns: ${({ columns = "auto auto" }) => columns};
  grid-gap: 0;
`;

const Icon = styled.span.attrs({ className: "material-icons" })``;
export const MatIcon = ({ icon }: { icon: string }) => <Icon>{icon}</Icon>;
