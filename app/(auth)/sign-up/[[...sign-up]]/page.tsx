import { SignUp } from "@clerk/nextjs";

export default function Page() {
  return (
    <section className="auth auth-bg bg-cyan-600">
      <SignUp />
    </section>
  );
}
