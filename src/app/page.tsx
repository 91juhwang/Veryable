import { OpsDashboard } from "../components/OpsDashboard";

import type { Op } from "../types";

const OPS_URL = "https://frontend-challenge.veryableops.com/";

async function fetchOps(): Promise<{ ops: Op[]; error: string | null }> {
  try {
    const res = await fetch(OPS_URL, { cache: "no-store" });

    if (!res.ok) {
      return { ops: [], error: `Request failed: ${res.status}` };
    }

    const ops = (await res.json()) as Op[];
    return { ops, error: null };
  } catch (e) {
    const msg = e instanceof Error ? e.message : "Unknown error";
    return { ops: [], error: msg };
  }
}

export default async function Home() {
  const { ops, error } = await fetchOps();
  return <OpsDashboard ops={ops} error={error} />;
}
