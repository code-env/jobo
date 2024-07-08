import { PostHack } from "@prisma/client";
import axios from "axios";

export async function getAllHacks() {
  try {
    const res = await axios.get("/api/posthack");

    const data: PostHack[] = await res.data;

    return data;
  } catch (error: any) {
    console.log(error.message);
  }
}
