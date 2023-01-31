import CloudHeader from "../CloudHeader";

type LayoutProps = {
  children?: React.ReactNode;
};

export default function Layout({ children }: LayoutProps) {
  return (
    <>
      <CloudHeader />
      <main>{children}</main>
    </>
  );
}
