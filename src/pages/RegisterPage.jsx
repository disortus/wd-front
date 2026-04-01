import Container from "../components/ui/Container";
import RegisterForm from "../features/auth/components/RegisterForm";

export default function RegisterPage() {
  return (
    <section className="py-16">

      <Container>

        <h1 className="
          text-2xl
          font-semibold
        ">
          Create account
        </h1>

        <div className="mt-8 max-w-md">

          <RegisterForm />

        </div>

      </Container>

    </section>
  );
}