import { Heart } from "lucide-react";
import type { Photo } from "../hooks/useFetchPhotos";

type Props = {
  photo: Photo;
  favorite: boolean;
  onToggle: (id: string) => void;
};

export default function PhotoCard({
  photo,
  favorite,
  onToggle,
}: Props) {
  return (
    <article className="photo-card group mb-5 break-inside-avoid">
      <div className="relative overflow-hidden rounded-2xl bg-zinc-100 shadow-sm transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-xl">
        <img
          src={photo.download_url}
          alt={`Photo by ${photo.author}`}
          loading="lazy"
          className="block h-auto w-full transition-transform duration-500 ease-out group-hover:scale-105"
        />

        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

        <button
          type="button"
          onClick={() => onToggle(photo.id)}
          aria-label={
            favorite ? "Remove from favourites" : "Add to favourites"
          }
          aria-pressed={favorite}
          className={`absolute right-3 top-3 flex size-10 items-center justify-center rounded-full shadow-md backdrop-blur-md transition-all duration-300 ${
            favorite
              ? "scale-100 bg-white text-rose-500"
              : "scale-90 bg-white/90 text-zinc-800 opacity-100 sm:translate-y-2 sm:opacity-0 sm:group-hover:translate-y-0 sm:group-hover:scale-100 sm:group-hover:opacity-100"
          }`}
        >
          <Heart
            size={20}
            strokeWidth={2}
            className={`transition-transform duration-200 ${
              favorite ? "fill-rose-500" : ""
            }`}
          />
        </button>

        <div className="absolute inset-x-0 bottom-0 flex items-center justify-between p-4 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
          <p className="truncate text-sm font-medium text-white">
            {photo.author}
          </p>

          <span className="ml-3 shrink-0 rounded-full bg-white/20 px-3 py-1 text-xs text-white backdrop-blur-md">
            Photo
          </span>
        </div>
      </div>

      <p className="mt-2 truncate px-1 text-sm font-medium text-zinc-700 transition-colors group-hover:text-black">
        {photo.author}
      </p>
    </article>
  );
}