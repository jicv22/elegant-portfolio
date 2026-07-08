import type { ProjectMediaItem } from "@/lib/projects/types";
import Image from "next/image";

type ProjectMediaGalleryProps = {
  cover: {
    src: string;
    alt: string;
  };
  gallery: ProjectMediaItem[];
};

export function ProjectMediaGallery({
  cover,
  gallery,
}: ProjectMediaGalleryProps) {
  const hasGallery = gallery.length > 0;

  return (
    <div className="project-detail-gallery">
      <figure className="project-detail-gallery__hero">
        <Image
          src={cover.src}
          alt={cover.alt}
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 70vw"
          className="project-detail-gallery__image"
        />
      </figure>

      {hasGallery ? (
        <div className="project-detail-gallery__grid">
          {gallery.map((item, index) => {
            if (item.type === "image") {
              return (
                <figure
                  key={`${item.src}-${index}`}
                  className="project-detail-gallery__item"
                >
                  <Image
                    src={item.src}
                    alt={item.alt}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="project-detail-gallery__image"
                  />
                  {item.caption ? (
                    <figcaption className="project-detail-gallery__caption">
                      {item.caption}
                    </figcaption>
                  ) : null}
                </figure>
              );
            }

            return (
              <figure
                key={`${item.videoId}-${index}`}
                className="project-detail-gallery__item project-detail-gallery__item--video"
              >
                <iframe
                  src={`https://www.youtube-nocookie.com/embed/${item.videoId}`}
                  title={item.title}
                  loading="lazy"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  className="project-detail-gallery__video"
                />
                <figcaption className="project-detail-gallery__caption">
                  {item.title}
                </figcaption>
              </figure>
            );
          })}
        </div>
      ) : (
        <p className="project-detail-gallery__placeholder">
          Galería preparada para imágenes y videos. El material visual se añadirá
          próximamente.
        </p>
      )}
    </div>
  );
}
