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

export async function getServerSideProps() {
  return {
    props: {}, // will be passed to the page component as props
  };
}
