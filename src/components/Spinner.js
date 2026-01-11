import React from "react";
import { Typography } from "@mui/material"; // opsional, bisa dihapus kalau tidak pakai MUI

function Spinner({ message = "Loading..." }) {
  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <div
        style={{
          border: "6px solid #f3f3f3",
          borderTop: "6px solid #3498db",
          borderRadius: "50%",
          width: "50px",
          height: "50px",
          animation: "spin 1s linear infinite",
          margin: "auto"
        }}
      />
      <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}
      </style>
      {/* Bisa pakai Typography MUI atau <p> biasa */}
      <Typography variant="h6" color="primary" style={{ marginTop: "10px" }}>
        {message}
      </Typography>
    </div>
  );
}

export default Spinner;
