import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import { useMediaQuery, Grid, Paper } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import InputAdornment from "@mui/material/InputAdornment";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { useTransition, animated } from "react-spring";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "../index.css";

const HomePage = () => {
  const isXs = useMediaQuery("(max-width:600px)");
  const isMd = useMediaQuery("(max-width:960px)");

  // Define the width for different screen sizes
  const paperWidth = isXs ? "100%" : isMd ? "50%" : "33.33%";
  const [searchQuery, setSearchQuery] = useState("");
  const [showButtons, setShowButtons] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleSearchChange = (value) => {
    setSearchQuery(value);
  };

  const handleSearch = () => {
    // Implement your search functionality here
    console.log("Searching for:", searchQuery);
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex < items.length - 1 ? prevIndex + 1 : prevIndex
    );
  };

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : prevIndex));
  };

  const items = [
    { id: 1, content: "Content 1", color: "red" },
    { id: 2, content: "Content 2", color: "blue" },
    { id: 3, content: "Content 3", color: "green" },
    { id: 4, content: "Content 4", color: "orange" },
    { id: 5, content: "Content 5", color: "purple" },
    { id: 6, content: "Content 6", color: "pink" },
    { id: 7, content: "Content 7", color: "cyan" },
    { id: 8, content: "Content 8", color: "teal" },
  ];

  const visibleItems = items.slice(currentIndex, currentIndex + items.length);
  // const visibleItems = items.slice(
  //   currentIndex,
  //   currentIndex + (isXs ? 1 : isMd ? 2 : 3)
  // );

  // if (isXs) {
  //   // In extra-small (xs) screens, show only 1 item at a time
  //   // If the current item index is the last one, prevent it from going out of bounds
  //   if (currentIndex === items.length - 1) {
  //     visibleItems.pop(); // Remove the extra item if we're at the last item
  //   }
  // }

  const buttonTransitions = useTransition(showButtons, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
  });

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12} md={12} lg={12}>
          <h1>Food Hub</h1>
        </Grid>
        <Grid item xs={12} md={12} lg={12} align="center">
          <TextField
            label="Search for recipes"
            variant="outlined"
            onChange={(e) => handleSearchChange(e.target.value)}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleSearch}>
                    <SearchIcon />
                  </IconButton>
                </InputAdornment>
              ),
            }}
            sx={{
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "black",
                  borderRadius: "2rem",
                },
                "&:hover fieldset": {
                  borderColor: "black",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "black",
                },
              },
            }}
          />
        </Grid>
      </Grid>

      <Carousel
        showThumbs={false}
        centerMode={true}
        selectedItem={currentIndex}
        onChange={setCurrentIndex}
        emulateTouch={true}
        centerSlidePercentage={isXs ? 100 : isMd ? 50 : 33.33}
        dynamicHeight={true}
        showStatus={false}
        className="slider-container"
      >
        {visibleItems.map((item) => (
          <div key={item.id}>
            <Paper
              elevation={15}
              style={{
                height: "60vh",
                width: isXs ? "80%" : isMd ? "60%" : "100%",
                margin: "0 auto",
                padding: isXs ? "5rem" : isMd ? "0 12rem" : "0 15rem",
                background: item.color,
                width: paperWidth,
              }}
            >
              {item.content}
            </Paper>
          </div>
        ))}
      </Carousel>

      {buttonTransitions(
        (styles, item) =>
          item && (
            <animated.div style={styles}>
              <Box style={{ marginTop: "2rem", textAlign: "center" }}>
                <Button onClick={handlePrevious}>Previous</Button>
                <Button onClick={handleNext}>Next</Button>
              </Box>
            </animated.div>
          )
      )}
    </>
  );
};

export default HomePage;
