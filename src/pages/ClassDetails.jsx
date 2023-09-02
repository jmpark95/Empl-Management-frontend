import { useQuery } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import { ClassService } from "../api/ClassService";
import { Box, CircularProgress, Container, Typography } from "@mui/material";
import { StreamService } from "../api/StreamService";
import { Button, TextField, Dialog, DialogActions, DialogContent, Autocomplete } from "@mui/material";
import { useState } from "react";
import { EmployeeService } from "../api/EmployeeService";
import { useFormik } from "formik";
import * as Yup from "yup";
import { formatDate } from "../api/utils";

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
      validateOnChange: false,
      validateOnBlur: false,
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
      return (
         <div style={{ display: "flex", justifyContent: "center" }}>
            <CircularProgress />
         </div>
      );
   if (classQuery.error || streamQuery.error || trainersQuery.error || traineesQuery.error)
      return "An error has occurred: ";

   return (
      <div>
         <Box
            display={"flex"}
            justifyContent={"start"}
            alignItems={"center"}
            gap="5rem"
            sx={{ mt: "2.5rem", mb: "2.5rem" }}
         >
            <Typography variant="h3" fontWeight={500}>
               {formatDate(classQuery.data.startDate)} - {formatDate(classQuery.data.endDate)}
            </Typography>
            <Button variant="outlined" onClick={handleClickOpen}>
               Edit class
            </Button>
         </Box>

         <Dialog open={open} onClose={handleClose}>
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
                        helperText={formik.errors.startDate ? formik.errors.endDate : " "}
                        InputLabelProps={{ shrink: true }}
                        variant="outlined"
                        label="End date"
                        type="date"
                        name="endDate"
                        value={formik.values.endDate}
                        onChange={formik.handleChange}
                     />

                     <Autocomplete
                        sx={{ mb: "2rem" }}
                        multiple
                        id="tags-outlined"
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
                  </Box>
               </Container>
            </DialogContent>

            <DialogActions>
               <Button onClick={handleCancel}>Cancel</Button>
               <Button onClick={formik.handleSubmit}>Save</Button>
            </DialogActions>
         </Dialog>

         <Box sx={{ mb: "3rem" }}>
            <Typography variant="h4">Trainers</Typography>
            {classQuery.data.trainers.map((trainer) => (
               <Typography sx={{ mb: "0.5rem" }} key={trainer.id}>
                  {trainer.firstName} {trainer.lastName}
               </Typography>
            ))}
         </Box>

         <Typography variant="h4">Trainees</Typography>
         {classQuery.data.trainees.map((trainee) => (
            <Typography sx={{ mb: "0.5rem" }} key={trainee.id}>
               {trainee.firstName} {trainee.lastName}
            </Typography>
         ))}
      </div>
   );
}
