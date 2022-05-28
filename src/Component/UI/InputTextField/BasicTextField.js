import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

export default function BasicTextFields(props) {
  return (
    <Box
      component="form"
      sx={{
        "& > :not(style)": { m: 1, width: "50ch" },
      }}
      noValidate
      autoComplete="off"
      display="flex"
      justifyContent="center"
      margin={2}
      
    >
      <TextField type={props.type }id="outlined-basic"   placeholder={props.label} variant="outlined" onChange={props.onChange} />
    </Box>
  );
}



// import * as React from 'react';
// import Box from '@mui/material/Box';
// import TextField from '@mui/material/TextField';

// export default function FullWidthTextField(props) {
//   return (
//     <Box
//       sx={{
//         width: 500,
//         maxWidth: '100%',
//       }}
//     >
//       <TextField margin="normal"  fullWidth label={props.label} id={props.id} />
//     </Box>
//   );
// }
