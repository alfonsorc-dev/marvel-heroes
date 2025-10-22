import { ImageFormat } from "@/enums/image.enum";
import "./CardImage.scss";

export interface CardImageProps {
  imageSrc: { path: string; extension: string };
  alt?: string;
  className?: string;
}

const CardImage: React.FC<CardImageProps> = ({
  imageSrc,
  alt = "",
  className,
}) => (
  <img
    className={`card-image ${className}`}
    srcSet={`
              ${imageSrc.path}/${ImageFormat.CARD_IMAGE_STANDARD}.${imageSrc.extension} 180w,
              ${imageSrc.path}/${ImageFormat.CARD_IMAGE_BIG}.${imageSrc.extension} 1200w
          `}
    sizes={`(max-width: 1024px) var(--card-image-width), var(--card-image-width-desktop)`}
    src={`${imageSrc.path}/${ImageFormat.CARD_IMAGE_STANDARD}.${imageSrc.extension}`}
    alt={alt}
  />
);

export default CardImage;
