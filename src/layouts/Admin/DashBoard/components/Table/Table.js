import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import "./Table.css";

function createData(name, trackingId, date, status) {
  return { name, trackingId, date, status };
}

const rows = [
  createData("Điện thoại cũ", 123123, "tháng 6", "cháy hàng"),
  createData("Điện thoại mới ", 1, "tháng 6", "còn ít"),
  createData("Máy tính", 623, "tháng 6", "còn nhiều"),
  createData("Tai nghe", 323, "tháng 6", "còn ít"),
];


const makeStyle = (status) => {
  if (status === 'còn nhiều') {
    return {
      background: 'rgb(145 254 159 / 47%)',
      color: 'green',
    }
  }
  else if (status === 'cháy hàng') {
    return {
      background: '#ffadad8f',
      color: 'red',
    }
  }
  else {
    return {
      background: '#59bfff',
      color: 'white',
    }
  }
}

export default function BasicTable() {
  return (
    <div className="Table">
      <h3>Sản phẩm gần đây</h3>
      <TableContainer
        component={Paper}
        style={{ boxShadow: "0px 13px 20px 0px #80808029" }}
      >
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Sản Phẩm</TableCell>
              <TableCell align="left">Số lượng mua</TableCell>
              <TableCell align="left">Ngày</TableCell>
              <TableCell align="left">tình trạng</TableCell>
              <TableCell align="left">Xem chi tiết</TableCell>
            </TableRow>
          </TableHead>
          <TableBody style={{ color: "white" }}>
            {rows.map((row) => (
              <TableRow
                key={row.name}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell align="left">{row.trackingId}</TableCell>
                <TableCell align="left">{row.date}</TableCell>
                <TableCell align="left">
                  <span className="status" style={makeStyle(row.status)}>{row.status}</span>
                </TableCell>
                <TableCell align="left" className="Details">Chi tiết</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
