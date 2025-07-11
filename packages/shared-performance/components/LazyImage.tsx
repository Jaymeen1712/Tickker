import React, { useEffect, useState } from "react";
import { useIntersectionObserver } from "../hooks/useIntersectionObserver";

interface LazyImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  placeholder?: string;
  fallback?: string;
  threshold?: number;
  className?: string;
  onLoad?: () => void;
  onError?: () => void;
}

/**
 * Lazy loading image component with intersection observer
 */
export function LazyImage({
  src,
  alt,
  placeholder = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='1' height='1'%3E%3C/svg%3E",
  fallback,
  threshold = 0.1,
  className = "",
  onLoad,
  onError,
  ...props
}: LazyImageProps) {
  const [imageSrc, setImageSrc] = useState(placeholder);
  const [imageRef, setImageRef] = useState<HTMLImageElement | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  const { ref, isIntersecting } = useIntersectionObserver({
    threshold,
    freezeOnceVisible: true,
  });

  useEffect(() => {
    if (isIntersecting && !isLoaded && !hasError) {
      setImageSrc(src);
    }
  }, [isIntersecting, src, isLoaded, hasError]);

  const handleLoad = () => {
    setIsLoaded(true);
    onLoad?.();
  };

  const handleError = () => {
    setHasError(true);
    if (fallback) {
      setImageSrc(fallback);
    }
    onError?.();
  };

  return (
    <div
      ref={(node) => {
        if (node) {
          ref.current = node;
        }
      }}
      className={`lazy-image-container ${className}`}
    >
      <img
        ref={setImageRef}
        src={imageSrc}
        alt={alt}
        onLoad={handleLoad}
        onError={handleError}
        className={`lazy-image ${isLoaded ? "loaded" : "loading"} ${
          hasError ? "error" : ""
        }`}
        {...props}
      />
    </div>
  );
}
