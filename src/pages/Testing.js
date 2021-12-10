import React from 'react';

const Testing = () => {
    // var units = {
    //     year  : 24 * 60 * 60 * 1000 * 365,
    //     month : 24 * 60 * 60 * 1000 * 365/12,
    //     day   : 24 * 60 * 60 * 1000,
    //     hour  : 60 * 60 * 1000,
    //     minute: 60 * 1000,
    //     second: 1000
    // }
    // 
    // var rtf = new Intl.RelativeTimeFormat('id', { numeric: 'auto' })
    // 
    // var getRelativeTime = (d1, d2 = new Date()) => {
    //     var elapsed = d1 - d2
    // 
    //     // "Math.abs" accounts for both "past" & "future" scenarios
    //     for (var u in units) 
    //     if (Math.abs(elapsed) > units[u] || u === 'second') 
    //         return rtf.format(Math.round(elapsed/units[u]), u)
    // }
    // 
    // let date = '10 Dec 2021';
    // let time = '18:26:00';
    // 
    // // test-list of dates to compare with current date
    // function handleClick() {
    //     [
    //         // +new Date('04 Dec 2021 08:37:00'),
    //         +new Date(`${date} ${time}`),
    //         '05/12/2015',
    //         +new Date() - units.year,
    //         +new Date() - units.month,
    //         +new Date() - units.day,
    //         +new Date() - units.hour,
    //         +new Date() - units.minute,
    //         +new Date() + units.minute*2,
    //         +new Date() + units.day*7,
    //     ]
    //     .forEach(d => console.log(   
    //         new Date(d).toLocaleDateString(),
    //         new Date(d).toLocaleTimeString(), 
    //         '(Relative to now) →',
    //         getRelativeTime(+new Date(d))
    //     ))
    // }

    return (
        <div className="flex h-screen">
            <h1 className="m-auto">Testing page</h1>
        </div>
    );
}

export default Testing;