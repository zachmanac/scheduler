import React from "react";
import classNames from "classnames";
import "components/Button.scss";

export default function Button(props) {
   const buttonClass = classNames({
      "button": true,
      "button--confirm": props.confirm,
      "button--danger": props.danger
   })
   // classNames("button", { ...confirm, danger...} alternative to line 6,7
 
   return (
      <button
         disabled={props.disabled}
         onClick={props.onClick}
         className={buttonClass}
      >
         {props.children}
      </button>
   ); 
}
