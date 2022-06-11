import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import "./Table.css";
import numeral from  "numeral";

const TableData = ({AllcountryData}) => {
    return (
        <Table className="table">
               <TableBody>
                   {
                     AllcountryData.map((data)=>{
                       return (
                         <tr>
                            <th>{data.country}</th>
                            <th>{numeral(data.cases).format("0,0")}</th>
                         </tr>
                       )
                     })
                   }
               </TableBody>
           </Table>
    )
}

export default TableData;
