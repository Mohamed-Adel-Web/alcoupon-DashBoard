"use client";
import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
export default function AddStoreModal({
  open,
  handleAddStoreClose,
}: {
  open: boolean;
  handleAddStoreClose: () => void;
}) {
  const { register, control, handleSubmit, formState } = useForm();
  const { errors, isSubmitting } = formState;
  return (
    <React.Fragment>
      <Dialog open={open} onClose={handleAddStoreClose} fullWidth>
        <DialogTitle sx={{ color: "primary.main" }}>Add New Store</DialogTitle>
        <form noValidate>
          <DialogContent>
            {/* <TextField
              id="store Name"
              label="store Name"
              type="email"
              variant="outlined"
              {...register("storeName", {
                required: "store name is required",
              })}
              error={!!errors.email}
              helperText={errors.?.message}
            /> */}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleAddStoreClose}>Cancel</Button>
            <Button type="submit">Add Store</Button>
          </DialogActions>
        </form>
        <DevTool control={control} />
      </Dialog>
    </React.Fragment>
  );
}
