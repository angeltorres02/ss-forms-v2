export const Loading = () => {
  return (
    <div className="fixed inset-0 flex justify-center items-center">
      <div className="flex items-center space-x-1">
        <div
          className="h-3 w-3 bg-gray-800 rounded-full animate-bounce "
          style={{ animationDelay: "0s" }}
        ></div>
        <div
          className="h-3 w-3 bg-gray-800 rounded-full animate-bounce"
          style={{ animationDelay: "0.2s" }}
        ></div>
        <div
          className="h-3 w-3 bg-gray-800 rounded-full animate-bounce"
          style={{ animationDelay: "0.4s" }}
        ></div>
      </div>
    </div>
  );
};
