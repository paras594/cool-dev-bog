import Container from "@/components/container/Container";
import RegisterForm from "@/components/registerForm/RegisterForm";
import { registerUser } from "@/lib/action";

const RegisterPage = () => {
  return (
    <Container>
      <div className="flex flex-col items-center">
        <h1 className="text-3xl font-bold mb-16">Register</h1>
        <RegisterForm registerUser={registerUser} />
      </div>
    </Container>
  );
};

export default RegisterPage;
