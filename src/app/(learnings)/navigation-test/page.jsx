"use client";
import Container from "@/components/container/Container";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useCallback } from "react";

const NavigationTest = () => {
  // this needs use client to work becoz its a hook
  const router = useRouter();
  const pathname = usePathname(); // doesn't includes query
  const query = useSearchParams(); // query from url: ?q=10

  // query methods
  // query.get("keyName")

  console.log({
    pathname, // /navigation-test
    query,
    q: query.get("q"),
    allValsForQ: query.getAll("q"), // in case a query key has multiple vals
  });

  const handleClick = () => {
    console.log("clicked");
    // INFO: router does client side navigation
    router.push("/");
    // router.replace("/")
    // router.refresh() // makes new request to server and refreshes our components for current page
    // router.back()
    // router.forward()
  };

  // Get a new searchParams string by merging the current
  // searchParams with a provided key/value pair
  const createQueryString = useCallback(
    (name, value) => {
      const params = new URLSearchParams(query.toString());
      params.set(name, value);

      return params.toString();
    },
    [query]
  );

  return (
    <Container>
      <div className="flex flex-col gap-4 justify-start items-start">
        <Link className="btn" href="/" prefetch={false}>
          Go to home (prefetch disabled)
        </Link>
        <button className="btn" onClick={handleClick}>
          Do something & Redirect
        </button>
        <button
          className="btn"
          onClick={() =>
            router.push(pathname + "?" + createQueryString("sort", "asc"))
          }
        >
          update query params with router.push
        </button>
      </div>
    </Container>
  );
};

export default NavigationTest;
