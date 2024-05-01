import { Box, Button, TextField, Typography } from "@mui/material";
import Stack from "@mui/material/Stack";
import { useForm } from "react-hook-form";
import useAdminSignIn from "../../customHooks/useAdminSignIn"; // Import the custom hook
import Image from "next/image";
import { loginData } from "../../types/loginTypes";
import { Toaster } from "react-hot-toast";
import { cookies } from "next/headers";

export default function Login() {
  function TestClick() {
    console.log("TestClick");
  }
  const { mutate } = useAdminSignIn();
  const { register, control, handleSubmit, formState } = useForm<loginData>({
    mode: "onTouched",
  });
  const { errors, isSubmitting } = formState;
  const onSubmit = (loginData: loginData) => {
    mutate(loginData);
  };
  

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundImage:
          "linear-gradient(225deg, #cb6683, #871e8d 37.53%, #5e63bd) ",
        flexDirection: "column",
      }}
    >
      <Image
        src={
          "https://d318j52nj6xnxf.cloudfront.net/sites/all/themes/alcoupon/svg/logo-inverse.svg"
        }
        width={300}
        height={100}
        alt="alcoupon image"
      />

      <form noValidate onSubmit={handleSubmit(onSubmit)}>
        <Stack
          spacing={2}
          width={400}
          style={{
            padding: "3rem",
            borderRadius: "10px",
            boxShadow: " rgba(0, 0, 0, 0.24) 0px 3px 8px",
            backgroundColor: "white",
            border: "1px solid black",
          }}
        >
          <Typography
            variant="h5"
            component={"h2"}
            sx={{ margin: "1rem", fontWeight: "900", color: "#89218D" }}
          >
            Admin Login
          </Typography>
          <TextField
            id="Email"
            label="Email"
            type="email"
            variant="outlined"
            {...register("email", {
              required: "email is required",
              pattern: {
                value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g,
                message: "email is not correct",
              },
            })}
            error={!!errors.email}
            helperText={errors.email?.message}
          />
          <TextField
            id="Password"
            label="Password"
            type="password"
            variant="outlined"
            {...register("password", {
              required: "password is required",
            })}
            error={!!errors.password}
            helperText={errors.password?.message}
          />
          <Button
            type="submit"
            variant="contained"
            disabled={isSubmitting}
            onClick={TestClick}
          >
            Sign in
          </Button>
        </Stack>
      </form>
      <Toaster
        toastOptions={{
          position: "bottom-left",
          success: {
            style: {
              background: "green",
              color: "white",
            },
          },
          error: {
            style: {
              background: "red",
              color: "white",
            },
          },
        }}
      />
    </Box>
  );
}
