import Container from "@/components/container/Container";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const NotFound = () => {
  return (
    <Container>
      <section className="h-full">
        <div className="flex">
          <div className="m-auto text-center">
            <div className="w-2/3 h-72 mx-auto md:w-96 md:h-96 relative">
              <Image
                src="/images/not-found.svg"
                alt="not found"
                fill
                className="absolute"
              />
            </div>
            <p className="text-sm md:text-base text-accent p-2 mb-4">
              The stuff you were looking for doesn&apos;t exist
            </p>
            <Link href="/" className="btn btn-accent text-white md:px-10">
              Go To Homepage
            </Link>
          </div>
        </div>
      </section>
    </Container>
  );
};

export default NotFound;
