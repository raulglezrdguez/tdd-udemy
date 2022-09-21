import { Col } from 'react-bootstrap';

function ToopingOption({ item: { name, imagePath } }) {
  return (
    <Col xs={12} sm={8} md={6} lg={4} style={{ textAlign: 'center' }}>
      <img
        style={{ width: '75%' }}
        src={`http://localhost:3030/${imagePath}`}
        alt={`${name} topping`}
      />
    </Col>
  );
}

export default ToopingOption;
