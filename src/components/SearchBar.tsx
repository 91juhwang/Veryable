"use client";

import { TextField, InputAdornment } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';

type SearchBarProps = {
  value: string;
  onChange: (value: string) => void;
};

export function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <TextField
      label="Search ops or operators"
      value={value}
      onChange={(event) => onChange(event.target.value)}
      variant="outlined"
    // slotProps={{
    //   inputLabel: () => (
    //     <InputAdornment position="start">
    //       <SearchIcon />
    //     </InputAdornment>
    //   ),
    // }}
    />
  );
}
