import "../index.css";
import Box from "@mui/material/Box";
import { Typography } from "@mui/material";
const Introductory = () => {
  return (
    <>
      <Box
        style={{
          textAlign: "center",
          marginTop: "5rem",
        }}
      >
        <Typography variant="h4" gutterBottom>
          Welcome to Taste Hub!
        </Typography>
        <Typography style={{ marginTop: "3rem" }} variant="body1" gutterBottom>
          Explore a world of delicious recipes at your fingertips.
        </Typography>
        <Typography variant="body1" gutterBottom>
          Simply enter an ingredient or dish you want to cook, and we'll provide
          you with a variety of recipes to choose from.
        </Typography>
      </Box>
    </>
  );
};

export default Introductory;
