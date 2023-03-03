export function getAppointmentsForDay(state, day) {
  const theDayAppointments = [];

  for(const day1 of state.days) {
    if(day === day1.name) {
      const appointments = day1.appointments;
      
      for(const appointment of appointments) {
        theDayAppointments.push(state.appointments[appointment]);
      }
    }
  }

  return theDayAppointments;
  //... returns an array of appointments for that day
}