export const capitalizeFirstLetter = (words) => {
    if (words) {
        words = '' + words;
        const arr = words.split(' ');

        for (let i = 0; i < arr.length; i++) {
            arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1).toLowerCase();
        }

        const result = arr.join(' ');

        return result;
    }

    return '';
};

export const dataURLtoFile = (url, filename) => {
    let arr = url.split(','),
        mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]),
        n = bstr.length,
        u8arr = new Uint8Array(n);

    while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
    }

    return new File([u8arr], filename, { type: mime });
};

export const convertTime = (date, time) => {
    const units = {
        year  : 24 * 60 * 60 * 1000 * 365,
        month : 24 * 60 * 60 * 1000 * 365/12,
        day   : 24 * 60 * 60 * 1000,
        hour  : 60 * 60 * 1000,
        minute: 60 * 1000,
        second: 1000
    };
    
    const rtf = new Intl.RelativeTimeFormat('en', { numeric: 'auto' });

    const getRelativeTime = (d1, d2 = new Date()) => {
        let elapsed = d1 - d2;
    
        // "Math.abs" accounts for both "past" & "future" scenarios
        for (let u in units) {
            if (Math.abs(elapsed) > units[u] || u === 'second') {
                return rtf.format(Math.round(elapsed / units[u]), u)
            }
        }
    }

    date = date.substr(4, date.length);

    return getRelativeTime(+new Date(`${date} ${time}`));
};

