import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";

const NoteDetails = (props) => {
  const handleDeleteNote = () => {
    console.log(`Id to delete: ${props.note.id}`);
    console.log(`Props as params: ${JSON.stringify(props)}`);
    const notesCopy = [...props.notes];
    props.setNotes(notesCopy.filter((note) => note.id !== props.note.id));
  };
  return (
    <Card>
      <Card.Body>
        <Card.Title>{props.note.title}</Card.Title>
        <Card.Text>{props.note.content}</Card.Text>
        <ButtonGroup aria-label="Basic example">
          <Button variant="outline-secondary">Edit</Button>
          <Button variant="outline-danger" onClick={handleDeleteNote}>
            Delete
          </Button>
          <Button
            variant="outline-info"
            onClick={() => {
              props.setShowCreationNotes(!props.showCreationNotes);
            }}
          >
            Create
          </Button>
        </ButtonGroup>
      </Card.Body>
    </Card>
  );
};

export default NoteDetails;
