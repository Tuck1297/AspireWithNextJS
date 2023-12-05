import Card from "@/components/bootstrap/Card";
import Row from "@/components/bootstrap/Row";
import Col from "@/components/bootstrap/Col";
import CenterElement from "@/components/bootstrap/CenterElement";

import LoginForm from "@/components/forms/Login";

const LoginPage = () => {
  return (
    <div className="page">
      <Row>
        <Col ColNumSize="3"> </Col>
        <Col ColNumSize="6">
          <CenterElement>
            <Card header="Login" className="mt-5">
              <LoginForm />
            </Card>
          </CenterElement>
        </Col>
        <Col ColNumSize="3"> </Col>
      </Row>
    </div>
  );
};

export default LoginPage;
