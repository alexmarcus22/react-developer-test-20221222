import React, { useState } from 'react';
import LoadingSpin from "react-loading-spin";
import Button from '@mui/material/Button';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { useAppDispatch } from '../hooks';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import { CSSProperties } from "react";
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import { fetchAllData } from '../features/data/dataSlice';

interface TableProps {
  getData: ResponseState,
  type: String
};

const errorStyle: CSSProperties = {
  color: "red",
  fontWeight: "bold",
  fontSize: 16,
  verticalAlign: "5%"
};

const tableStyle: CSSProperties = {
  tableLayout: 'fixed',
  marginBottom: '48px',
  boxShadow: '0px 0px 2px 1px rgba(0,0,0,0.2)'
};

const iconStyle: CSSProperties = {
  width: '16px',
  height: '16px',
  verticalAlign: 'middle'
}


export const TableData = ({ getData, type }: TableProps) => {
  const { data, loading, errResp } = getData;
  const dispatch = useAppDispatch();
  const [sortDesc, setSort] = useState<Boolean>(false);
  const arrow = (sortDesc) ? <ArrowUpwardIcon style={iconStyle} /> : <ArrowDownwardIcon style={iconStyle} />

  const handleLoadMore = () => {
    dispatch(fetchAllData(sortDesc, type));
  }

  return (
    <Table style={tableStyle}>
      <TableHead>
        <TableRow>
          <TableCell scope="col" onClick={() => !loading ? setSort(!sortDesc) : null}>Date {arrow}</TableCell>
          <TableCell scope="col">UserID</TableCell>
          <TableCell scope="col">Old Value</TableCell>
          <TableCell scope="col">New Value</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {data.length > 0 && data.slice().sort((a, b) => {
          if (sortDesc) return a.timestamp - b.timestamp;
          return b.timestamp - a.timestamp;
        }).map((key) => {
          const date = new Date(key.timestamp);
          return (
            <TableRow key={key.id}>
              <TableCell>
                {date.toLocaleDateString("sv")}
              </TableCell>
              <TableCell>
                {key.id}
              </TableCell>
              <TableCell>
                {key.diff[0].oldValue}
              </TableCell>
              <TableCell>
                {key.diff[0].newValue}
              </TableCell>
            </TableRow>
          )
        })}
        <TableRow>
          <TableCell colSpan={4} className='table-button'>
            {!loading ? (errResp.errMsg.length <= 0 ? <Button variant="contained" onClick={() => handleLoadMore()}>Load More</Button> : <div>
              <div style={errorStyle}>We had problems fetching your data. Please try again.</div>
              <Button variant="contained" onClick={() => handleLoadMore()}>Retry</Button>
            </div>) : <LoadingSpin />}
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  )
}

export default TableData;