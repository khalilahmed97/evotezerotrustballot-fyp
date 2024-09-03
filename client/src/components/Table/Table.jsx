import React from "react";
import { Box, Typography, Paper } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

const Table = () => {
  const columns = [
    { field: "id", headerName: "ID", width: 300 },
    { field: "name", headerName: "Name", width: 300 },
    { field: "date", headerName: "Date", width: 300 },
    {
      field: "status",
      headerName: "Status",
      width: 300,
      renderCell: (params) => (
        <Typography style={{
          color: params.value === "Voted" ? "#4caf50" : "#f44336",
          fontWeight: "bold",
        }}>
          {params.value}
        </Typography>
      ),
    },
  ];

  const rows = [
    { id: 1, name: "Khalil Ahmed Sharif", date: "8 February 2024", status: "Voted" },
    { id: 2, name: "Shabeeb Raza", date: "8 February 2024", status: "Not Voted" },
    { id: 3, name: "Mustafa Ahmed Khan", date: "8 February 2024", status: "Voted" },
    { id: 4, name: "Mahum Habib", date: "8 February 2024", status: "Not Voted" },
    { id: 5, name: "Hira Kanwal", date: "8 February 2024", status: "Voted" },
    { id: 6, name: "Rayan Sheikh", date: "8 February 2024", status: "Not Voted" },
    { id: 7, name: "Taha Ahmed", date: "8 February 2024", status: "Voted" },
  ];

  // Calculating height based on 3 rows + header height
  const gridHeight = 52 * 3 + 90;  // Height for three rows

  return (
    <Box
      sx={{
        color: "white",
        height: "100%",
        width: "100%",
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        marginTop: "1rem",
        marginBottom: "0rem",
      }}
    >
      <Paper
        elevation={3}
        sx={{
          display: "flex",
          overflow: "hidden",
          borderRadius: 6,
          width: "100%",
        }}
      >
        <Box sx={{ width: "18px", bgcolor: "#074693" }} />
        <DataGrid
          sx={{
            height: `${gridHeight}px`, // Set calculated height
            "& .MuiDataGrid-columnHeaderTitle": {
              color: "#074693",
              fontWeight: "600",
            },
          }}
          rows={rows}
          columns={columns}
        />
      </Paper>
    </Box>
  );
};

export default Table;
