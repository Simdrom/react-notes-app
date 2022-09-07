import React, { useState, useRef } from "react";

import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Form from "react-bootstrap/Form";

const NoteDetails = (props) => {
  const [enableEdit, setEnableEdit] = useState(false);
  const titleChangeRef = useRef();
  const contentChangeRef = useRef();

  const handleDeleteNote = () => {
    props.setNotes(
      [...props.notes].filter((note) => note.id !== props.note.id)
    );
  };
  const handleEditNote = (event) => {
    event.preventDefault();
    const titleChanged = titleChangeRef.current.value;
    const contentChanged = contentChangeRef.current.value;
    console.log(
      `titleChanged: ${titleChanged} and contentChanged: ${contentChanged} `
    );
    const noteToChange = [...props.notes].filter(
      (note) => note.id === props.note.id
    );
    const noteChanged = [...noteToChange].at(0);
    noteChanged.title = titleChanged;
    noteChanged.content = contentChanged;
    console.log(`noteChanged: ${JSON.stringify(noteChanged)}`);

    const newNotesArrayWithoutChanged = [...props.notes].filter(
      (note) => note.id !== props.note.id
    );
    props.setNotes([...newNotesArrayWithoutChanged, noteChanged]);
    console.log(
      `new array: ${JSON.stringify([newNotesArrayWithoutChanged, noteChanged])}`
    );
    setEnableEdit(false);
  };
  return (
    <Card>
      <Card.Body>
        {!enableEdit && <Card.Title>{props.note.title}</Card.Title>}
        {!enableEdit && <Card.Text>{props.note.content}</Card.Text>}
        {enableEdit && (
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Change note title</Form.Label>
              <Form.Control
                type="text"
                placeholder={props.note.title}
                ref={titleChangeRef}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Change note content</Form.Label>
              <Form.Control
                as="textarea"
                placeholder={props.note.content}
                style={{ height: "100px" }}
                ref={contentChangeRef}
              />
            </Form.Group>
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
        {!enableEdit && (
          <ButtonGroup aria-label="Basic example">
            <Button
              variant="outline-secondary"
              onClick={() => {
                console.log("Edit clicked");
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
    </Card>
  );
};

export default NoteDetails;