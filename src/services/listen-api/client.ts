import { Client } from "podcast-api";

const API_KEY = process.env.VUE_APP_LISTEN_API_KEY || null;

export const client = Client({ apiKey: API_KEY });
