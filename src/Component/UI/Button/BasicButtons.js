import * as React from "react";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";

export default function BasicButtons(props) {
  return (
    <Stack spacing={2} direction="row" justifyContent="center" marginTop={2}>
      <Button
        variant="contained"
        size="large"
        onClick={props.onClick}
        onChange={props.onChange}
      >
        {props.buttonName}{" "}
      </Button>
    </Stack>
  );
}
