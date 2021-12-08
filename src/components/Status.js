export const Status = ({ value }) => {
    if (value === "accepted") {
        return (
            <p className="w-24 text-xs text-center text-success font-semibold py-1 border rounded-2xl bg-successShade">
                {value.toUpperCase()}
            </p>
        );
    } else if (value === "waiting") {
        return (
            <p className="w-24 text-xs text-center text-gray-600 font-semibold py-1 border rounded-2xl bg-gray-300">
                {value.toUpperCase()}
            </p>
        );
    } else if (value === "declined") {
        return (
            <p className="w-24 text-xs text-center text-danger font-semibold py-1 border rounded-2xl bg-dangerShade">
                {value.toUpperCase()}
            </p>
        );
    } else if (value === "canceled") {
        return (
            <p className="w-24 text-xs text-center text-warning font-semibold py-1 border rounded-2xl bg-warningShade">
                {value.toUpperCase()}
            </p>
        );
    }
};