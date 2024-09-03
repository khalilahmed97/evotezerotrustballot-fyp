import React, { useState } from "react";
import { Box, TextField, InputAdornment, IconButton, FormControl } from "@mui/material";
import { Search } from "@mui/icons-material";

const SearchBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = () => {
    onSearch(searchTerm);
  };

  return (
    <Box sx={{ textAlign: "center", padding: "10px", margin: "10px" }}>
      <FormControl variant="outlined" fullWidth>
        <TextField
          placeholder="Search by Name"
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
          variant="filled"
          sx={{
            backgroundColor: '#ffffff',
            // Change text, icon, and border color to #003b6d
            color: '#003b6d', // This changes the text color
            '& .MuiFilledInput-root': {
              '&:before': { borderBottom: '2px solid #003b6d' },
              '&:hover:before': { borderBottom: '2px solid #003b6d' },
              '&:after': { borderBottom: '2px solid #003b6d' }, // Change border color here
            },
            '& .MuiFilledInput-input': {
              color: '#003b6d', // Ensures that the text input matches the desired color
            },
            '& .MuiIconButton-root': {
              color: '#003b6d', // This changes the IconButton (search icon) color
            }
          }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={handleSearch}>
                  <Search />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </FormControl>
    </Box>
  );
};

export default SearchBar;
