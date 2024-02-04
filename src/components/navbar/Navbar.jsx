import Image from "next/image";
import Links from "./links/Links";
import Container from "../container/Container";
import { auth } from "@/lib/auth";
import { handleLogout } from "@/lib/action";
import Link from "next/link";

const Navbar = async () => {
  const session = await auth();

  return (
    <div className="navbar min-h-20">
      <Container>
        <Link
          href="/"
          className="relative flex justify-start w-24 h-12 lg:w-32 lg:h-16 mr-auto"
        >
          <Image
            src="/images/logo.png"
            alt="Cool Dev"
            fill
            className="mix-blend-multiply object-contain"
          />
        </Link>

        <div>
          <Links session={session} handleLogout={handleLogout} />
        </div>
      </Container>
    </div>
  );
};

export default Navbar;
