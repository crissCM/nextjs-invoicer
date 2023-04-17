import { getBlockchainNetwork } from "@jackcom/reachduck";
import { NFD } from ".";

/* Endpoints */
export const Endpoints = {
  GetNfdInfoApi: "/api/GetNfdInfo",
  GetNfdInfo: (nfdName: string) =>
    `${NFD[getBlockchainNetwork()]}/nfd/${nfdName}`,
};

export async function apiGet(url: string, headers = {}) {
  try {
    const response = await fetch(url, {
      method: "get",
      headers: { ...headers },
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("apiGet ERROR:", error);
  }
  return null;
}

export async function apiPost(url: string, body: any, headers = {}) {
  try {
    const response = await fetch(url, {
      method: "post",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "multipart/form-data",
        ...headers,
      },
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("apiPost ERROR:", error);
  }
  return null;
}

export async function fetchGraphQl(query: string, variables = {}, jwt = null) {
  const apiBaseUrl = process.env.subqlApiBaseUrl;
  const headers: any = {
    "Content-Type": "application/json",
  };
  if (jwt !== null) {
    headers.Authorization = `Bearer ${jwt}`;
  }
  const res = await fetch(`${apiBaseUrl}/graphql`, {
    method: "POST",
    headers,
    body: JSON.stringify({
      query,
      variables,
    }),
  });
  const json = await res.json();
  console.log("----- jsonn:", json);
  if (json.errors) {
    console.error(json.errors);
    throw new Error("Failed to fetch API");
  }
  return json.data;
}

/**
 * Fetch the owner algo address of an NFD.
 * @param nfd NFD domain.
 */
export async function fetchNfdAddress(nfd: string) {
  const nfdsResp = await apiPost(Endpoints.GetNfdInfoApi, {
    nfd,
  });
  return nfdsResp.ownerAddress;
}

export const Apis = {
  GetInvoicesNumber: `
    query($address: String!) {
      invoices(filter: { creatorId: { equalTo: $address } }) {
        totalCount
      }
    }
  `,
};
