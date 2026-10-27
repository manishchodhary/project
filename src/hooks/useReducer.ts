import { useEffect, useReducer } from "react";

function favoritesReducer(favorites: string[], id: string) {
  if (favorites.includes(id)) {
    return favorites.filter((item) => item !== id);
  }

  return [...favorites, id];
}

function getFavorites(): string[] {
  try {
    const saved = JSON.parse(localStorage.getItem("favorites") || "[]");

    if (
      Array.isArray(saved) &&
      saved.every((id) => typeof id === "string")
    ) {
      return saved;
    }

    return [];
  } catch {
    return [];
  }
}

export default function useFavorites() {
  const [favorites, dispatch] = useReducer(
    favoritesReducer,
    undefined,
    getFavorites
  );

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  return { favorites, dispatch };
}