import { useEffect, useRef, useState } from "react";

type FetchState<T> = {
  data: T | null;
  error: string | null;
  loading: boolean;
};

export function useFetch<T>(url: string | null): FetchState<T> {
  const abortRef = useRef<AbortController | null>(null); // always good to have when scaling - filters, race conditions, etc.
  const [state, setState] = useState<FetchState<T>>({
    data: null,
    error: null,
    loading: false,
  });

  useEffect(() => {
    if (!url) {
      setState({ data: null, error: null, loading: false });
      return;
    }

    abortRef.current?.abort();
    const controller = new AbortController();
    abortRef.current = controller;

    setState((s) => ({ ...s, loading: true, error: null }));

    (async () => {
      try {
        const res = await fetch(url, { signal: controller.signal });

        if (!res.ok) {
          throw new Error(`Request failed: ${res.status}`);
        }

        const json = (await res.json()) as T;

        setState({ data: json, error: null, loading: false });
      } catch (e) {
        if (controller.signal.aborted) return;
        const msg = e instanceof Error ? e.message : "Unknown error";
        setState({ data: null, error: msg, loading: false });
      }
    })();

    return () => controller.abort();
  }, [url]);

  return state;
}