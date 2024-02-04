import Container from "../container/Container";

const Footer = () => {
  return (
    <Container>
      <footer className="flex flex-col sm:flex-row gap-2 px-4 py-6 text-base-content items-center justify-between">
        <p className="font-semibold text-sm md:text-base uppercase text-gray-500">
          Cool Dev
        </p>
        <p className="text-xs text-center md:text-sm text-gray-500">
          Copyright © 2024 - All right reserved by Cool Dev Ltd
        </p>
      </footer>
    </Container>
  );
};

export default Footer;
