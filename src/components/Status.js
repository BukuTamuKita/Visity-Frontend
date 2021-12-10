// import { Chip } from '@mui/material';
// import { COLORS } from '../constants/colors';
// 
// export const Status = ({ value }) => {
//     if (value === "accepted") {
//         return (
//             <Chip 
//                 label={value.toUpperCase()}
//                 sx={{
//                     fontWeight: "bold",
//                     color: COLORS.success,
//                     backgroundColor: COLORS.successShade,
//                 }}
//             />
//         );
//     } else if (value === "waiting") {
//         return (
//             <Chip 
//                 label={value.toUpperCase()}
//                 sx={{
//                     fontWeight: "bold",
//                     color: "#77757C",
//                     backgroundColor: "#F0EEF6",
//                 }}
//             />
//         );
//     } else if (value === "declined") {
//         return (
//             <Chip 
//                 label={value.toUpperCase()}
//                 sx={{
//                     fontWeight: "bold",
//                     color: COLORS.danger,
//                     backgroundColor: COLORS.dangerShade,
//                 }}
//             />
//         );
//     } else if (value === "canceled") {
//         return (
//             <Chip 
//                 label={value.toUpperCase()}
//                 sx={{
//                     fontWeight: "bold",
//                     color: COLORS.warning,
//                     backgroundColor: COLORS.warningShade,
//                 }}
//             />
//         );
//     }
// };

export const Status = ({ value }) => {
    if (value === "accepted") {
        return (
            <div className="text-xs text-center text-success font-semibold py-1 px-2 border rounded-2xl bg-successShade">
                {value.toUpperCase()}
            </div>
        );
    } else if (value === "waiting") {
        return (
            <div className="text-xs text-center text-gray-500 font-semibold py-1 px-2 border rounded-2xl bg-gray-100">
                {value.toUpperCase()}
            </div>
        );
    } else if (value === "declined") {
        return (
            <div className="text-xs text-center text-danger font-semibold py-1 px-2 border rounded-2xl bg-dangerShade">
                {value.toUpperCase()}
            </div>
        );
    } else if (value === "canceled") {
        return (
            <div className="text-xs text-center text-warning font-semibold py-1 px-2 border rounded-2xl bg-warningShade">
                {value.toUpperCase()}
            </div>
        );
    }
};