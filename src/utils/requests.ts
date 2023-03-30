import { getBlockchainNetwork } from "@jackcom/reachduck";
import { NFD } from ".";

/* Endpoints */
export const Endpoints = {
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
