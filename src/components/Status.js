export const Status = ({ value }) => {
    if (value === "accepted") {
        return (
            <div className="inline-flex text-xs text-center text-success font-semibold py-1 px-2 border rounded-2xl bg-successShade">
                {value.toUpperCase()}
            </div>
        );
    } else if (value === "waiting") {
        return (
            <div className="inline-flex text-xs text-center text-gray-500 font-semibold py-1 px-2 border rounded-2xl bg-gray-100">
                {value.toUpperCase()}
            </div>
        );
    } else if (value === "declined") {
        return (
            <div className="inline-flex text-xs text-center text-danger font-semibold py-1 px-2 border rounded-2xl bg-dangerShade">
                {value.toUpperCase()}
            </div>
        );
    } else if (value === "canceled") {
        return (
            <div className="inline-flex text-xs text-center text-warning font-semibold py-1 px-2 border rounded-2xl bg-warningShade">
                {value.toUpperCase()}
            </div>
        );
    }
};