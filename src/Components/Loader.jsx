import { Grid } from "@mui/material";
import PuffLoader from "react-spinners/PuffLoader";

const LoadingPage = () => {
  return (
    <Grid
      container
      sx={{ minHeight: "100vh" }}
      justifyContent={"center"}
      alignItems={"center"}
    >
      <PuffLoader color="#7F00FF" />
    </Grid>
  );
};

export default LoadingPage;
