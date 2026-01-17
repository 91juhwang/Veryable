"use client";

import { TextField, InputAdornment } from "@mui/material";
import { alpha } from "@mui/material/styles";
import SearchIcon from "@mui/icons-material/Search";
import type { TextFieldProps } from "@mui/material";

type SearchBarProps = {
  value: string;
  onChange: (value: string) => void;
};

const searchInputSlotProps: TextFieldProps["slotProps"] = {
  input: {
    startAdornment: (
      <InputAdornment position="start">
        <SearchIcon />
      </InputAdornment>
    ),
  },
};

export function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <TextField
      id="ops-search"
      label="Search ops or operators"
      value={value}
      onChange={(event) => onChange(event.target.value)}
      variant="outlined"
      sx={(theme) => ({
        "& .MuiOutlinedInput-root fieldset": {
          borderColor: alpha(theme.palette.primary.main, 0.35),
        },
        "& .MuiOutlinedInput-root:hover fieldset": {
          borderColor: alpha(theme.palette.primary.main, 0.55),
        },
        "& .MuiOutlinedInput-root.Mui-focused fieldset": {
          borderColor: theme.palette.primary.main,
        },
        "& .MuiInputLabel-root": {
          color: alpha(theme.palette.primary.main, 0.8),
        },
        "& .MuiInputLabel-root.Mui-focused": {
          color: theme.palette.primary.main,
        },
        "& .MuiInputAdornment-root": {
          color: alpha(theme.palette.primary.main, 0.8),
        },
      })}
      slotProps={searchInputSlotProps}
    />
  );
}
