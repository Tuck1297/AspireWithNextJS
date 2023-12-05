import Card from "@/components/bootstrap/Card";
import Row from "@/components/bootstrap/Row";
import Col from "@/components/bootstrap/Col";
import CenterElement from "@/components/bootstrap/CenterElement";

import RegisterForm from "@/components/forms/Register";
const RegisterPage = () => {
  return (
    <div className="page">
      <Row>
        <Col ColNumSize="3"> </Col>
        <Col ColNumSize="6">
          <CenterElement>
            <Card header="Register" className="mt-5">
              <RegisterForm />
            </Card>
          </CenterElement>
        </Col>
        <Col ColNumSize="3"> </Col>
      </Row>
    </div>
  );
};

export default RegisterPage;
