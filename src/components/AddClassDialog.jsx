import { Button, TextField, Dialog, DialogActions, DialogContent, Autocomplete, Container, Box } from "@mui/material";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { EmployeeService } from "../api/EmployeeService";
import { useQuery } from "react-query";
import { useFormik } from "formik";
import * as Yup from "yup";
import { ClassService } from "../api/ClassService";

export default function AddClassDialog() {
   const navigate = useNavigate();
   const { streamId } = useParams();
   const [open, setOpen] = useState(false);
   const formik = useFormik({
      initialValues: {
         streamId: streamId,
         startDate: "",
         endDate: "",
         trainerIds: [],
         traineeIds: [],
      },
      validationSchema: Yup.object({
         startDate: Yup.string().required("Start date is required"),
         endDate: Yup.string().required("End date is required"),
      }),
      validateOnChange: false,
      validateOnBlur: false,
      onSubmit: async (values, { resetForm }) => {
         await ClassService.createClass(values);
         navigate(0);
         resetForm();
         handleClose();
      },
   });

   const trainersQuery = useQuery("allTrainers", () => {
      return EmployeeService.getAllTrainers();
   });
   const traineesQuery = useQuery("allTrainees", () => {
      return EmployeeService.getAllUnregisteredTraineesByStreamId(streamId);
   });
   if (trainersQuery.isLoading || traineesQuery.isLoading) return "Loading...";
   if (trainersQuery.error || traineesQuery.error) return "An error has occurred: ";

   const handleClickOpen = () => {
      setOpen(true);
   };

   const handleClose = () => {
      formik.resetForm();
      setOpen(false);
   };

   return (
      <>
         <Button variant="outlined" onClick={handleClickOpen}>
            Add a class
         </Button>
         <Dialog open={open} onClose={handleClose} fullWidth>
            <DialogContent>
               <Container sx={{ textAlign: "center" }} component="main" maxWidth="xs">
                  <Box sx={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
                     <TextField
                        error={formik.errors.startDate}
                        helperText={formik.errors.startDate ? formik.errors.startDate : " "}
                        InputLabelProps={{ shrink: true }}
                        variant="outlined"
                        label="Start date"
                        type="date"
                        name="startDate"
                        value={formik.values.startDate}
                        onChange={formik.handleChange}
                     />
                     <TextField
                        error={formik.errors.endDate}
                        helperText={formik.errors.endDate ? formik.errors.endDate : " "}
                        InputLabelProps={{ shrink: true }}
                        variant="outlined"
                        label="End date"
                        type="date"
                        name="endDate"
                        value={formik.values.endDate}
                        onChange={formik.handleChange}
                     />

                     <Autocomplete
                        multiple
                        id="tags-outlined"
                        options={trainersQuery.data}
                        getOptionLabel={(option) => `${option.firstName} ${option.lastName}`}
                        filterSelectedOptions
                        renderInput={(params) => (
                           <TextField {...params} label="Add trainer(s)" placeholder="Search trainer" />
                        )}
                        onChange={(event, newValue) => {
                           const trainerIds = newValue.map((trainer) => trainer.id);
                           formik.setFieldValue("trainerIds", trainerIds);
                        }}
                     />

                     <Autocomplete
                        multiple
                        id="tags-outlined"
                        options={traineesQuery.data}
                        getOptionLabel={(option) => `${option.firstName} ${option.lastName}`}
                        filterSelectedOptions
                        renderInput={(params) => (
                           <TextField {...params} label="Add trainee(s)" placeholder="Search trainee" />
                        )}
                        onChange={(event, newValue) => {
                           const traineeIds = newValue.map((trainee) => trainee.id);
                           formik.setFieldValue("traineeIds", traineeIds);
                        }}
                        noOptionsText={"No more trainees left to add"}
                     />
                  </Box>
               </Container>
            </DialogContent>
            <DialogActions>
               <Button onClick={handleClose}>Cancel</Button>
               <Button onClick={formik.handleSubmit}>Add</Button>
            </DialogActions>
         </Dialog>
      </>
   );
}
