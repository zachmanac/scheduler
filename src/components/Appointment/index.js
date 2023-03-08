import React from "react";
import "components/Appointment/styles.scss";

import Show from "components/Appointment/Show";
import Empty from "components/Appointment/Empty";
import Header from "components/Appointment/Header";
import useVisualMode from "hooks/useVisualMode";
import Form from "components/Appointment/Form";
import Status from "components/Appointment/Status";

export default function Appointment(props) {
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";

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

  return (
      <article className="appointment">
        <Header time={props.time} />
        {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} bookInterview={props.bookInterview} />}
        {mode === SHOW && (
          <Show
            student={props.interview.student}
            interviewer={props.interview.interviewer}
            bookInterview={props.bookInterview}
          />
          )}
        {mode === CREATE && (
          <Form 
            interviewers={props.interviewers}
            onCancel={() => back(EMPTY)}
            onSave={save}
          />
        )}
        {mode === SAVING && (<Status message="Saving" />)}
      </article>
  );
};