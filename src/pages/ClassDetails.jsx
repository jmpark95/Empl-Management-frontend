import { useQuery } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import { ClassService } from "../api/ClassService";
import { Typography } from "@mui/material";
import { StreamService } from "../api/StreamService";
import { Button, TextField, Dialog, DialogActions, DialogContent, Autocomplete } from "@mui/material";
import { useState } from "react";
import { EmployeeService } from "../api/EmployeeService";
import { useFormik } from "formik";
import * as Yup from "yup";

export default function ClassDetails() {
   const { streamId, classId } = useParams();
   const navigate = useNavigate();
   const [open, setOpen] = useState(false);

   const streamQuery = useQuery(["stream", streamId], () => {
      return StreamService.getStreamById(streamId);
   });
   const classQuery = useQuery(["class", classId], () => {
      return ClassService.getClass(classId);
   });
   const trainersQuery = useQuery("allTrainers", () => {
      return EmployeeService.getAllTrainers();
   });
   const traineesQuery = useQuery("allUnregisteredTrainees", () => {
      return EmployeeService.getAllUnregisteredTraineesByStreamId(streamId);
   });

   const formik = useFormik({
      enableReinitialize: true,
      initialValues: {
         streamId: streamId,
         startDate: classQuery.data?.startDate,
         endDate: classQuery.data?.endDate,
         trainerIds: classQuery.data?.trainers,
         traineeIds: classQuery.data?.trainees,
      },
      validationSchema: Yup.object({
         startDate: Yup.string().required("Start date is required"),
         endDate: Yup.string().required("End date is required"),
      }),
      onSubmit: async (values, { resetForm }) => {
         const trainerIds = values.trainerIds.map((trainer) => trainer.id);
         const traineeIds = values.traineeIds.map((trainee) => trainee.id);

         values.trainerIds = trainerIds;
         values.traineeIds = traineeIds;

         try {
            await ClassService.updateClass(classId, values);
            navigate(0);
            resetForm();
            handleClose();
         } catch {
            navigate(0);
            resetForm();
            handleClose();
            alert("Something went wrong");
         }
      },
   });

   const handleClickOpen = () => {
      setOpen(true);
   };
   const handleClose = () => {
      setOpen(false);
   };
   const handleCancel = () => {
      setOpen(false);
      formik.handleReset();
   };

   if (classQuery.isLoading || streamQuery.isLoading || trainersQuery.isLoading || traineesQuery.isLoading)
      return "Loading...";
   if (classQuery.error || streamQuery.error || trainersQuery.error || traineesQuery.error)
      return "An error has occurred: ";

   return (
      <div>
         <button onClick={() => navigate(-1)}>Go back </button>

         <Button variant="outlined" onClick={handleClickOpen}>
            Edit class
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
                  //defaultValue={classQuery.data.trainers}
                  isOptionEqualToValue={(option, value) => option.id === value.id}
                  options={trainersQuery.data}
                  getOptionLabel={(option) => `${option.firstName} ${option.lastName}`}
                  filterSelectedOptions
                  renderInput={(params) => (
                     <TextField {...params} label="Add trainer(s)" placeholder="Search trainer" />
                  )}
                  value={formik.values.trainerIds}
                  onChange={(event, newValue) => {
                     const trainerIds = newValue.map((trainer) => trainer);
                     formik.setFieldValue("trainerIds", trainerIds);
                  }}
               />

               <Autocomplete
                  multiple
                  id="tags-outlined"
                  options={traineesQuery.data}
                  //defaultValue={classQuery.data.trainees}
                  isOptionEqualToValue={(option, value) => option.id === value.id}
                  getOptionLabel={(option) => `${option.firstName} ${option.lastName}`}
                  filterSelectedOptions
                  renderInput={(params) => (
                     <TextField {...params} label="Add trainee(s)" placeholder="Search trainee" />
                  )}
                  value={formik.values.traineeIds}
                  onChange={(event, newValue) => {
                     const traineeIds = newValue.map((trainee) => trainee);
                     formik.setFieldValue("traineeIds", traineeIds);
                  }}
                  noOptionsText={"No more trainees left to add"}
               />
            </DialogContent>

            <DialogActions>
               <Button onClick={handleCancel}>Cancel</Button>
               <Button onClick={formik.handleSubmit}>Save</Button>
            </DialogActions>
         </Dialog>
         <Typography variant="h5">
            {streamQuery.data.name} {classQuery.data.startDate} - {classQuery.data.endDate}
         </Typography>
         <Typography variant="h6">Trainers</Typography>
         {classQuery.data.trainers.map((trainer) => (
            <div key={trainer.id}>
               {trainer.firstName} {trainer.lastName}
            </div>
         ))}
         <Typography variant="h6">Trainees</Typography>
         {classQuery.data.trainees.map((trainee) => (
            <div key={trainee.id}>
               {trainee.firstName} {trainee.lastName}
            </div>
         ))}
      </div>
   );
}
