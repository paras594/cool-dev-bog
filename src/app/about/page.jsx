import Image from "next/image";
import Container from "@/components/container/Container";

const stats = [
  {
    id: "stat-1",
    label: "Years of Exp.",
    stat: "6+",
  },
  {
    id: "stat-2",
    label: "Blogs Written",
    stat: "20+",
  },
  {
    id: "stat-3",
    label: "Total Users",
    stat: "2.5K+",
  },
];

const ourValues = [
  {
    id: "value-1",
    image: "/images/knowledge-sharing-illustration.svg",
    title: "Open Knowledge Sharing",
    body: "We believe in freely sharing knowledge to foster a collaborative learning environment.",
  },
  {
    id: "value-2",
    image: "/images/collaboration-illustration.svg",
    title: "Inclusivity",
    body: "Everyone is welcome at Cool Dev, regardless of experience level, background, or identity.",
  },
  {
    id: "value-3",
    image: "/images/learning-illustration.svg",
    title: "Continuous Learning",
    body: "We embrace the ever-evolving nature of coding and encourage continuous learning and improvement.",
  },
];

export const metadata = {
  title: "About",
  description: "Know more about cool dev and their values",
};

const AboutPage = () => {
  return (
    <Container className="">
      <section className="min-h-[80vh] grid lg:grid-cols-2 gap-4">
        <div className="flex flex-col justify-center order-2 lg:order-1">
          <h2 className="text-center lg:text-left text-2xl md:text-3xl font-semibold text-accent mb-8">
            About Cool Dev Blog
          </h2>
          <h1 className="text-center lg:text-left text-xl mb-4 text-secondary">
            <span className="font-semibold">Cool Dev</span> was born out of a
            shared love for coding and a desire to create a space where
            developers of all levels could come together to learn, grow, and
            share their experiences.
          </h1>
          <h1 className="text-center lg:text-left text-xl mb-10 lg:mb-8 text-secondary">
            <span className="font-semibold">Our mission is clear:</span> to
            demystify coding and empower individuals to unlock their full
            potential in the world of software development.
          </h1>
          <div className="">
            <div className="stats stats-vertical md:stats-horizontal w-full shadow">
              {stats.map((stat) => (
                <div className="stat text-center md:text-left" key={stat.id}>
                  <div className="stat-title">{stat.label}</div>
                  <div className="stat-value">{stat.stat}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="flex items-center justify-center order-1 lg:order-2">
          <div className="relative  w-4/5 h-60 md:h-72 lg:h-full">
            <Image
              src="/images/cool-dev-illustration-2.svg"
              alt="cool dev"
              fill
            />
          </div>
        </div>
      </section>

      <div className="h-24 lg:h-12" />

      <section className="">
        <h2 className="text-center lg:text-left text-2xl md:text-3xl font-semibold text-accent mb-8">
          Our Values
        </h2>
        <div className="flex flex-wrap justify-center gap-8">
          {ourValues.map((value) => (
            <div
              key={value.id}
              className="card  flex-1 basis-24 bg-base-100 shadow-md border"
            >
              <figure className="relative w-full h-32 mt-4">
                <Image src={value.image} alt="Shoes" fill />
              </figure>
              <div className="card-body text-center">
                <h2 className="card-title self-center">{value.title}</h2>
                <p className="text-gray-500">{value.body}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <div className="h-24" />
    </Container>
  );
};

export default AboutPage;
