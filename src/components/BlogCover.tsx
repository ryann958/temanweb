import Image from "next/image";

type BlogCoverProps = {
  imageUrl: string | null;
  sizes: string;
};

export default function BlogCover({ imageUrl, sizes }: BlogCoverProps) {
  const image = imageUrl?.startsWith("/") && !imageUrl.startsWith("//") ? imageUrl : "/hero-light-bg.png";

  return (
    <Image
      src={image}
      alt=""
      fill
      sizes={sizes}
      className="object-cover"
    />
  );
}
