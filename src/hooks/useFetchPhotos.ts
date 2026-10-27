import { useEffect, useState } from "react";

export type Photo = {
  id: string;
  author: string;
  download_url: string;
};

export default function useFetchPhotos() {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchPhotos() {
      try {
        const response = await fetch(
          "https://picsum.photos/v2/list?limit=30"
        );

        if (!response.ok) {
          throw new Error("Failed to fetch photos");
        }

        const data: Photo[] = await response.json();
        setPhotos(data);
      } catch {
        setError("Unable to load photos. Please try again.");
      } finally {
        setLoading(false);
      }
    }

    fetchPhotos();
  }, []);

  return { photos, loading, error };
}