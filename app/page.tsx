"use client";
import { useEffect, useRef, useState } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import HouseComponent from "./components/HouseComponent";

const DISMISSED_HOUSES_KEY = "dismissed-house-ids";

export default function Home() {
  const [dismissedIds, setDismissedIds] = useState<number[]>([]);
  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const stored = window.localStorage.getItem(DISMISSED_HOUSES_KEY);
    if (!stored) return;

    const parsed = JSON.parse(stored) as number[];
    setDismissedIds(Array.isArray(parsed) ? parsed : []);
  }, []);

  const handleDismiss = (id: number) => {
    setDismissedIds((current) => {
      const next = Array.from(new Set([...current, id]));
      window.localStorage.setItem(DISMISSED_HOUSES_KEY, JSON.stringify(next));
      return next;
    });
  };

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ["houses"],
      initialPageParam: 1,
      retry: 3,
      retryDelay: 1000,
      queryFn: async ({ pageParam }) => {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_ROUTE}?page=${pageParam}`,
        );

        const data = (await res.json()) as HouseResponse;

        if (!data.ok) {
          throw new Error("Force fail: API error");
        } else {
          return data;
        }
      },

      getNextPageParam: (lastPage, allPages) => {
        if (lastPage.ok) {
          return allPages.length + 1;
        } else {
          return allPages.length;
        }
      },
    });

  useEffect(() => {
    if (!loadMoreRef.current) return;

    const observer = new IntersectionObserver((entries) => {
      const entry = entries[0];

      // Si el usuario llegó al final
      if (entry.isIntersecting && hasNextPage && !isFetchingNextPage) {
        fetchNextPage();
      }
    });

    observer.observe(loadMoreRef.current);

    return () => observer.disconnect();
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);
  return (
    <div style={{ padding: 20 }}>
      <h1>Houses</h1>
      {data?.pages.map((page) =>
        page.houses
          ?.filter((post) => !dismissedIds.includes(post.id))
          .map((post) => (
            <HouseComponent key={post.id} {...post} onDismiss={handleDismiss} />
          )),
      )}

      <div
        ref={loadMoreRef}
        style={{ height: 20, color: "red", border: "1px solid black" }}
      />

      {isFetchingNextPage && <p>Cargando más...</p>}
    </div>
  );
}
