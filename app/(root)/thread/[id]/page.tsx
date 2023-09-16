import ThreadCard from "@/components/cards/ThreadCard";
import Comment from "@/components/forms/Comment";
import { fetchThreadById } from "@/lib/actions/thread.actions";
import { fetchUser } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";

export default async function Page({ params }: { params: { id: string } }) {
  if (!params?.id) return null;

  const user = await currentUser();
  if (!user) return null;

  const userInfo = await fetchUser(user.id);
  if (!userInfo) redirect("/onboarding");

  const thread = await fetchThreadById(params.id);
  const { _id, text, author, parentId, community, createdAt, children } =
    thread;

  return (
    <section className="relative">
      <div>
        <ThreadCard
          key={_id}
          threadId={_id}
          currentUserId={user?.id || ""}
          text={text}
          author={author}
          parentId={parentId}
          community={community}
          createdAt={createdAt}
          comments={children}
        />
      </div>
      <div className="mt-7">
        <Comment
          threadId={thread._id}
          currentUserImage={userInfo.image}
          currentUserId={JSON.stringify(userInfo._id)}
        />
      </div>
      <div className="mt-10">
        {thread.children.map((child: any) => (
          <ThreadCard
            key={child._id}
            threadId={child._id}
            currentUserId={user?.id || ""}
            text={child.text}
            author={child.author}
            parentId={child.parentId}
            community={child.community}
            createdAt={child.createdAt}
            comments={child.children}
            isComment
          />
        ))}
      </div>
    </section>
  );
}
