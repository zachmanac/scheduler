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

export function getInterview(state, interview) {
  let interviewObj = {};
  
  if(interview === null) {
    return null;
  }

  for(const interviewer in state.interviewers) {
    const interviewers = state.interviewers[interviewer];
    if(interview.interviewer === interviewers.id) {
      interviewObj = {
        student: interview.student,
        interviewer: {
          id: interviewers.id,
          name: interviewers.name,
          avatar: interviewers.avatar
        }
      }
    }
  }

  return interviewObj;
  // returns obj of interview
}

export function getInterviewersForDay(state, day) {
  const theDayInterviewers = [];

  for(const day1 of state.days) {
    if(day === day1.name) {
      const interviewers = day1.interviewers;

      for(const interviewer of interviewers) {
        theDayInterviewers.push(state.interviewers[interviewer]);
      }
    }
  }

  return theDayInterviewers;
  //... returns an array of interviewers for that day
}