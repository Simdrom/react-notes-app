import Alert from "react-bootstrap/Alert";

import Button from "react-bootstrap/Button";

const WelcomeBanner = (props) => {
  return (
    <Alert variant="info">
      <Alert.Heading>Hey, nice to see you</Alert.Heading>
      <p>Aww...it's seems that there is no notes right now.</p>
      <hr />
      <div className="d-flex justify-content-end">
        <Button
          onClick={() => props.setShowCreationNotes(!props.showCreationNotes)}
          variant="outline-info"
        >
          Create new note!
        </Button>
      </div>
    </Alert>
  );
};

export default WelcomeBanner;
