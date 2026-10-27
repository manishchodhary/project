import {
  useCallback,
  useMemo,
  useState,
  type ChangeEvent,
} from "react";
import Header from "./components/Header";
import SearchBar from "./components/SearchBar";
import PhotoCard from "./components/PhotoCard";
import useFetchPhotos from "./hooks/useFetchPhotos";
import useFavorites from "./hooks/useReducer";

export default function App() {
  const { photos, loading, error } = useFetchPhotos();
  const { favorites, dispatch } = useFavorites();
  const [search, setSearch] = useState("");

  const handleSearch = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setSearch(event.target.value);
    },
    []
  );

  const filteredPhotos = useMemo(
    () =>
      photos.filter((photo) =>
        photo.author.toLowerCase().includes(search.trim().toLowerCase())
      ),
    [photos, search]
  );

  return (
    <main className="min-h-screen bg-white px-4 py-5 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-[1800px]">
        <Header />

        <div className="mt-8">
          <SearchBar search={search} onSearch={handleSearch} />
        </div>

        <section className="pt-6">
          <h2 className="mb-5 text-xl font-semibold tracking-tight">
            Explore photos
          </h2>

          {loading ? (
            <div className="flex flex-col items-center justify-center py-20">
              <div className="size-9 animate-spin rounded-full border-4 border-gray-200 border-t-black" />
              <p className="mt-4 text-sm text-gray-500">
                Loading photos...
              </p>
            </div>
          ) : error ? (
            <p className="py-12 text-center text-red-600">{error}</p>
          ) : filteredPhotos.length === 0 ? (
            <p className="py-12 text-center text-gray-500">
              No photos found.
            </p>
          ) : (
            <div className="columns-2 gap-3 sm:columns-3 sm:gap-4 lg:columns-4 xl:columns-5 2xl:columns-6">
              {filteredPhotos.map((photo) => (
                <div key={photo.id} className="break-inside-avoid">
                  <PhotoCard
                    photo={photo}
                    favorite={favorites.includes(photo.id)}
                    onToggle={dispatch}
                  />
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}