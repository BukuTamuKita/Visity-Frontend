import React, { useMemo, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
    useTable, 
    useSortBy,
    useGlobalFilter,
    usePagination,
    useRowSelect,
    useColumnOrder,
} from 'react-table';
import { 
    ChevronDoubleLeftIcon, 
    ChevronDoubleRightIcon, 
    ChevronLeftIcon, 
    ChevronRightIcon 
} from '@heroicons/react/solid';
import { 
    SwitchVerticalIcon, 
    CloudDownloadIcon, 
    PlusCircleIcon 
} from '@heroicons/react/outline';
// import Checkbox from './Checkbox';
import { Styles } from './TableStyles';
import { GlobalFilter } from './GlobalFilter';
import { ColumnFilter } from './ColumnFilter';
import { UserAction } from '../../pages/UserAdmin/UserList';
import { EXPORT_DATA, SHOW_PHOTO } from '../../constants/urls';
import { GuestAction } from '../../pages/GuestAdmin/GuestList';
import { convertTime } from '../../utils/utility';

const Table = ({ columns, data }) => {
    const defaultColumn = useMemo(() => {
        return { 
            Filter: ColumnFilter
        }
    }, []);

    // Custom kolom action
    const actionHooks = (hooks) => {
        if (window.location.pathname !== "/appointment-history") {
            hooks.visibleColumns.push((columns) => [
                ...columns,
                {
                    id: "action",
                    Header: "Action",
                    Cell: ({ row }) => {
                        console.log("action: ", row.values);
                        return window.location.pathname === "/guest-list" ? (
                            <GuestAction id={row.values.id} />
                        ) : (
                            <UserAction id={row.values.id} /> 
                        )
                    }
                },
            ]);
        }
    };

    // Custom kolom user (user list)
    const userHooks = (hooks) => {
        if (window.location.pathname === "/user-list") {
            hooks.visibleColumns.push((columns) => [
                ...columns,
                {
                    id: "user",
                    Header: "User",
                    Cell: ({ row }) => {
                        return (
                            <div className="flex flex-row gap-4">
                                <img 
                                    alt="profile"
                                    src={row.values.photo.includes("http") ? row.values.photo : SHOW_PHOTO(row.values.photo)}
                                    className="w-10 h-10 rounded-full" 
                                />
                                <div className="flex flex-col">
                                    <p className="font-semibold">{ row.values.name }</p>
                                    <p className="text-xs text-gray-400">{ row.values.email }</p>
                                </div>
                            </div>
                        )
                    }
                },
            ]);
        }
    };

    // Custom kolom waktu (appointment history)
    const timeHooks = (hooks) => {
        let pathname = window.location.pathname;
        if (pathname === '/appointment-history' || pathname === '/guest-list') {
            hooks.visibleColumns.push((columns) => [
                {
                    id: "time",
                    Header: "Time",
                    Cell: ({ row }) => {
                        console.log("row: ", row.values.date_time[1]);
                        return (
                            <p>{ row.values.date_time[1] }</p>
                        )
                    }
                },
                {
                    id: "date",
                    Header: "Date",
                    Cell: ({ row }) => {
                        console.log("row: ", row.values.date_time[0]);
                        return (
                            <div className="flex flex-col">
                                <p className="font-medium">{ row.values.date_time[0] }</p>
                                <p className="text-xs text-gray-400">{ convertTime(row.values.date_time[0], row.values.date_time[1]) }</p>
                            </div>
                        )
                    }
                },
                ...columns,
            ]);
        }
    };

    const nameHooks = (hooks) => {
        let pathname = window.location.pathname;
        if (pathname === '/appointment-history' || pathname === '/guest-list') {
            hooks.visibleColumns.push((columns) => [
                ...columns,
                {
                    id: "newHost",
                    Header: "Host Name",
                    Cell: ({ row }) => {
                        return (
                            <p>{ row.values.host.name }</p>
                        )
                    }
                },
                {
                    id: "newGuest",
                    Header: "Guest Name",
                    Cell: ({ row }) => {
                        return (
                            <p>{ row.values.guest.name }</p>
                        )
                    }
                },
            ]);
        }
    };

    const hideColumns = () => {
        let pathname = window.location.pathname;

        if (pathname === '/user-list') {
            return ['name', 'email', 'photo'];
        } else if (pathname === '/guest-list') {
            return ['id', 'purpose', 'notes', 'status', 'date_time', 'host', 'guest'];
        } else if (pathname === '/appointment-history') {
            return ['id', 'purpose', 'notes', 'date_time', 'host', 'guest'];
        } else {
            return [""];
        }
    }

    const tableInstance = useTable({
        columns,
        data,
        defaultColumn,    
        initialState: {
            sortBy: [{
                id: 'id',
                desc: true
            }],
            hiddenColumns: hideColumns(),
        }
    },
    userHooks,
    nameHooks,
    timeHooks,
    actionHooks,
    useGlobalFilter,
    useSortBy,
    usePagination,
    useRowSelect,
    useColumnOrder,
    // (hooks) => { 
    //     hooks.visibleColumns.push((columns) => {
    //         return [
    //             {
    //                 id: 'selection',
    //                 Header: ({ getToggleAllPageRowsSelectedProps }) => (
    //                     <Checkbox {...getToggleAllPageRowsSelectedProps()} />
    //                 ),
    //                 Cell: ({ row }) => (
    //                     <Checkbox {...row.getToggleRowSelectedProps()} />
    //                 ),
    //             },
    //             ...columns,
    //         ]
    //     })
    // },
    );

    const changeOrder = () => {
        let pathname = window.location.pathname;
        if (pathname === '/appointment-history') {
            setColumnOrder(['time', 'date', 'newHost', 'newGuest','status']);
        } else if (pathname === '/user-list') {
            setColumnOrder(['id', 'user', 'role']);
        }
    }

    useEffect(() => {
        changeOrder();
    }, []);

    const { 
        getTableProps,
        getTableBodyProps, 
        headerGroups,
        page,
        nextPage,
        previousPage,
        canNextPage,
        canPreviousPage,
        pageOptions,
        gotoPage,
        pageCount,
        setPageSize,
        prepareRow,
        state,
        setGlobalFilter,
        // selectedFlatRows,
        setColumnOrder, 
    } = tableInstance;

    const { 
        globalFilter, 
        pageIndex, 
        pageSize, 
        // selectedRowIds 
    } = state;
    
    return (
        <>
            {/* <pre>
                <code>
                    {JSON.stringify(
                        {
                            pageIndex,
                            pageSize,
                            pageCount,
                            canNextPage,
                            canPreviousPage,
                        },
                        null,
                        2,
                    )}
                </code>
            </pre>
            <pre className="mb-4">
                <code>
                    {JSON.stringify(
                        {
                            selectedRowIds: selectedRowIds,
                            'selectedFlatRows[].original': selectedFlatRows.map(
                                d => d.original
                            ),
                        },
                        null,
                        2,
                    )}
                </code>
            </pre> */}
            <Styles>
                <div className="tableWrap shadow-lg">
                    <div className="flex flex-row justify-between items-center px-6 py-4 sticky top-0 bg-white border-b border-gray-100">
                        <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />
                        <div>
                            {window.location.pathname === "/user-list" &&
                                <Link to="/user-create">
                                    <button className="primary-btn">
                                        <PlusCircleIcon className="w-6" />
                                        Create
                                    </button>
                                </Link> 
                            }
                            {window.location.pathname === "/appointment-history" &&
                                <button
                                    className="primary-btn"
                                    onClick={() => window.open(EXPORT_DATA)}
                                >
                                    <CloudDownloadIcon className="w-6" />
                                    Export 
                                </button>
                            }
                        </div>
                    </div>

                    <table className="border-b border-gray-100" {...getTableProps()}>
                        <thead>
                            {headerGroups.map((headerGroup) => (
                                <tr className="bg-gray-50 h-14 border-b border-gray-100" {...headerGroup.getHeaderGroupProps()}>
                                    {headerGroup.headers.map((column) => (
                                        <th className="px-6 text-sm font-semibold" {...column.getHeaderProps(column.getSortByToggleProps())}>
                                            <div className="flex flex-row items-center gap-4">
                                                {column.render('Header')}
                                                <span>
                                                    {/* {column.isSorted? (column.iSortedDesc ? ' 🔽' : ' 🔼') : ''} */}
                                                    {column.isSorted ? (
                                                        column.iSortedDesc ? (
                                                            <SwitchVerticalIcon className="text-gray-500 w-4" /> 
                                                        ) : (
                                                            <SwitchVerticalIcon className="text-gray-500 w-4" />) 
                                                        )
                                                    : ''}
                                                </span>
                                            </div>
                                        </th>
                                    ))}
                                </tr>
                            ))}
                        </thead>
                        <tbody className="text-sm text-gray-900" {...getTableBodyProps()}>
                            {page.map((row) => {
                                prepareRow(row)
                                return (
                                    window.location.pathname === "/guest-list" ? (
                                        row.values.status === "waiting" && (
                                            <tr 
                                                {...row.getRowProps()}
                                                className="h-14 border-b border-gray-100"
                                            >
                                                {row.cells.map((cell) => {
                                                    return (
                                                        <td 
                                                            className="px-6"
                                                            {...cell.getCellProps()}
                                                        >
                                                            {cell.render('Cell')}
                                                        </td>
                                                    ) 
                                                })}
                                            </tr>
                                        )
                                    ) : (
                                        <tr className="h-14 border-b border-gray-100" {...row.getRowProps()}>
                                            {row.cells.map((cell) => {
                                                return (
                                                    <td 
                                                        className="px-6"
                                                        {...cell.getCellProps()}
                                                    >
                                                        {cell.render('Cell')}
                                                    </td>
                                                ) 
                                            })}
                                        </tr>
                                    )
                                )
                            })}
                        </tbody>
                    </table>

                    <div className="pagination flex flex-row justify-between items-center p-4">
                        <div>
                            Displaying <strong>10</strong> of <strong>{data.length}</strong> data -  
                            Page <strong>{pageIndex + 1}</strong> of <strong>{pageOptions.length}</strong>
                        </div>
                        <div className="flex flex-row justify-center items-center gap-4">
                            <div>
                                <input 
                                    type="number" 
                                    defaultValue={pageIndex + 1} 
                                    onChange={(e) => {
                                        const pageNumber = e.target.value ? Number(e.target.value) - 1 : 0;
                                        gotoPage(pageNumber); 
                                    }}
                                    className="block w-16 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                />
                            </div>
                            <select 
                                value={pageSize} 
                                onChange={(e) => setPageSize(Number(e.target.value))}
                                className="block w-20 py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            >
                                {[10, 25, 50].map((pageSize) => (
                                    <option key={pageSize} value={pageSize}>
                                        { pageSize }
                                    </option>
                                ))}
                            </select>
                            <div className="flex flex-row gap-2">
                                <button className="p-1 bg-white rounded-full hover:bg-gray-100" onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
                                    <ChevronDoubleLeftIcon className="text-gray-500 w-6" />
                                </button>
                                <button className="p-1 bg-white rounded-full hover:bg-gray-100" onClick={() => previousPage()} disabled={!canPreviousPage}>
                                    <ChevronLeftIcon className="text-gray-500 w-6" />
                                </button>
                                <button className="p-1 bg-white rounded-full hover:bg-gray-100" onClick={() => nextPage()} disabled={!canNextPage}>
                                    <ChevronRightIcon className="text-gray-500 w-6" />
                                </button>
                                <button className="p-1 bg-white rounded-full hover:bg-gray-100" onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
                                    <ChevronDoubleRightIcon className="text-gray-500 w-6" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </Styles>
        </>
    )
}

export default Table;