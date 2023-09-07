import Link from "next/link";
import Image from "next/image";

type ThreadCardProps = {
  threadId: string;
  currentUserId: string;
  text: string;
  author: {
    id: string;
    name: string;
    image: string;
  };
  parentId: string | null;
  community: {
    id: string;
    name: string;
    image: string;
  } | null;
  createdAt: string;
  comments: {
    author: {
      image: string;
    };
  }[];
  isComment?: boolean;
};

export default function ThreadCard({
  threadId,
  currentUserId,
  text,
  author,
  parentId,
  community,
  createdAt,
  comments,
}: ThreadCardProps) {
  return (
    <article className="flex flex-col w-full rounded-xl bg-dark-2 p-7">
      <div className="flex items-start justify-between">
        <div className="flex flex-1 gap-4">
          <div className="flex flex-col items-center">
            <Link className="relative h-11 w-11" href={`/profile/${author.id}`}>
              <Image
                className="cursor-pointer rounded-full"
                src={author.image}
                alt="Profile image"
                fill
              />
            </Link>
            <div className="thread-card_bar" />
          </div>
          <div className="flex flex-col w-full">
            <Link className="w-fit" href={`/profile/${author.id}`}>
              <h4 className="cursor-pointer text-base-semibold text-light-1">
                {author.name}
              </h4>
            </Link>
            <p className="mt-2 text-small-regular text-light-2">{text}</p>
            <div className="mt-5 flex flex-col gap-3">
              <div className="flex gap-3.5">
                <Image
                  className="cursor-pointer object-contain"
                  src="/assets/heart-gray.svg"
                  alt="heart"
                  width={24}
                  height={24}
                />
                <Link href={`/thread/${threadId}`}>
                  <Image
                    className="cursor-pointer object-contain"
                    src="/assets/reply.svg"
                    alt="reply"
                    width={24}
                    height={24}
                  />
                </Link>
                <Image
                  className="cursor-pointer object-contain"
                  src="/assets/repost.svg"
                  alt="repost"
                  width={24}
                  height={24}
                />
                <Image
                  className="cursor-pointer object-contain"
                  src="/assets/share.svg"
                  alt="share"
                  width={24}
                  height={24}
                />
              </div>
              {/* We are here */}
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
