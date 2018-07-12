


export function startMeeting(attendees, meeting_name) {
  return {
    type: "START_MEETING",
    attendees,
    meeting_name,
    inProgress: true
  }
}

export function endMeeting() {
  return {
    type: "END_MEETING",
    inProgress: false
  }

}

export function tickOneSecond() {
  return {
    type: "TICK_ONE_SECOND",
    inProgress: true
  }

}

export function resetMeeting() {
  return {
    type: "RESET_MEETING",
    inProgress: false
  }
  
}
