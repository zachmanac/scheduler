import React from "react";
import "components/InterviewerList.scss";
import classNames from "classnames";
import InterviewerListItem from "./InterviewerListItem";

export default function InterviewerList(props) {

  const interviewerListClasses= classNames("interviewers", {
    "interviewers--selected": props.selected
  })

  const interviewers = props.interviewers.map((interviewer) => {
    return (
      <InterviewerListItem 
        key={interviewer.id}
        name={interviewer.name}
        avatar={interviewer.avatar}
        selected={interviewer.id === props.interviewer}
        setInterviewer={props.setInterviewer}
        id={interviewer.id}
      />
    );
  });

  return (
    <section className={interviewerListClasses}>
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">{interviewers}</ul>
    </section>
  )
};