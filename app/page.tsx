"use client";
import { useEffect, useRef } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import HouseComponent from "./components/HouseComponent";

export default function Home() {
  // Este ref apunta a un div invisible al final de la lista
  const loadMoreRef = useRef<HTMLDivElement | null>(null);
  // Acá vive toda la lógica de datos
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      // @todo: que es esto?
      queryKey: ["houses"],
      initialPageParam: 1,
      // No debería fallar a nivel https pero por las dudas se setean los 2 sig parametros
      retry: 3,
      retryDelay: 1000,
      queryFn: async ({ pageParam }) => {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_ROUTE}?page=${pageParam}`,
        );

        const data = (await res.json()) as HouseResponse;

        if (!data.ok) {
          // @todo: aca tirar error de que falló la api pero reintentamos como un champion
          throw new Error("Force fail: API error");
        } else {
          return data;
        }
      },

      // Le dice a TanStack cómo saber la siguiente página
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
        page.houses?.map((post) => (
          <HouseComponent key={post.id} {...post}></HouseComponent>
        )),
      )}

      {/* Este div dispara el infinite scroll */}
      <div
        ref={loadMoreRef}
        style={{ height: 20, color: "red", border: "1px solid black" }}
      />

      {isFetchingNextPage && <p>Cargando más...</p>}
    </div>
  );
}
