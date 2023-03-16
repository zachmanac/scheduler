import React from "react";
import "components/Appointment/styles.scss";

import Show from "components/Appointment/Show";
import Empty from "components/Appointment/Empty";
import Header from "components/Appointment/Header";
import useVisualMode from "hooks/useVisualMode";
import Form from "components/Appointment/Form";
import Status from "components/Appointment/Status";
import Confirm from "./Confirm";
import Error from "./Error";

export default function Appointment(props) {
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const DELETING = "DELETING";
  const CONFIRM = "CONFIRM";
  const EDIT = "EDIT";
  const ERROR_SAVE = "ERROR_SAVE";
  const ERROR_DELETE = "ERROR_DELETE"

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    transition(SAVING, true);
    props.bookInterview(props.id, interview)
    .then(() => {
      transition(SHOW)
    })
    .catch((error) => {
      transition(ERROR_SAVE, true)
    });
  }

  
  function deleteInterview() {
    transition(DELETING, true)
    props.cancelInterview(props.id)
    .then(() => {
      transition(EMPTY);
    })
    .catch((error) => {
      transition(ERROR_DELETE, true)
    })
  }

  return (
      <article data-testid="appointment" className="appointment">
        <Header time={props.time} />
        {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} bookInterview={props.bookInterview} />}
        {mode === SHOW && (
          <Show
            student={props.interview.student}
            interviewer={props.interview.interviewer}
            interview={props.interview}
            bookInterview={props.bookInterview}
            onDelete={() => {transition(CONFIRM)}}
            onEdit={() => {transition(EDIT)}}
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
        {mode === EDIT && (
          <Form
            interviewers={props.interviewers}
            student={props.interview.student}
            onCancel={back}
            onSave={save}
          />
        )}
        {mode === ERROR_SAVE && (
          <Error
            message="There was an error while saving."
            onClose={back}
          />
        )}
        {mode === ERROR_DELETE && (
          <Error
            message="There was an error while deleting."
            onClose={back}
          />
        )}
      </article>
  );
};