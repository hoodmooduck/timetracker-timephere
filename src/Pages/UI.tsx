import "../index.scss";
import React, { useState } from "react";
import Header from "../Components/Header/Header.tsx";
import TrackCard from "../UI/TrackCard/TrackCard.tsx";
import Input from "../UI/Input/Input.tsx";
import Button from "../UI/Button/Button.tsx";
import BigButton from "../UI/BigButton/BigButton.tsx";

function UI() {
  const [name, setName] = useState<string>("");

  const changeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const props: tasksType = {
    id: 1,
    projectId: 1,
    name: "string",
    description: "string",
    time: 11,
    tracking: 11,
    startTime: 0,
    complete: false,
  };

  return (
    <>
      <Header></Header>
      <div className="ui">
        <Button text="new!" onClick={() => {}} />
        <div className="container">
          <BigButton onClick={() => {}} />
        </div>
        <Button text="новый проект" onClick={() => {}} />
        <Input
          id="name"
          value={name}
          onChange={changeName}
          label="label"
          type="text"
        />
        <div className="container">
          <TrackCard props={props}></TrackCard>
          <TrackCard props={props}></TrackCard>
          <TrackCard props={props}></TrackCard>
        </div>
      </div>
    </>
  );
}

export default UI;
