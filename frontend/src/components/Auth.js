import { Typography } from "@mui/material"
import React from "react"

const Auth = () => {
  return (
    <div>
     <form>
      <Box>
        <Typography>Login</Typography>
        <TextField />
        <TextField />
        <TextField />
        <Button>Submit</Button>
        <Button>Change to Signup</Button>
      </Box>
     </form>
    </div>
  )
}

export default Auth