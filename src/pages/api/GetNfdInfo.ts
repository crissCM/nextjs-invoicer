// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { Endpoints, apiGet } from "src/utils/requests";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method === "POST") {
      const body = JSON.parse(req.body);
      if (body.nfd) {
        const resp = await apiGet(Endpoints.GetNfdInfo(body.nfd));
        res.status(200).json({
          ownerAddress: resp.owner,
        });
      } else {
        res.status(500).json({ message: "missing address" });
      }
    }
  } catch (error) {
    res.status(500).json({
      error,
    });
  }
}
