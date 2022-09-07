import React, { useState, useEffect } from "react";

import Container from "react-bootstrap/Container";
import { Row } from "react-bootstrap";

import MainNavbar from "./components/MainNavbar";
import WelcomeBanner from "./components/WelcomeBanner";
import NoteCreation from "./components/NoteCreation";
import NoteDetails from "./components/NoteDetails";
import CustomAlert from "./components/Alert";

import "./App.css";

const App = () => {
  const [notes, setNotes] = useState(() =>
    JSON.parse(localStorage.getItem("notes"))
  );
  const [showCreationNotes, setShowCreationNotes] = useState(false);
  const [showCustomAlert, setShowCustomAlert] = useState(false);
  const [customAlertProperties, setCustomAlertProperties] = useState({});

  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  return (
    <Container>
      <MainNavbar></MainNavbar>
      {notes.length === 0 && !showCreationNotes && (
        <WelcomeBanner
          setShowCreationNotes={setShowCreationNotes}
          showCreationNotes={showCreationNotes}
        />
      )}
      {showCustomAlert && (
        <Row>
          <CustomAlert
            setShow={setShowCustomAlert}
            properties={customAlertProperties}
          />
        </Row>
      )}

      <Container fluid>
        <Row xs={1} md={3}>
          {notes.map((note, index) => {
            return (
              <NoteDetails
                note={note}
                key={index}
                setShowCreationNotes={setShowCreationNotes}
                showCreationNotes={showCreationNotes}
                setShowCustomAlert={setShowCustomAlert}
                setNotes={setNotes}
                notes={notes}
                setCustomAlertProperties={setCustomAlertProperties}
              />
            );
          })}
        </Row>
      </Container>

      <Row className="creation-note g-1" xs={1} md={2}>
        {showCreationNotes && (
          <NoteCreation
            notes={notes}
            setNotes={setNotes}
            setShowCreationNotes={setShowCreationNotes}
            setShowCustomAlert={setShowCustomAlert}
            setCustomAlertProperties={setCustomAlertProperties}
          />
        )}
      </Row>
    </Container>
  );
};

export default App;
