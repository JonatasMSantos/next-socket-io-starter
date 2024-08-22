import { NextApiRequest } from "next";

import { NextApiResponseServerIo } from "@/types";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponseServerIo,
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  
  const { name } = req.body

  try {
    const page: any = {
        id: "123",
        content: name
    }

    res?.socket?.server?.io?.emit(page.id, JSON.stringify(page));

    return res.status(200).json(page);
  } catch (error) {
    console.log("[MESSAGES_POST]", error);
    return res.status(500).json({ message: "Internal Error" }); 
  }
}