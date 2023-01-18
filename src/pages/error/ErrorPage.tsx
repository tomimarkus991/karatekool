import { Link } from "react-router-dom";

export const ErrorPage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-[70vh]">
      <p className="mb-3 text-4xl font-varela">404 - Ei leitud</p>
      <Link to="/">
        <p className="text-lg text-primary">Tagasi koju</p>
      </Link>
    </div>
  );
};
