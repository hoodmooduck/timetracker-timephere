import "../index.scss";
import React, { useState } from "react";
import Header from "../Components/Header/Header.tsx";
import TrackCard from "../UI/TrackCard/TrackCard.tsx";
import Input from "../UI/Input/Input.tsx";
import LinkButton from "../UI/Link/LinkButton.tsx";
import Button from "../UI/Button/Button.tsx";
import BigButton from "../UI/BigButton/BigButton.tsx";

type TrackerProps = {
    title: string;
    description: string;
    tags: string[];
    timer: number;
};

function UI() {
    const [name, setName] = useState<string>("");

    const changeName = (e: React.ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value);
    };

    const props: TrackerProps = {
        title: "strings tringstri ngstring",
        description:
            "string string string string string string string string string string string string string string string ",
        tags: ["ddd", "ddd", "ddd", "ddd", "ddd"],
        timer: 20,
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
                <LinkButton text="Ссылка" link="/" />
                <LinkButton text="Ссылка@" link="/" />
                <Input
                    id="name"
                    value={name}
                    onChange={changeName}
                    label="label"
                    type="text"
                />
                <div className="container">
                    <TrackCard {...props}></TrackCard>
                    <TrackCard {...props}></TrackCard>
                    <TrackCard {...props}></TrackCard>
                </div>
            </div>
        </>
    );
}

export default UI;
