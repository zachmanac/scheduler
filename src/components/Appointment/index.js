import React from "react";
import "components/Appointment/styles.scss";

import Show from "components/Appointment/Show";
import Empty from "components/Appointment/Empty";
import Header from "components/Appointment/Header";
import useVisualMode from "hooks/useVisualMode";
import Form from "components/Appointment/Form";
import Status from "components/Appointment/Status";
import Confirm from "./Confirm";

export default function Appointment(props) {
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const DELETING = "DELETING";
  const CONFIRM = "CONFIRM";

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    transition(SAVING);
    props.bookInterview(props.id, interview)
    .then(() => {
      transition(SHOW)
    });
  }

  
  function deleteInterview() {
    transition(DELETING)
    props.cancelInterview(props.id)
    .then(() => {
      transition(EMPTY);
    });
  }

  return (
      <article className="appointment">
        <Header time={props.time} />
        {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} bookInterview={props.bookInterview} />}
        {mode === SHOW && (
          <Show
            student={props.interview.student}
            interviewer={props.interview.interviewer}
            interview={props.interview}
            bookInterview={props.bookInterview}
            onDelete={() => {transition(CONFIRM)}}
          />
          )}
        {mode === CREATE && (
          <Form 
            interviewers={props.interviewers}
            onCancel={back}
            onSave={save}
          />
        )}
        {mode === SAVING && (<Status message="Saving" />)}
        {mode === DELETING && (<Status message="Deleting" />)}
        {mode === CONFIRM && (
          <Confirm
            message="Are you sure you would like to delete?"
            onConfirm={deleteInterview}
            onCancel={back}
          />
        )}
      </article>
  );
};