import Container from "@/components/container/Container";
import LoginForm from "@/components/loginForm/LoginForm";
import { handleGithubLogin, loginUser } from "@/lib/action";
import { auth } from "@/lib/auth";
import { FaGithub } from "react-icons/fa6";

const LoginPage = async () => {
  const session = await auth();

  return (
    <Container>
      <div className="flex flex-col items-center">
        <h1 className="text-3xl font-bold mb-16">Login</h1>
        <LoginForm loginUser={loginUser} />
        <form action={handleGithubLogin} className="mt-10">
          <button className="btn btn-neutral md:px-10">
            <span className="text-2xl">
              <FaGithub />
            </span>{" "}
            Login with github
          </button>
        </form>
      </div>
    </Container>
  );
};

export default LoginPage;
