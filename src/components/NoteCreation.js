import { useRef, useState } from "react";

import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import { Row, Container } from "react-bootstrap";
import MarkdownPreviewer from "./MarkdownPreviewer";

const NoteCreation = (props) => {
  const titleInputRef = useRef();
  const [markdownInput, setMarkdownInput] = useState();

  const createNoteHandler = (event) => {
    event.preventDefault();
    const enteredTitle = titleInputRef.current.value;
    const enteredContent = markdownInput;
    const notesCopy = [...props.notes];
    if (
      enteredTitle === null ||
      enteredTitle === "" ||
      typeof enteredTitle === "undefined" ||
      enteredContent === null ||
      enteredContent === "" ||
      typeof enteredContent === "undefined"
    ) {
      props.setCustomAlertProperties({
        variant: "danger",
        message: "Title or Content cannot be empty",
      });
      props.setShowCustomAlert(true);
      return;
    }

    let lengthNotes = 0;
    if (props.notes.length !== "undefined") lengthNotes = props.notes.length++;
    const note = {
      title: enteredTitle,
      content: enteredContent,
      creation: new Date(),
      id: lengthNotes,
    };
    notesCopy.push(note);
    props.setNotes(notesCopy);
    props.setShowCreationNotes(false);
  };

  return (
    <Card border="primary" style={{ width: "36rem" }}>
      <Card.Body>
        <Card.Title>New note</Card.Title>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Note Title</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter note Title"
              ref={titleInputRef}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Note content</Form.Label>

            <Container>
              <Row>
                <Form.Control
                  as="textarea"
                  placeholder="Enter note Content"
                  style={{ height: "100px" }}
                  onChange={(e) => {
                    setMarkdownInput(e.target.value);
                  }}
                />
              </Row>
              <Row>
                <MarkdownPreviewer markdownInput={markdownInput} />
              </Row>
            </Container>
          </Form.Group>
          <ButtonGroup aria-label="Basic example">
            <Button
              variant="outline-primary"
              type="submit"
              onClick={createNoteHandler}
            >
              Create
            </Button>
            <Button
              variant="outline-secondary"
              type="submit"
              onClick={() => {
                props.setShowCreationNotes(false);
              }}
            >
              Close
            </Button>
          </ButtonGroup>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default NoteCreation;
