const MuiCard = {
  styleOverrides: {
    root: {
      margin: "5vh",
      padding: "10vh",
      cursor: "pointer",
      transition: "0.3s",
      "&:hover": { backgroundColor: "#f5f5f5" },
      display: "flex",
      flexDirection: "column",
      alignItems: "center", 
      justifyContent: "center", 
      gap: "20px",
    }
  }
}

export default MuiCard;