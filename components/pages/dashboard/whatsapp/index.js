import React,{useState,useEffect} from 'react'
import {
    createColumnHelper,
    flexRender,
    getCoreRowModel,
    useReactTable,
    getPaginationRowModel,
    getFilteredRowModel
  } from '@tanstack/react-table'
import * as XLSX from "xlsx";

import {getCurrentDate} from '../../../../utils/date'
import Card from '../../../presentationals/card/card'

const columnHelper = createColumnHelper()

const columns = [
columnHelper.accessor('created_at', {
    header:'Date',
    cell: info => getCurrentDate(info.getValue()),
    footer: info => info.column.id,
}),
columnHelper.accessor('phone', {
    header:'Phone',
    cell: info => info.getValue(),
    footer: info => info.column.id,
}),
columnHelper.accessor('source', {
    header:'Source',
    cell: info => info.getValue(),
    footer: info => info.column.id,
}),
columnHelper.accessor('promo', {
    header:'Promo',
    cell: info => info.getValue(),
    footer: info => info.column.id,
}),
columnHelper.accessor('cluster', {
    header:'Cluster',
    cell: info => info.getValue(),
    footer: info => info.column.id,
}),
columnHelper.accessor('type', {
    header:'Type',
    cell: info => info.getValue(),
    footer: info => info.column.id,
}),
]

const Whatsapp = () => {
    const [dataWa, setDataWa] = useState([])


    const table = useReactTable({
        data:dataWa,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        pageCount: Math.ceil(dataWa.length / 10) 
    })

    const getDataWa =  async (leadId) => {
        const getData = await fetch(`http://localhost:3000/api/whatsapp`,{
            method:"GET",
        })
        const data = await getData.json()
        setDataWa(data.data)
    }

    const exportWaToExcel = () =>{
        if(!dataWa) return

        const wsDataWa = XLSX.utils.json_to_sheet(dataWa);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, wsDataWa, "Report");

        XLSX.writeFile(wb, `Whatsapp Report.xlsx`);

    }

    useEffect(() => {
        getDataWa()
    }, [])

    return (
        <div className='d-flex dashboard__wrapper'>
            <div className='p-5 w-100'>
                <h4 className='text-center'  style={{fontSize:'12px'}}>DATA WHATSAPP</h4>
                <Card className="p-4">
                    <table className='table'>
                        <thead>
                        {table.getHeaderGroups()?.map(headerGroup => (
                            <tr key={headerGroup.id}>
                            {headerGroup.headers.map(header => (
                                <th key={header.id}>
                                {header.isPlaceholder
                                    ? null
                                    : flexRender(
                                        header.column.columnDef.header,
                                        header.getContext()
                                    )}
                                </th>
                            ))}
                            </tr>
                        ))}
                        </thead>
                        <tbody>
                         {table.getRowModel().rows.map(row => (
                            <tr key={row.id}>
                            {row.getVisibleCells().map(cell => (
                                <td key={cell.id}>
                                {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                </td>
                            ))}
                            </tr>
                        ))}
                        </tbody>
                    </table>
                    <div className="pagination_handler">
                        <div className="next-button me-4">
                            <button
                                className="border rounded p-1"
                                onClick={() => table.setPageIndex(0)}
                                disabled={!table.getCanPreviousPage()}
                                >
                                {'<<'}
                            </button>
                            <button
                                className="border rounded p-1"
                                onClick={() => table.previousPage()}
                                disabled={!table.getCanPreviousPage()}
                                >
                                {'<'}
                            </button>
                            <button
                                className="border rounded p-1"
                                onClick={() => table.nextPage()}
                                disabled={!table.getCanNextPage()}
                                >
                                {'>'}
                            </button>
                            <button
                                className="border rounded p-1"
                                onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                                disabled={!table.getCanNextPage()}
                                >
                                {'>>'}
                            </button>
                        </div>
                        <span className="d-flex align-items-center me-4">
                            <div>Page</div>
                            <strong>
                                {table.getState().pagination.pageIndex + 1} of{' '}
                                {table.getPageCount()}
                            </strong>
                        </span>
                        <span className="d-flex align-items-center me-4">
                            | Go to page:
                            <input
                                type="number"
                                defaultValue={table.getState().pagination.pageIndex + 1}
                                onChange={e => {
                                const page = e.target.value ? Number(e.target.value) - 1 : 0
                                table.setPageIndex(page)
                                }}
                                className="border p-1 rounded w-16"
                            />
                        </span>
                        <select
                            className='me-4'
                            value={table.getState().pagination.pageSize}
                            onChange={e => {
                                table.setPageSize(Number(e.target.value))
                            }}
                            >
                            {[10, 20, 30, 40, 50].map(pageSize => (
                                <option key={pageSize} value={pageSize}>
                                Show {pageSize}
                                </option>
                            ))}
                        </select>
                        <button className="btn btn-primary download-button" onClick={exportWaToExcel}>Download</button>
                    </div>
                </Card>
            </div>
        </div>
    )
}

export default Whatsapp