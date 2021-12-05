export const Status = ({ value }) => {
  if (value === "accepted") {
      return (
          <div className="text-xs text-center text-green-500 font-semibold py-1 px-2 border rounded-2xl bg-green-100">
              {value}
          </div>
      );
  } else if (value === "waiting") {
      return (
          <div className="text-xs text-center text-yellow-500 font-semibold py-1 px-2 border rounded-2xl bg-yellow-100">
              {value}
          </div>
      );
  } else if (value === "declined") {
      return (
          <div className="text-xs text-center text-red-500 font-semibold py-1 px-2 border rounded-2xl bg-red-100">
              {value}
          </div>
      );
  } else if (value === "canceled") {
      return (
          <div className="text-xs text-center text-gray-500 font-semibold py-1 px-2 border rounded-2xl bg-gray-100">
              {value}
          </div>
      );
  }
};