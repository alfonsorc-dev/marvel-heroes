import type { Comic } from "@/models/api/ComicAPI.model";
import "./ComicCard.scss";
import { useMemo } from "react";
import { ImageFormat } from "@/enums/image.enum";
import { CardWithSpinner } from "../with-spinner/WithSpinner";

export type ComicCardProps = Pick<Comic, "title" | "thumbnail"> & {
  dates: Comic["dates"];
};

export const ComicCard = ({
  title,
  dates,
  thumbnail: { path, extension },
}: ComicCardProps) => {
  const year = useMemo(() => {
    const date = dates.find((d) => d.type === "onsaleDate");
    return date ? new Date(date.date).getFullYear() : "";
  }, [dates]);

  return (
    <div className="comic-card">
      <CardWithSpinner
        renderContent={(isLoading, onLoad) => (
          <>
            <img
              loading="lazy"
              src={`${path}/${ImageFormat.PORTRAIT_FANTASTIC}.${extension}`}
              alt={title}
              onLoad={onLoad}
              style={isLoading ? { visibility: "hidden" } : {}}
            />
            {!isLoading && (
              <div className="comic-card__info">
                <h2>{title}</h2>
                <p>{year}</p>
              </div>
            )}
          </>
        )}
      />
    </div>
  );
};
