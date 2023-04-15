import axios from "axios";
import useSWR, { type SWRResponse } from "swr";

/**
 *
 * An object that returns an Axios fetcher where
 * false === param is not an array
 * true === param is an array
 *
 */
export const fetcher = {
  /** if param is not an array then return as it is */
  false: (headers?: any) => (url: string) =>
    axios.get(url, { headers }).then((res) => res.data),
  /**
   * if param is an array then use spread syntax to iterate it and loop over them with Promise.all()
   * */
  true:
    (headers?: any) =>
    (...url: string[]) =>
      Promise.all(
        url.map((path) => axios.get(path, { headers }).then((res) => res.data))
      ),
};

/**
 *
 * A custom fetch hook that can be used in any components,
 * and it will only have one network request at a time
 * even if it is being used in more than one component.
 *
 */

export const useFetch = (
  url: string | string[],
  interval: number,
  headers?: any
): SWRResponse => {
  const isArray: boolean = Array.isArray(url);
  return useSWR(
    /**
     *
     * Sometimes useSWR works like a side effect, and it may receive undefined param
     * and if that is the case, we shoud not send any outgoing network requests
     * with undefined parameter in the url path.
     *
     * If url is undefined, pass null, so it'll not fetch anything.
     *
     */
    url ?? null,
    fetcher[`${isArray}`](headers && headers),
    {
      /** number of milliseconds to re-fetch */
      refreshInterval: interval,
      revalidateOnFocus: true,
      revalidateIfStale: true,
    }
  );
};
