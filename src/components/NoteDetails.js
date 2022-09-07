import React, { useState, useRef, useEffect } from "react";

import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Form from "react-bootstrap/Form";

import { docco } from "react-syntax-highlighter/dist/esm/styles/hljs";
import MarkdownPreviewer from "./MarkdownPreviewer";

const NoteDetails = (props) => {
  const [enableEdit, setEnableEdit] = useState(false);
  const titleChangeRef = useRef();
  const [markdownInput, setMarkdownInput] = useState();

  const handleDeleteNote = () => {
    props.setNotes(
      [...props.notes].filter((note) => note.id !== props.note.id)
    );
  };
  const handleEditNote = (event) => {
    event.preventDefault();

    const titleChanged = titleChangeRef.current.value;
    const contentChanged = markdownInput;

    if (
      titleChanged === null ||
      titleChanged === "" ||
      typeof titleChanged === "undefined" ||
      contentChanged === null ||
      contentChanged === "" ||
      typeof contentChanged === "undefined"
    ) {
      props.setCustomAlertProperties({
        variant: "danger",
        message: "Title or Content cannot be empty",
      });
      props.setShowCustomAlert(true);
      return;
    }

    const noteToChange = [...props.notes].filter(
      (note) => note.id === props.note.id
    );
    const noteChanged = [...noteToChange].at(0);
    noteChanged.title = titleChanged;
    noteChanged.content = contentChanged;
    noteChanged.creation = new Date();

    const newNotesArrayWithoutChanged = [...props.notes].filter(
      (note) => note.id !== props.note.id
    );
    props.setNotes([...newNotesArrayWithoutChanged, noteChanged]);

    setEnableEdit(false);
  };

  useEffect(() => {
    if (typeof markdownInput === "undefined")
      setMarkdownInput(props.note.content);
  }, [props.note.content, markdownInput]);

  return (
    <Card>
      <Card.Body>
        {enableEdit && <Card.Title>Edit note</Card.Title>}
        {!enableEdit && <Card.Title>{props.note.title}</Card.Title>}

        {!enableEdit && (
          <MarkdownPreviewer
            markdownInput={props.note.content}
            disabled={false}
          />
        )}
        {enableEdit && (
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Change note title</Form.Label>
              <Form.Control
                type="text"
                placeholder={props.note.title}
                ref={titleChangeRef}
                defaultValue={props.note.title}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Change note content</Form.Label>
              <Form.Control
                as="textarea"
                placeholder={props.note.content}
                style={{ height: "100px" }}
                defaultValue={props.note.content}
                onChange={(e) => {
                  setMarkdownInput(e.target.value);
                }}
              />
            </Form.Group>

            <MarkdownPreviewer markdownInput={markdownInput} disabled={true} />
            <ButtonGroup aria-label="Basic example">
              <Button
                variant="outline-primary"
                type="submit"
                onClick={handleEditNote}
              >
                Edit
              </Button>
              <Button
                variant="outline-secondary"
                type="submit"
                onClick={() => {
                  setEnableEdit(false);
                }}
              >
                Cancel
              </Button>
            </ButtonGroup>
          </Form>
        )}
        <p></p>
        {!enableEdit && (
          <ButtonGroup aria-label="Basic example">
            <Button
              variant="outline-secondary"
              onClick={() => {
                setEnableEdit(true);
              }}
            >
              Edit
            </Button>
            <Button variant="outline-danger" onClick={handleDeleteNote}>
              Delete
            </Button>
            <Button
              variant="outline-info"
              onClick={() => {
                props.setShowCreationNotes(!props.showCreationNotes);
              }}
            >
              Create new note
            </Button>
          </ButtonGroup>
        )}
      </Card.Body>
      <Card.Footer>
        <small className="text-muted">
          Created {getDateString(props.note.creation)}
        </small>
      </Card.Footer>
    </Card>
  );
};

export default NoteDetails;
const getDateString = (dateD) => {
  const d = new Date(dateD);
  const year = d.getFullYear(); // 2019
  const date = d.getDate();
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const monthIndex = d.getMonth();
  const monthName = months[monthIndex];
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const dayName = days[d.getDay()]; // Thu
  const formatted = `${dayName}, ${date} ${monthName} ${year}`;
  return `${formatted}`;
};
