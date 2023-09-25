import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <section className="auth auth-bg">
      <SignIn />;
    </section>
  );
}
