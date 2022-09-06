import Alert from "react-bootstrap/Alert";

const CustomAlert = (props) => {
  return (
    <Alert
      key={props.properties.variant}
      variant={props.properties.variant}
      onClose={() => props.setShow(false)}
      dismissible
    >
      {props.properties.message}
    </Alert>
  );
};
export default CustomAlert;
