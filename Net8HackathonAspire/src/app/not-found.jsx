import Row from "@/components/bootstrap/Row";
import Col from "@/components/bootstrap/Col";
import CenterElement from "@/components/bootstrap/CenterElement";
import NextLink from "@/components/NextLink";
import Card from "@/components/bootstrap/Card";

const NotFoundPage = () => {
  return (
    <>
      <div className="page">
        <Row className="mt-5">
          <Col ColNumSize="3"> </Col>
          <Col ColNumSize="6">
            <CenterElement>
              <CenterElement>
                <div className="text-center">
                  <h3>It looks like this page doesn't exist!</h3>
                  <NextLink className="btn btn-primary mt-2" path="/">
                    Go Home
                  </NextLink>
                </div>
              </CenterElement>
            </CenterElement>
          </Col>
          <Col ColNumSize="3"> </Col>
        </Row>
      </div>
    </>
  );
};

export default NotFoundPage;
