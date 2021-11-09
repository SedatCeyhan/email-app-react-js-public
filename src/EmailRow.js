import React, {useState, useEffect} from "react"; 
import { db } from "./firebase"; //@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
import Checkbox from "@material-ui/core/Checkbox";
import { IconButton } from "@material-ui/core";
import StarBorderOutlinedIcon from "@material-ui/icons/StarBorderOutlined";
import LabelImportantOutlinedIcon from "@material-ui/icons/LabelImportantOutlined";

import "./EmailRow.css";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { selectMail, addToClickedMessages, removeFromClickedMessages } from "./features/mailSlice";

function EmailRow({ id, title, subject, description, time, messageRead }) {
  const history = useHistory();
  const dispatch = useDispatch();
  const [checked, setChecked] = useState(false) 
  const [flag, setFlag] = useState(false);

  useEffect(() => {
    if(checked){
      dispatch(addToClickedMessages({id: id}));
    }
    else if(flag){
      dispatch(removeFromClickedMessages({id: id}))
    }
  }, [checked])

  const handleCheckboxClick = (event) => {
    setChecked(event.target.checked)
    setFlag(true);
  }

 
  const openMail = () => {
    dispatch(
      selectMail({
        id,
        title,
        subject,
        description,
        time,
      })
    );
    
    //@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
    db.collection("emails").doc(id).set(
      {
        messageRead: true
      },
      {merge:true});
    //@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@

    history.replace("/mail");
  };

  
  return (
    <div className="emailRow">
      <div className="emailRow__options">
        <Checkbox onChange={handleCheckboxClick}/>
        <IconButton>
          <StarBorderOutlinedIcon />
        </IconButton>
        <IconButton>
          <LabelImportantOutlinedIcon />
        </IconButton>
      </div>
      {/* @@@@@@@@@@@@@@@@@@@@@@@@ */}
      <div onClick={openMail} className="emailRow__main">
        <h3 className={`emailRow__title ${messageRead && "emailRow__title--messageRead"}`}>{title}</h3>
        
        <div className={`emailRow__message ${messageRead && "emailRow__message--messageRead"}`}>
          <h4>
            {subject}{" "}
            <span className="emailRow__description">- {description}</span>
          </h4>
        </div>

        <p className={`emailRow__time ${messageRead && "emailRow__time--messageRead"}`}>{time}</p>
        {/* @@@@@@@@@@@@@@@@@@@@@@@@ */}
      </div>
    </div>
  );
}

export default EmailRow;
