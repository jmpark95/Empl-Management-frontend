React frontend for Spring Employee Management System

Some important business logic regarding leave requests

-  Annual leave accrues at 2.92 hours per 38 hr full time working week
-  A full day of leave from 9 to 5:30 is 7.6 hours of annual leave(not 8.5). This is due a 1 hr unpaid lunch break + 7.6hr working day makes a 38 hour full time week.
-  The unpaid lunch break is between 12:30 and 1:30. This means:
-  Leave request from 9 to 12:30 = 3.5 hr leave
-  Leave request from 9 to 1:00 = 3.5 hr leave (same)
-  Leave request from 9 to 1:30 = 3.5 hr leave (same)
-  Leave request from 9 to 2:00 = 4 hr leave
-  Leave request from 9 to 2:30 = 4.5 hr leave
-  Leave request from 12:30 to 5:30 = 4 hr leave
-  Leave request from 1:30 to 5:30 = 4 hr leave (Leave has been requested after the lunch break)

Other

-  When HR creates an account for a new employee, password is initially set to their email. On first login, employee is prompted to reset password in order to access application
-  A trainee can only be a member of 1 class
