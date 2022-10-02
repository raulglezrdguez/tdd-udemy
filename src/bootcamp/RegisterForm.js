import { useState } from "react";
import { Button, Form, Row } from "react-bootstrap";
import AlertBanner from "../pages/common/AlertBanner";

const re_email =
  /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

function RegisterForm() {
  const [registerInput, setRegisterInput] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");

  const handleChange = (event) => {
    setRegisterInput({
      ...registerInput,
      [event.target.name]: event.target.value,
    });
    setError("");
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!registerInput.email.match(re_email)) {
      setError("The email you input is invalid");
    } else if (registerInput.password.trim().length < 5) {
      setError("The password must have at less 5 charaters length");
    } else if (registerInput.confirmPassword !== registerInput.password) {
      setError("The passwords don't match");
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group
        controlId="email"
        as={Row}
        style={{ marginTop: "10px", marginBottom: "10px" }}
      >
        <Form.Label>Email address</Form.Label>
        <Form.Control
          type="email"
          name="email"
          value={registerInput.email}
          onChange={handleChange}
        />
      </Form.Group>
      <Form.Group
        controlId="password"
        as={Row}
        style={{ marginTop: "10px", marginBottom: "10px" }}
      >
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          name="password"
          value={registerInput.password}
          onChange={handleChange}
        />
      </Form.Group>
      <Form.Group
        controlId="confirmPassword"
        as={Row}
        style={{ marginTop: "10px", marginBottom: "10px" }}
      >
        <Form.Label>Confirm password</Form.Label>
        <Form.Control
          type="password"
          name="confirmPassword"
          value={registerInput.confirmPassword}
          onChange={handleChange}
        />
      </Form.Group>

      {error && <AlertBanner message={error} variant={"span"} />}

      <Button type="submit" variant="primary">
        Submit
      </Button>
    </Form>
  );
}

export default RegisterForm;
