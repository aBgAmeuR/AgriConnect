type ImageLoader = { src: string; width: number; quality: number };

export default function myImageLoader({ src, width, quality }: ImageLoader): string {
  return `${src}`;
}
