import NextAuth from "next-auth";
import { authConfig } from "./lib/auth.config";

export default NextAuth(authConfig).auth;

export const config = {
  matcher: ["/((?!api|static|.*\\..*|_next).*)"],
  // Explanation of the regex string used in config.matcher
  // The regex: "/((?!api|static|.*\\..*|_next).*)"

  /*
  - The "/" at the beginning and end are delimiters indicating the start and end of the regex pattern.
  - The ".*" matches any character (except for line terminators) zero or more times.
  - The "(?!...)" is a negative lookahead assertion that ensures a given pattern is not ahead.
  - "api|static|.*\\..*|_next" inside the negative lookahead is a pattern that the regex is ensuring does not exist.
    - "api" matches the characters "api" literally.
    - "static" matches the characters "static" literally.
    - ".*\\..*" matches any character followed by a literal dot and then any character again, which typically represents files with extensions.
    - "_next" matches the characters "_next" literally.
  - The final ".*" after the negative lookahead matches any character (except for line terminators) zero or more times.

  In summary, this regex matches any string that does not contain "api", "static", a dot (representing file extensions), or "_next".
  */
};

/*
matcher allows you to filter middleware to run 
(or not run like in this example) on specific paths.
If you don't any matcher, middleware will be invoked
for every route in your project.

*/
