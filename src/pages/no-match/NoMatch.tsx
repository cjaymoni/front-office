import { useNavigate } from "react-router-dom";

export const NoMatch = () => {
  const navigate = useNavigate();
  return (
    <div className="max-w-screen-xl mx-auto px-4 flex items-center justify-start h-screen md:px-8">
      <div className="max-w-lg mx-auto space-y-3 text-center">
        <h3 className="text-orange-600 font-semibold">404 Error</h3>
        <p className="text-gray-800 text-4xl font-semibold sm:text-5xl">
          Page not found
        </p>
        <p className="text-gray-600">
          Sorry, the page you are looking for could not be found or has been
          removed.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <a
            onClick={() => navigate(-1)}
            className="cursor-pointer block py-2 px-4 text-black   font-medium bg-orange-600 duration-150 hover:bg-orange-500 active:bg-orange-700 rounded-lg"
          >
            Go back
          </a>
          <a
            href="javascript:void(0)"
            className="block py-2 px-4 text-black hover:bg-gray-50 font-medium duration-150 active:bg-gray-100 border rounded-lg"
          >
            Contact support
          </a>
        </div>
      </div>
    </div>
  );
};
