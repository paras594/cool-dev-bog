// HANDLING THE HYDRATION ISSUES
// explanation: when using "use client", we face hydration issue if server and client code is different
// Ex-1: using useState to check for client
// Ex-2: separate the component & dynamic import with ssr disabled

// "use client"; enable this for Ex-1

import Container from "@/components/container/Container";
import dynamic from "next/dynamic";
import Image from "next/image";
// import { useEffect, useState } from "react";
const HydrationTestNoSSR = dynamic(() => import("./HydrationTest"), {
  ssr: false,
});

export const metadata = {
  title: "Contact",
  description: "Contact us for cool dev collaboration",
};

const ContactPage = () => {
  // Ex-1
  // const [isClient, setIsClient] = useState(false);

  // Ex-1
  // const a = Math.random();

  // Ex-1
  // useEffect(() => {
  //   setIsClient(true);
  // }, []);

  return (
    <Container className="h-full mb-32">
      <div className="grid lg:grid-cols-2 gap-4 h-full py-8">
        <div className="relative  min-h-40 lg:h-full">
          <Image
            src="/images/contact-illustration.svg"
            alt="contact cool dev"
            fill
          />
        </div>
        {/* Ex-1 */}
        {/* {isClient &&a} */}

        {/* Ex-2 */}
        {/* <HydrationTestNoSSR /> */}
        <div className="">
          <h1 className="mb-6 text-center lg:text-left max-w-lg mx-auto text-2xl sm:text-3xl lg:text-4xl font-semibold text-accent">
            Reach Out To Us!
          </h1>
          <form action="" className="max-w-lg mx-auto flex flex-col gap-4">
            <input
              type="text"
              placeholder="Full Name"
              className="input input-bordered w-full"
            />
            <input
              type="email"
              placeholder="Email Address"
              className="input input-bordered w-full"
            />
            <input
              type="number"
              placeholder="Phone Number (optional)"
              className="input input-bordered w-full"
            />
            <div>
              <textarea
                className="textarea resize-none textarea-bordered w-full"
                placeholder="Message"
              ></textarea>
            </div>
            <button className="btn btn-block btn-secondary">Send</button>
          </form>
        </div>
      </div>
    </Container>
  );
};

export default ContactPage;
