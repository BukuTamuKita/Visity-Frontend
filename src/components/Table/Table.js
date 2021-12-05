import React, { useMemo, useEffect } from 'react';
import { 
    useTable, 
    useSortBy,
    useGlobalFilter,
    usePagination,
    useRowSelect,
    useColumnOrder,
} from 'react-table';
import { Link } from 'react-router-dom';
import { GlobalFilter } from './GlobalFilter';
import { ColumnFilter } from './ColumnFilter';
import { Checkbox } from './Checkbox';
import { AppointmentAction } from '../../pages/AppointmentPage/AppointmentHistory';
import { UserAction } from '../../pages/UserAdmin/UserList';
import { EXPORT_DATA, SHOW_PHOTO } from '../../constants/urls';
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

const Table = ({ columns, data }) => {
    const defaultColumn = useMemo(() => {
        return { 
            Filter: ColumnFilter
        }
    }, []);

    // Custom kolom action
    const actionHooks = (hooks) => {
        if (window.location.pathname !== "/guest-list") {
            hooks.visibleColumns.push((columns) => [
                ...columns,
                {
                    id: "action",
                    Header: "Action",
                    Cell: ({ row }) => {
                        return window.location.pathname === "/appointment-history" ? (
                            <AppointmentAction id={row.values.id} />
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
                            <div>
                                <img 
                                    alt="profile"
                                    src={SHOW_PHOTO(row.values.photo)}
                                    className="w-8 rounded-full" 
                                />
                                <div>
                                    <p>{ row.values.name }</p>
                                    <p>{ row.values.email }</p>
                                </div>
                            </div>
                        )
                    }
                },
            ]);
        }
    };

    // Custom kolom waktu (appointment history)
    // const timeHooks = (hooks) => {
    //     if (window.location.pathname === "/appointment-history") {
    //         hooks.visibleColumns.push((columns) => [
    //             ...columns,
    //             {
    //                 id: "date",
    //                 Header: "Date",
    //                 Cell: ({ row }) => {
    //                     return (
    //                         <div className="flex flex-row items-center gap-2">
    //                             <img 
    //                                 alt="profile"
    //                                 src={SHOW_PHOTO(row.values.photo)}
    //                                 className="w-8 rounded-full" 
    //                             />
    //                             <div>
    //                                 <p>{ row.values.name }</p>
    //                                 <p>{ row.values.email }</p>
    //                             </div>
    //                         </div>
    //                     )
    //                 }
    //             },
    //         ]);
    //     }
    // };

    const tableInstance = useTable({
        columns,
        data,
        defaultColumn,    
        initialState: {
            sortBy: [{
                id: 'id',
                desc: true
            }],
            hiddenColumns: window.location.pathname === "/user-list" ? ["name", "email", "photo"] : [""],
        }
    },
    userHooks,
    actionHooks,
    useGlobalFilter,
    useSortBy,
    usePagination,
    useRowSelect,
    useColumnOrder,
    (hooks) => { 
        hooks.visibleColumns.push((columns) => {
            return [
                {
                    id: 'selection',
                    Header: ({ getToggleAllPageRowsSelectedProps }) => (
                        <Checkbox {...getToggleAllPageRowsSelectedProps()} />
                    ),
                    Cell: ({ row }) => (
                        <Checkbox {...row.getToggleRowSelectedProps()} />
                    ),
                },
                ...columns,
            ]
        })
    },
    );

    const changeOrder = () => {
        setColumnOrder(['id', 'user', 'role']);
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

            {/* <button onClick={changeOrder}>Change order</button> */}

            <div className="flex flex-col">
                <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                        <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">

                            <div className="flex flex-row justify-between items-center p-4 sticky top-0 bg-white border-b border-gray-100">
                                <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />
                                <div className="flex flex-row justify-center items-center gap-5">
                                    {window.location.pathname === "/user-list" &&
                                        <Link to="/user-create">
                                            <button className="flex flex-row gap-2 px-12 py-3.5 rounded-lg text-sm font-medium border-0 focus:outline-none focus:ring transition text-white bg-purple-500 hover:bg-purple-600 active:bg-purple-700 focus:ring-purple-300">
                                                <PlusCircleIcon className="w-6" />
                                                Create
                                            </button>
                                        </Link> 
                                    }
                                    {window.location.pathname === "/appointment-history" &&
                                        <button 
                                            className="flex flex-row gap-2 px-12 py-3.5 rounded-lg text-sm font-medium border-0 focus:outline-none focus:ring transition text-white bg-purple-500 hover:bg-purple-600 active:bg-purple-700 focus:ring-purple-300"
                                            onClick={() => window.open(EXPORT_DATA)}
                                        >
                                            <CloudDownloadIcon className="w-6" />
                                            Export 
                                        </button>
                                    }
                                </div>
                            </div>

                            <table className="w-full" {...getTableProps()}>
                                <thead className="border-b border-gray-100">
                                    {headerGroups.map((headerGroup) => (
                                        <tr {...headerGroup.getHeaderGroupProps()}>
                                            {headerGroup.headers.map((column) => (
                                                <th className="p-2" {...column.getHeaderProps(column.getSortByToggleProps())}>
                                                    <div className="flex flex-row justify-between items-center">
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
                                <tbody {...getTableBodyProps()}>
                                    {page.map((row) => {
                                        prepareRow(row)
                                        return (
                                            <tr className="border-b border-gray-100" {...row.getRowProps()}>
                                                {row.cells.map((cell) => {
                                                    return <td className="p-2" {...cell.getCellProps()}>{cell.render('Cell')}</td>
                                                })}
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </table>

                            <div className="flex flex-row justify-between items-center p-4">
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
                    </div>
                </div>
            </div>
        </>
    )
}

export default Table;