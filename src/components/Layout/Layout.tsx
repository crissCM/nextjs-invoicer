import { useAlgoUsd } from "src/hooks/usePrice";
import Header from "../Header";

type LayoutProps = {
  children?: React.ReactNode;
};

export default function Layout({ children }: LayoutProps) {
  const algoPrice = useAlgoUsd();
  return (
    <>
      <Header algoPrice={algoPrice} />
      {children}
    </>
  );
}
