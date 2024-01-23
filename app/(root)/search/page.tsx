import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { fetchAllUsers, fetchUser } from "@/lib/actions/user.actions";
import UserCard from "@/components/cards/UserCard";

export default async function Page() {
  const user = await currentUser();

  if (!user) return null;

  const userInfo = await fetchUser(user.id);

  if (!userInfo?.onboarded) redirect("/onboarding");

  // Fetch all users
  const result = await fetchAllUsers({
    userId: user.id,
    searchString: "",
    pageNumber: 1,
    pageSize: 25,
  });

  return (
    <section>
      <h1 className="head-text mt-10">Search</h1>
      {/* Search bar */}
      <div className="mt-14 flex flex-col gap-9">
        {!result.users.length ? (
          <p className="no-result">No users found</p>
        ) : (
          <>
            {result.users.map(({ id, name, username, image }) => (
              <UserCard
                key={id}
                id={id}
                name={name}
                username={username}
                imgUrl={image}
                userType="User"
              />
            ))}
          </>
        )}
      </div>
    </section>
  );
}
