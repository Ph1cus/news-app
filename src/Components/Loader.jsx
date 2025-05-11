import { CircularProgress, Box } from "@mui/material";

const Loader = () => (
  <Box
    sx={{
      position: "fixed",
      top: 0,
      left: 0,
      width: "100vw",
      height: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "rgba(255,255,255,0.6)",
      zIndex: 9999,
    }}
  >
    <CircularProgress />
  </Box>
);

export default Loader;
