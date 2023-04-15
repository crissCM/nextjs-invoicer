import { useEffect, useMemo, useState } from "react";
import { useFetch } from "./useFetch";

export interface Price {
  assetId: number;
  averagePrice: number;
}

/**
 *
 * A custom hook that fetches HDL price in USD every 2 sec
 *
 */
export const useHdlUsd = (): number => {
  const { data } = useFetch("https://api.myalgo.com/asset/prices", 4200);

  const price = useMemo(() => {
    if (data) {
      const filtered = data.find((item: Price) => item.assetId === 137594422);
      return filtered.averagePrice.toFixed(3);
    }
    return undefined;
  }, [data]);

  return price;
};

export interface AlgoUsd {
  price?: number;
  priceChange?: string;
  noData: boolean;
}
/**
 *
 * A custom hook that fetches Algo price in USD
 *
 */
export const useAlgoUsd = (): AlgoUsd[] | undefined => {
  const [price, setPrice] = useState<AlgoUsd[] | undefined>([]);
  const now = Math.floor(Date.now() / 1000);
  const start = now - 86400; // 24h

  const { data } = useFetch(
    `https://price.algoexplorerapi.io/price/algo-usd/history?since=${start}&until=${now}&interval=1H`,
    60000
  );

  useEffect(() => {
    if (data?.history) {
      const oldPrice = data.history[0].high;
      const newPrice = data.history[data.history.length - 1].high;
      const priceChange = (((newPrice - oldPrice) / oldPrice) * 100).toFixed(2);

      setPrice([{ price: newPrice, priceChange, noData: false }]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data?.history]);

  return price;
};
