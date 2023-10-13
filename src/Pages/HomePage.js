import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import { useMediaQuery, Grid, Paper, Typography } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import InputAdornment from "@mui/material/InputAdornment";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { useTransition, animated } from "react-spring";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "../index.css";
import axios from "axios";

const HomePage = () => {
  const isXs = useMediaQuery("(max-width:600px)");
  const isMd = useMediaQuery("(max-width:960px)");

  const [searchQuery, setSearchQuery] = useState("");
  const [showButtons, setShowButtons] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [flipped, setFlipped] = useState(null);

  const handleFlip = (uri) => {
    if (flipped === uri) {
      setFlipped(null);
    } else {
      setFlipped(uri);
    }
  };

  //states for recipe

  const [recipe, setRecipe] = useState([]);

  const handleSearchChange = (value) => {
    setSearchQuery(value);
  };

  const handleSearch = () => {
    const APP_ID = "a42a6bf7";
    const APP_KEY = "469b1b8e24bc3797a13c9d0a451c25de";
    // Implement your search functionality here
    // console.log("Searching for:", searchQuery);
    axios
      .get(
        `https://api.edamam.com/search?q=${searchQuery}&app_id=${APP_ID}&app_key=${APP_KEY}`
      )
      .then((res) => {
        const hits = res.data.hits;

        const result = hits.map((res) => res.recipe);
        setRecipe(result);
      });
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === recipe.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handlePrevious = () =>
    setCurrentIndex((prevIndex) =>
      prevIndex > 0 ? prevIndex - 1 : recipe.length - 1
    );

  const buttonTransitions = useTransition(showButtons, {
    from: { opacity: 5 },
    enter: { opacity: 5 },
    leave: { opacity: 5 },
  });
  console.log(recipe);
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
      <Box style={{ marginBottom: "5rem", height: "45vh" }}>
        <Carousel
          showThumbs={false}
          centerMode={isXs ? false : isMd ? false : true}
          selectedItem={currentIndex}
          onChange={setCurrentIndex}
          emulateTouch={false}
          centerSlidePercentage={isXs ? 100 : isMd ? 60 : 33.33}
          dynamicHeight={false}
          showStatus={true}
          showIndicators={false}
          className="slider-container"
          renderArrowPrev={() => <div />}
          renderArrowNext={() => <div />}
        >
          {recipe?.map((recipes) => (
            <Paper
              key={recipes.uri}
              elevation={15}
              style={{
                height: isXs ? "60vh" : isMd ? "40vh" : "35vh",
                padding: isXs ? "5rem" : isMd ? "0 3rem" : "0 2rem",
                textAlign: "center",
                margin: "1rem",
              }}
              className={`recipe-card ${
                flipped === recipes.uri ? "flipped" : ""
              }`}
              onClick={() => handleFlip(recipes.uri)}
            >
              <Box className="recipe-card-inner">
                {flipped === recipes.uri ? (
                  // Display content when card is flipped
                  <Box
                    className="flipped-content"
                    style={{ paddingTop: "4rem" }}
                  >
                    <Grid container spacing={2}>
                      <Grid item xs={6}>
                        <Typography variant="subtitle1">
                          Cuisine Type:
                        </Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography variant="body1">
                          {recipes.cuisineType && recipes.cuisineType.length > 0
                            ? recipes.cuisineType.join(", ")
                            : "N/A"}
                        </Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography variant="subtitle1">
                          Diet Labels:
                        </Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography variant="body1">
                          {recipes.dietLabels && recipes.dietLabels.length > 0
                            ? recipes.dietLabels.join(", ")
                            : "N/A"}
                        </Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography variant="subtitle1">Dish Type:</Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography variant="body1">
                          {recipes.dishType && recipes.dishType.length > 0
                            ? recipes.dishType.join(", ")
                            : "N/A"}
                        </Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography variant="subtitle1">Meal Type:</Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography variant="body1">
                          {recipes.mealType && recipes.mealType.length > 0
                            ? recipes.mealType.join(", ")
                            : "N/A"}
                        </Typography>
                      </Grid>
                      <Grid item xs={12} style={{ paddingTop: "2rem" }}>
                        <Typography variant="body1">
                          more details ...{" "}
                        </Typography>
                      </Grid>
                    </Grid>
                  </Box>
                ) : (
                  // Display initial content when card is not flipped
                  <Box
                    className="initial-content"
                    style={{ paddingTop: "2rem" }}
                  >
                    <img
                      src={recipes.image}
                      alt={recipes.label}
                      style={{
                        maxHeight: "50%",
                        objectFit: "cover",
                        height: "13rem",
                        width: "15rem",
                      }}
                    />
                    <h3>{recipes.label}</h3>
                  </Box>
                )}
              </Box>
            </Paper>
          ))}
        </Carousel>
      </Box>

      {buttonTransitions((styles, item) =>
        recipe && recipe.length > 0 ? (
          <animated.div style={styles}>
            <Box style={{ marginTop: "2rem", textAlign: "center" }}>
              <Button onClick={handlePrevious}>Previous</Button>
              <Button onClick={handleNext}>Next</Button>
            </Box>
          </animated.div>
        ) : null
      )}
    </>
  );
};

export default HomePage;
