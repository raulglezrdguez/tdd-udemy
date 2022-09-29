import { Col, Form } from "react-bootstrap";

function ToopingOption({ item: { name, imagePath }, updateItemCount }) {
  return (
    <Col xs={12} sm={8} md={6} lg={4} style={{ textAlign: "center" }}>
      <img
        style={{ width: "75%" }}
        src={`http://localhost:3030/${imagePath}`}
        alt={`${name} topping`}
      />
      <Form>
        <Form.Group controlId={`${name}-topping`}>
          <Form.Check
            type="checkbox"
            onChange={(e) => updateItemCount(name, e.target.checked ? 1 : 0)}
            label={name}
          />
        </Form.Group>
      </Form>
    </Col>
  );
}

export default ToopingOption;
