import { Button, TextField, Dialog, DialogActions, DialogContent, Autocomplete } from "@mui/material";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { EmployeeService } from "../api/EmployeeService";
import { useQuery } from "react-query";
import { useFormik } from "formik";
import * as Yup from "yup";
import { ClassService } from "../api/ClassService";

export default function AddStreamDialog() {
   const navigate = useNavigate();
   const { id } = useParams();
   const trainersQuery = useQuery("allTrainers", () => {
      return EmployeeService.getAllTrainers();
   });
   const traineesQuery = useQuery("allTrainees", () => {
      return EmployeeService.getAllTraineesByStreamId(id);
   });
   const [open, setOpen] = useState(false);

   const formik = useFormik({
      initialValues: {
         streamId: id,
         startDate: "",
         endDate: "",
         trainerIds: [],
         traineeIds: [],
      },
      validationSchema: Yup.object({
         startDate: Yup.string().required("Start date is required"),
         endDate: Yup.string().required("End date is required"),
      }),
      onSubmit: async (values, { resetForm }) => {
         await ClassService.createClass(values);
         resetForm();
         handleClose();
         navigate(0);
      },
   });

   if (trainersQuery.isLoading || traineesQuery.isLoading) return "Loading...";

   if (trainersQuery.error || traineesQuery.error) return "An error has occurred: ";

   const handleClickOpen = () => {
      setOpen(true);
   };

   const handleClose = () => {
      setOpen(false);
   };

   return (
      <>
         <Button variant="outlined" onClick={handleClickOpen}>
            Add a class
         </Button>
         <Dialog open={open} onClose={handleClose}>
            <DialogContent>
               <TextField
                  InputLabelProps={{ shrink: true }}
                  variant="outlined"
                  label="Start date"
                  type="date"
                  name="startDate"
                  value={formik.values.startDate}
                  onChange={formik.handleChange}
               />
               {formik.errors.startDate ? <p>{formik.errors.startDate}</p> : null}

               <TextField
                  InputLabelProps={{ shrink: true }}
                  variant="outlined"
                  label="End date"
                  type="date"
                  name="endDate"
                  value={formik.values.endDate}
                  onChange={formik.handleChange}
               />
               {formik.errors.endDate ? <p>{formik.errors.endDate}</p> : null}

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
            </DialogContent>
            <DialogActions>
               <Button onClick={handleClose}>Cancel</Button>
               <Button onClick={formik.handleSubmit}>Add</Button>
            </DialogActions>
         </Dialog>
      </>
   );
}
