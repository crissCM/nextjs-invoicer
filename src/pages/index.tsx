import { useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";
import ActiveNotifications from "../components/ActiveNotifications";
import Home from "../routes/Home";
import store from "../state";

function App() {
  const [loading, setLoading] = useState(false);

  /* Wallet Connect QR modal dismissal listener */
  /* if (typeof window !== "undefined") {
    window.addEventListener("error", (event) => {
      const error = event.error.toString();
      if (error.includes(ERROR_QRCODE_MODAL_USER_CLOSED)) {
        console.log(error);
        window.location.reload();
      }
    });
  } */

  useEffect(() => {
    const onLoading = (s: any) => setLoading(s.loading as boolean);
    const unsubLoading = store.subscribeToKeys(onLoading, ["loading"]);

    return function unsubAll() {
      unsubLoading();
    };
  });

  return (
    <div>
      <ActiveNotifications />
      <section className="App">
        {loading && (
          <div className="FullScreenLoading">
            <Spinner
              className="loadingSpinner"
              animation="border"
              role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          </div>
        )}
        <Home />
      </section>
    </div>
  );
}

export default App;

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
    revalidate: 10, // TODO In seconds
  };
}
