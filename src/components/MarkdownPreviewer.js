import { Container, Form, FormGroup } from "react-bootstrap";

import ReactMarkdown from "react-markdown";
import SyntaxHighlighter from "react-syntax-highlighter";

import { docco } from "react-syntax-highlighter/dist/esm/styles/hljs";

const MarkdownPreviewer = (props) => {
  return (
    <Form.Group>
      {props.disabled && (
        <div>
          <Form.Label>Markdown Preview</Form.Label>
          <br />
          <Form.Label>
            <ReactMarkdown
              children={props.markdownInput}
              components={{
                code: MarkComponent,
              }}
            />
          </Form.Label>
          {/*  */}
        </div>
      )}

      {!props.disabled && (
        <div>
          <Form.Label>
            <ReactMarkdown>{props.markdownInput}</ReactMarkdown>
          </Form.Label>
          <p></p>
        </div>
      )}
    </Form.Group>
  );
};

export default MarkdownPreviewer;

const MarkComponent = ({ value, language }) => {
  return (
    <SyntaxHighlighter language={language ?? null} style={docco}>
      {value ?? ""}
    </SyntaxHighlighter>
  );
};
