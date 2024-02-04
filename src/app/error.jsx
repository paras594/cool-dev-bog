"use client";

import Container from "@/components/container/Container";
import Image from "next/image";
import Link from "next/link";

const Error = () => {
  return (
    <Container className="h-full">
      <div class="h-full flex items-center">
        <div class="container flex flex-col md:flex-row items-center justify-center px-5 text-gray-700">
          <div class="max-w-md order-2 md:order-1">
            <div class="text-5xl font-dark font-bold">500</div>
            <p class="text-2xl md:text-3xl font-light leading-normal">
              Oops! Something went wrong on our side.
            </p>
            <p class="mb-8 mt-2">But dont worry, we will resolve this asap.</p>

            <Link href="/" class="btn btn-accent text-white">
              Go to homepage
            </Link>
          </div>
          <div class="w-5/6 h-64 md:w-96 relative md:h-96 order-1 md:order-2">
            <Image src="/images/error-page-illustration.svg" alt="error" fill />
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Error;
