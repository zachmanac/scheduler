import { useState, useEffect } from "react";
import axios from "axios";

export default function useApplicationData () {

  const setDay = day => setState({ ...state, day });

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  const updateSpots = function(appointments) {
    const foundDay = state.days.find(day => day.name === state.day);
    let count = 0;

    for(const appointmentId of foundDay.appointments) {
      const interview = appointments[appointmentId].interview;
      if(interview === null) {
        count += 1;
      }
    }

    const days = {
      ...foundDay,
      spots: count
    }

    const daysClone = [ ...state.days ];
    daysClone[foundDay.id - 1] = days;
    return daysClone;
  }

  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    const days = updateSpots(appointments);

    console.log("appointments", appointments)
    return axios.put(`/api/appointments/${id}`, {interview})
    .then(() => {
      setState({
        ...state,
        appointments: appointments,
        days
      })
    });
  }

  function cancelInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: null
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    const days = updateSpots(appointments);
    
    return axios.delete(`/api/appointments/${id}`, {interview})
    .then(() => {
      setState({
        ...state,
        appointments: appointments,
        days
      })
    });
  }

  useEffect(() => {
    Promise.all([
      axios.get("/api/days"),
      axios.get("/api/appointments"),
      axios.get("/api/interviewers")
    ])
    .then((all) => {
      setState(prev => ({...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data}))
    })
  }, [])

  return { setDay, bookInterview, cancelInterview, state }
  
}