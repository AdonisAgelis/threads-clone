import { fetchUserThreads } from "@/lib/actions/user.actions";
import { redirect } from "next/navigation";
import ThreadCard from "../cards/ThreadCard";

type ThreadsTabProps = {
  currentUserId: string;
  accountId: string;
  accountType: string;
};

export default async function ThreadsTab({
  currentUserId,
  accountId,
  accountType,
}: ThreadsTabProps) {
  const result = await fetchUserThreads(accountId);

  if (!result) redirect("/");

  return (
    <section className="mt-9 flex flex-col gap-10">
      {result.threads.map((thread: any) => (
        <ThreadCard
          key={thread._id}
          threadId={thread._id}
          currentUserId={currentUserId || ""}
          text={thread.text}
          author={
            accountType === "User"
              ? { name: result.name, image: result.image, id: result.id }
              : {
                  name: thread.author.name,
                  image: thread.author.image,
                  id: thread.author.id,
                }
          }
          parentId={thread.parentId}
          community={thread.community}
          createdAt={thread.createdAt}
          comments={thread.children}
        />
      ))}
    </section>
  );
}
