import { useState } from "react";
import { Col, Form, Row } from "react-bootstrap";

function ScoopOption({ item: { name, imagePath }, updateItemCount }) {
  const [isInvalid, setIsInvalid] = useState(false);

  const handleChange = (event) => {
    const currentValue = event.target.value;
    updateItemCount(name, currentValue);

    // parse string to number
    const testValue = parseFloat(currentValue);
    setIsInvalid(
      testValue < 0 || testValue > 10 || testValue !== parseInt(currentValue)
    );
  };

  return (
    <Col xs={12} sm={8} md={6} lg={4} style={{ textAlign: "center" }}>
      <img
        style={{ width: "75%" }}
        src={`http://localhost:3030${imagePath}`}
        alt={`${name} scoop`}
      />
      <Form.Group
        controlId={`${name}-count`}
        as={Row}
        style={{ marginTop: "10px" }}
      >
        <Form.Label column xs="6" style={{ textAlign: "right" }}>
          {name}
        </Form.Label>
        <Col xs="5" style={{ textAlign: "left" }}>
          <Form.Control
            type="number"
            defaultValue={0}
            onChange={handleChange}
            isInvalid={isInvalid}
          />
        </Col>
      </Form.Group>
    </Col>
  );
}

export default ScoopOption;
