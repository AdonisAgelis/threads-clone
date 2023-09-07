import { fetchThreads } from "@/lib/actions/thread.actions";
import { currentUser } from "@clerk/nextjs";
import ThreadCard from "@/components/cards/ThreadCard";

export default async function Home() {
  const { threads, nextPage } = await fetchThreads(1, 30);
  const user = await currentUser();

  return (
    <>
      <h1 className="head-text text-left">Home</h1>
      <section className="mt-9 flex flex-col gap-10">
        {!threads?.length ? (
          <p className="no-result">No threads found</p>
        ) : (
          <>
            {threads.map(
              ({
                _id,
                text,
                author,
                parentId,
                community,
                createdAt,
                children,
              }) => (
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
              )
            )}
          </>
        )}
      </section>
    </>
  );
}
