import App from "src/App";

export default function Home(props: any) {
  console.log("props: ", props);
  return <App />;
}

// This function gets called at build time on server-side.
// It may be called again, on a serverless function, if
// revalidation is enabled and a new request comes in
export async function getStaticProps() {
  // const res = await fetch('https://.../posts')
  // const posts = await res.json()
  const nothing = "";

  return {
    props: {
      nothing,
    },
    // Next.js will attempt to re-generate the page:
    // - When a request comes in
    // - At most once every 10 seconds
    revalidate: 10, // In seconds
  };
}
