import SubmitLeaveDialog from "../components/SubmitLeaveDialog";

export default function Leave({ user }) {
   return (
      <>
         <h1>Page for submitting leave and viewing history of leave requests</h1>
         <SubmitLeaveDialog user={user} />
         <h3>History of your requests</h3>
      </>
   );
}
