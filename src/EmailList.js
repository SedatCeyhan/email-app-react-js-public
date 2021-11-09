import React, { useEffect, useState } from "react";
import { Checkbox, IconButton } from "@material-ui/core";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import RedoIcon from "@material-ui/icons/Redo";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import SettingsIcon from "@material-ui/icons/Settings";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import KeyboardHideIcon from "@material-ui/icons/KeyboardHide";
import InboxIcon from "@material-ui/icons/Inbox";
import PeopleIcon from "@material-ui/icons/People";
import LocalOfferIcon from "@material-ui/icons/LocalOffer";
import "./EmailList.css";
import Section from "./Section";
import EmailRow from "./EmailRow";
import { db } from "./firebase";
import DeleteIcon from '@material-ui/icons/Delete';
import { selectClickedMessages } from "./features/mailSlice";
import { useSelector } from "react-redux";

import { useDispatch } from "react-redux";
import { removeFromClickedMessages } from "./features/mailSlice";

function EmailList() {
  const [emails, setEmails] = useState([]);
  const clickedMessages = useSelector(selectClickedMessages);
  const dispatch = useDispatch();

  useEffect(() => {
    db.collection("emails")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) =>
        setEmails(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          }))
        )
      );
  }, []);

  const deleteClickedMails = () => {
    for(let i = clickedMessages.length - 1; i >= 0; --i){
      let emailId = clickedMessages[i];
      db.collection("emails")?.doc(emailId).delete();
      dispatch(removeFromClickedMessages({id: emailId}))
    }
  }

  return (
    <div className="emailList">
      <div className="emailList__settings">
        <div className="emailList__settingsLeft">
          <Checkbox />
          <IconButton>
            <ArrowDropDownIcon />
          </IconButton>
          <IconButton>
            <RedoIcon />
          </IconButton>
          <IconButton>
            <MoreVertIcon />
          </IconButton>
          {clickedMessages.length > 0 && (
          <IconButton onClick={deleteClickedMails}>
            <DeleteIcon  />
          </IconButton>)}
        </div>
        <div className="emailList__settingsRight">
          <IconButton>
            <ChevronLeftIcon />
          </IconButton>
          <IconButton>
            <ChevronRightIcon />
          </IconButton>
          <IconButton>
            <KeyboardHideIcon />
          </IconButton>
          <IconButton>
            <SettingsIcon />
          </IconButton>
        </div>
      </div>

      <div className="emailList__sections">
        <Section Icon={InboxIcon} title="Primary" color="red" selected />
        <Section Icon={PeopleIcon} title="Social" color="#1A73E8" />
        <Section Icon={LocalOfferIcon} title="Promotions" color="green" />
      </div>

      <div className="emailList__list">
        {emails.map(({ id, data: { to, subject, message, timestamp, messageRead } }) => (  //@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
          <EmailRow
            id={id}
            key={id}
            title={to}
            subject={subject}
            description={message}
            time={new Date(timestamp?.seconds * 1000).toUTCString()}
            messageRead={messageRead}
          />
        ))}
        {/* <EmailRow
          title="Twitch"
          subject="Hey fellow streamer!!!"
          description="This is a test"
          time="10pm"
        />
        <EmailRow
          title="Twitch"
          subject="Hey fellow streamer!!!"
          description="This is DOPE"
          time="10pm"
        />
        <EmailRow
          title="Twitch"
          subject="Hey fellow streamer!!!"
          description="This is a test"
          time="10pm"
        />
        <EmailRow
          title="Twitch"
          subject="Hey fellow streamer!!!"
          description="This is DOPE"
          time="10pm"
        />{" "}
        <EmailRow
          title="Twitch"
          subject="Hey fellow streamer!!!"
          description="This is a test"
          time="10pm"
        />
        <EmailRow
          title="Twitch"
          subject="Hey fellow streamer!!!"
          description="This is DOPE"
          time="10pm"
        />{" "}
        <EmailRow
          title="Twitch"
          subject="Hey fellow streamer!!!"
          description="This is a test"
          time="10pm"
        />
        <EmailRow
          title="Twitch"
          subject="Hey fellow streamer!!!"
          description="This is DOPE"
          time="10pm"
        />{" "}
        <EmailRow
          title="Twitch"
          subject="Hey fellow streamer!!!"
          description="This is a test"
          time="10pm"
        />
        <EmailRow
          title="Twitch"
          subject="Hey fellow streamer!!!"
          description="This is DOPE"
          time="10pm"
        />{" "}
        <EmailRow
          title="Twitch"
          subject="Hey fellow streamer!!!"
          description="This is a test"
          time="10pm"
        />
        <EmailRow
          title="Twitch"
          subject="Hey fellow streamer!!!"
          description="This is DOPE"
          time="10pm"
        />{" "}
        <EmailRow
          title="Twitch"
          subject="Hey fellow streamer!!!"
          description="This is a test"
          time="10pm"
        />
        <EmailRow
          title="Twitch"
          subject="Hey fellow streamer!!!"
          description="This is DOPE"
          time="10pm"
        />{" "}
        <EmailRow
          title="Twitch"
          subject="Hey fellow streamer!!!"
          description="This is a test"
          time="10pm"
        />
        <EmailRow
          title="Twitch"
          subject="Hey fellow streamer!!!"
          description="This is DOPE"
          time="10pm"
        />{" "}
        <EmailRow
          title="Twitch"
          subject="Hey fellow streamer!!!"
          description="This is a test"
          time="10pm"
        />
        <EmailRow
          title="Twitch"
          subject="Hey fellow streamer!!!"
          description="This is DOPE"
          time="10pm"
        />{" "}
        <EmailRow
          title="Twitch"
          subject="Hey fellow streamer!!!"
          description="This is a test"
          time="10pm"
        />
        <EmailRow
          title="Twitch"
          subject="Hey fellow streamer!!!"
          description="This is DOPE"
          time="10pm"
        />{" "}
        <EmailRow
          title="Twitch"
          subject="Hey fellow streamer!!!"
          description="This is a test"
          time="10pm"
        />
        <EmailRow
          title="Twitch"
          subject="Hey fellow streamer!!!"
          description="This is DOPE"
          time="10pm"
        /> */}
      </div>
    </div>
  );
}

export default EmailList;
