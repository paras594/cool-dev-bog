import Container from "@/components/container/Container";
import Image from "next/image";
import Link from "next/link";

export default async function HomePage() {
  return (
    <Container className="h-full mb-32">
      <div className="grid lg:grid-cols-2 gap-4 h-full">
        <div className="flex flex-col justify-center order-2 lg:order-1">
          <h2 className="text-center lg:text-left text-xl sm:text-2xl md:text-3xl font-semibold text-accent mb-2">
            Welcome to the Cool Dev Blog
          </h2>
          <h1 className="text-center lg:text-left text-3xl sm:text-4xl md:text-5xl font-semibold mb-4 text-secondary">
            Empowering Devs Through Knowledge and Insights
          </h1>
          <p className="text-center lg:text-left text-base md:text-lg text-gray-600">
            Stay updated with the latest trends and techniques in programming
            world
          </p>
          <div className="flex justify-center lg:justify-start gap-4 mt-12">
            <Link
              href="/blog"
              className="btn btn-accent text-white md:px-10 xl:btn-wide"
            >
              Start Exploring
            </Link>
            <Link href="/contact" className="btn md:px-10 xl:btn-wide">
              Get In Touch
            </Link>
          </div>
        </div>
        <div className="flex items-center order-1 lg:order-2">
          <div className="relative  flex-1 h-60 md:h-72 lg:h-full">
            <Image
              src="/images/cool-dev-illustration.svg"
              alt="cool dev"
              fill
            />
          </div>
        </div>
      </div>
    </Container>
  );
}
