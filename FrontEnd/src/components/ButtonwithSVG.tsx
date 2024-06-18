const ButtonWithSVG = ({ pathD, text, action, color }) => {
  return (
    <a
      href="#"
      onClick={action}
      className={`inline-flex items-center justify-center gap-2.5 rounded-full border py-2 px-4 text-center font-medium ${color} hover:bg-opacity-90 lg:px-8 xl:px-10 md:py-3 md:px-6 md:text-base sm:py-2 sm:px-4 sm:text-sm`}
    >
      <span>
        <svg
          className="fill-current"
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d={pathD} />
        </svg>
      </span>
      <span className="text-sm sm:text-base md:text-lg">{text}</span>
    </a>
  );
};

export default ButtonWithSVG;
