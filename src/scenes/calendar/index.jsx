import { useState, useEffect } from "react";
import FullCalendar, { formatDate } from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
import {
  Box,
  List,
  ListItem,
  ListItemText,
  Typography,
  useTheme,
  CircularProgress,
} from "@mui/material";
import Header from "../../components/Header";
import { tokens } from "../../theme";
import axios from "axios";
import { hostServer, getAuthHeader } from "../../data/apiConfig";
import { useAuth } from "../../hooks/useAuth";

const Calendar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { user } = useAuth();
  const [currentEvents, setCurrentEvents] = useState([
    {
      id: "12315",
      title: "All-day event",
      start: "1686700800000",
      end: "1686787199000",
    },
    {
      id: "5123",
      title: "Timed event",
      date: "2022-09-28",
    },
  ]);

  let fetchCalendarEvents = () => {
    axios
      .get(`${hostServer}/interview/all?user_id=1`, getAuthHeader(user))
      .then((response) => {
        setCurrentEvents(response.data);
      })
      .catch((error) => {
        // alert("Something Went Wrong, Retry?");
        setCurrentEvents([
          {
            id: "12315",
            title: "All-day event",
            start: "1686700800000",
            end: "1686787199000",
          },
          {
            id: "5123",
            title: "Timed event",
            date: "2022-09-28",
          },
        ]);
      });
  };

  let createEvent = () => {
    axios
      .post(`${hostServer}/reporting/candidate_quality`, {
        start_ts: 0,
        end_ts: Date.now(),
        company_id: 1, //TODO get company id
      })
      .then((response) => {
        alert("Event Created");
      })
      .catch((error) => {
        alert("Something Went Wrong!");
      });
  };

  useEffect(() => {
    // fetchCalendarEvents();
  }, []);

  const handleDateClick = (selected) => {
    const title = prompt("Please enter a new title for your event");
    const calendarApi = selected.view.calendar;
    calendarApi.unselect();
    if (title) {
      calendarApi.addEvent({
        id: `${selected.dateStr}-${title}`,
        title,
        start: selected.startStr,
        end: selected.endStr,
        allDay: selected.allDay,
      });
    }
  };

  const handleEventClick = (selected) => {
    if (
      window.confirm(
        `Are you sure you want to delete the event '${selected.event.title}'`
      )
    ) {
      selected.event.remove();
    }
  };

  return (
    <Box m="20px">
      <Header title="MY CALENDAR" />

      {currentEvents ? (
        <Box display="flex" justifyContent="space-between">
          {/* CALENDAR SIDEBAR */}
          <Box
            flex="1 1 20%"
            backgroundColor={colors.primary[400]}
            p="15px"
            borderRadius="4px"
          >
            <Typography variant="h5">Events</Typography>
            <List>
              {currentEvents.map((event) => (
                <ListItem
                  key={event.id}
                  sx={{
                    backgroundColor: colors.greenAccent[500],
                    margin: "10px 0",
                    borderRadius: "2px",
                  }}
                >
                  <ListItemText
                    primary={event.title}
                    secondary={
                      <Typography>
                        {formatDate(event.start, {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                      </Typography>
                    }
                  />
                </ListItem>
              ))}
            </List>
          </Box>

          {/* CALENDAR */}
          <Box flex="1 1 100%" ml="15px">
            <FullCalendar
              height="75vh"
              plugins={[
                dayGridPlugin,
                timeGridPlugin,
                interactionPlugin,
                listPlugin,
              ]}
              headerToolbar={{
                left: "prev,next today",
                center: "title",
                right: "dayGridMonth,timeGridWeek,timeGridDay,listMonth",
              }}
              initialView="dayGridMonth"
              editable={true}
              selectable={true}
              selectMirror={true}
              dayMaxEvents={true}
              select={handleDateClick}
              eventClick={handleEventClick}
              eventsSet={(events) => {
                console.log("events", events);
                setCurrentEvents(events);
              }}
              initialEvents={currentEvents}
            />
          </Box>
        </Box>
      ) : (
        <Box display={"flex"} justifyContent={"center"} mt="100px">
          <CircularProgress color="secondary" />
        </Box>
      )}
    </Box>
  );
};

export default Calendar;

// import { useState, useEffect } from "react";
// import FullCalendar, { formatDate } from "@fullcalendar/react";
// import dayGridPlugin from "@fullcalendar/daygrid";
// import timeGridPlugin from "@fullcalendar/timegrid";
// import interactionPlugin from "@fullcalendar/interaction";
// import listPlugin from "@fullcalendar/list";
// import {
//   Box,
//   List,
//   ListItem,
//   ListItemText,
//   Typography,
//   useTheme,
//   CircularProgress,
// } from "@mui/material";
// import Header from "../../components/Header";
// import { tokens } from "../../theme";
// import axios from "axios";
// import { hostServer, getAuthHeader } from "../../data/apiConfig";
// import { useAuth } from "../../hooks/useAuth";
// import { ScheduleInterviewDialog } from "./ScheduleInterviewDialog";

// const Calendar = () => {
//   const theme = useTheme();
//   const colors = tokens(theme.palette.mode);
//   const { user } = useAuth();
//   const [currentEvents, setCurrentEvents] = useState([
//     {
//       id: "12315",
//       title: "All-day event",
//       start: "1686700800000",
//       end: "1686787199000",
//     },
//     {
//       id: "5123",
//       title: "Timed event",
//       date: "2022-09-28",
//     },
//   ]);

//   const [openDialog, setOpenDialog] = useState(false);
//   const [selectedSlot, setSelectedSlot] = useState(null);

//   const handleDialogOpen = () => {
//     setOpenDialog(true);
//   };

//   const handleClose = () => {
//     setOpenDialog(false);
//   };

//   let fetchCalendarEvents = () => {
//     axios
//       .get(`${hostServer}/interview/all?user_id=1`, getAuthHeader(user))
//       .then((response) => {
//         setCurrentEvents(response.data);
//       })
//       .catch((error) => {
//         // alert("Something Went Wrong, Retry?");
//         setCurrentEvents([
//           {
//             id: "12315",
//             title: "All-day event",
//             start: "1686700800000",
//             end: "1686787199000",
//           },
//           {
//             id: "5123",
//             title: "Timed event",
//             date: "2022-09-28",
//           },
//         ]);
//       });
//   };

//   let createEvent = () => {
//     axios
//       .post(`${hostServer}/reporting/candidate_quality`, {
//         start_ts: 0,
//         end_ts: Date.now(),
//         company_id: 1, //TODO get company id
//       })
//       .then((response) => {
//         alert("Event Created");
//       })
//       .catch((error) => {
//         alert("Something Went Wrong!");
//       });
//   };

//   useEffect(() => {
//     // fetchCalendarEvents();
//   }, []);

//   const onEventCreation = (title) => {
//     if (selectedSlot) {
//       calendarApi.addEvent({
//         id: `${selectedSlot.dateStr}-${title}`,
//         title,
//         start: selectedSlot.startStr,
//         end: selectedSlot.endStr,
//         allDay: selectedSlot.allDay,
//       });
//     }
//   };
//   const handleDateClick = (selected) => {
//     handleDialogOpen();
//     // const title = prompt("Please enter a new title for your event");
    
//   };

//   const handleEventClick = (selected) => {
//     if (
//       window.confirm(
//         `Are you sure you want to delete the event '${selected.event.title}'`
//       )
//     ) {
//       selected.event.remove();
//     }
//   };

//   return (
//     <Box m="20px">
//       <ScheduleInterviewDialog
//         openDialog={openDialog}
//         handleClose={handleClose}
//         start_ts={selectedSlot.start_ts}
//         end_ts={selectedSlot.end_ts}
//         onSuccess={onEventCreation}
//       />
//       <Header title="MY CALENDAR" />

//       {currentEvents ? (
//         <Box display="flex" justifyContent="space-between">
//           {/* CALENDAR SIDEBAR */}
//           <Box
//             flex="1 1 20%"
//             backgroundColor={colors.primary[400]}
//             p="15px"
//             borderRadius="4px"
//           >
//             <Typography variant="h5">Events</Typography>
//             <List>
//               {currentEvents.map((event) => (
//                 <ListItem
//                   key={event.id}
//                   sx={{
//                     backgroundColor: colors.greenAccent[500],
//                     margin: "10px 0",
//                     borderRadius: "2px",
//                   }}
//                 >
//                   <ListItemText
//                     primary={event.title}
//                     secondary={
//                       <Typography>
//                         {formatDate(event.start, {
//                           year: "numeric",
//                           month: "short",
//                           day: "numeric",
//                         })}
//                       </Typography>
//                     }
//                   />
//                 </ListItem>
//               ))}
//             </List>
//           </Box>

//           {/* CALENDAR */}
//           <Box flex="1 1 100%" ml="15px">
//             <FullCalendar
//               height="75vh"
//               plugins={[
//                 dayGridPlugin,
//                 timeGridPlugin,
//                 interactionPlugin,
//                 listPlugin,
//               ]}
//               headerToolbar={{
//                 left: "prev,next today",
//                 center: "title",
//                 right: "dayGridMonth,timeGridWeek,timeGridDay,listMonth",
//               }}
//               initialView="timeGridWeek"
//               editable={true}
//               selectable={true}
//               selectMirror={true}
//               dayMaxEvents={true}
//               select={handleDateClick}
//               eventClick={handleEventClick}
//               eventsSet={(events) => {
//                 console.log("events", events);
//                 setCurrentEvents(events);
//               }}
//               initialEvents={currentEvents}
//             />
//           </Box>
//         </Box>
//       ) : (
//         <Box display={"flex"} justifyContent={"center"} mt="100px">
//           <CircularProgress color="secondary" />
//         </Box>
//       )}
//     </Box>
//   );
// };

// export default Calendar;
