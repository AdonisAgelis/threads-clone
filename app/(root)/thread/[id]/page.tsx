import ThreadCard from "@/components/cards/ThreadCard";
import { fetchThreadById } from "@/lib/actions/thread.actions";
import { fetchUser } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";

export default async function ThreadDetails({
  params,
}: {
  params: { id: string };
}) {
  if (!params?.id) return null;

  const user = await currentUser();
  if (!user) return null;

  const userInfo = fetchUser(user.id);
  if (!userInfo) redirect("/onboarding");

  const thread = await fetchThreadById(params.id);

  return (
    <section className="relative">
      <div>
        <ThreadCard
          key={thread._id}
          threadId={thread._id}
          currentUserId={user?.id || ""}
          text={thread.text}
          author={thread.author}
          parentId={thread.parentId}
          community={thread.community}
          createdAt={thread.createdAt}
          comments={thread.children}
        />
      </div>
      {/* We are here (REPLY/COMMENT) */}
    </section>
  );
}
