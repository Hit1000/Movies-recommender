const Footer = () => {
  return (
    <footer className="py-6 md:px-8 md:py-0 bg-black text-white border-t border-gray-800">
      <div className="flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
        <p className="text-balance text-center text-sm leading-loose text-muted-foreground md:text-left">
          Built by{" "}
          <a
            href="https://github.com/Hit1000"
            target="_blank"
            rel="noopener noreferrer" // Added rel for security
            className="font-medium underline underline-offset-4"
          >
            <span className="transition-transform duration-300 ease-in-out hover:scale-125 inline-block underline">
              HiT
            </span>
          </a>
          . The source code is available on{" "}
          <a
            href="https://github.com/Hit1000"
            target="_blank"
            rel="noopener noreferrer" // Added rel for security
            className="font-medium underline underline-offset-4"
          >
            <span className="transition-transform duration-300 ease-in-out hover:scale-125 inline-block underline">
            GitHub
            </span>
          </a>
          .
        </p>
      </div>
    </footer>
  );
};

export default Footer;