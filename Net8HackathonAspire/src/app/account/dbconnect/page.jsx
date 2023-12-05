"use client";
import Row from "@/components/bootstrap/Row";
import Col from "@/components/bootstrap/Col";
import ConnectionStringForm from "@/components/forms/ConnectionString";
import Card from "@/components/bootstrap/Card";
import CardBody from "@/components/bootstrap/CardBody";
import CardHeader from "@/components/bootstrap/CardHeader";
import CenterElement from "@/components/bootstrap/CenterElement";
import { useRouter } from "next/navigation";
import { useContext, useEffect } from "react";
import { UserAuthContext } from "@/components/UserAuthContext";

// TODO: checked if signed in if not then redirect

export default function NewConnectionPage() {
  const { signedIn } = useContext(UserAuthContext);
  const router = useRouter();

  useEffect(() => {
    if (!signedIn.loggedIn) {
      router.push("/");
    }
  }, []);

  return (
    <div className="page">
      <Row className="g-0">
        <Col ColNumSize="1"> </Col>
        <Col ColNumSize="10">
          <CenterElement>
            <Card className="mt-5 mb-5" header="New Database Connection">
              <ConnectionStringForm />
            </Card>
          </CenterElement>
        </Col>
        <Col ColNumSize="1"> </Col>
      </Row>
    </div>
  );
}
