"use client"
import Card from "../components/bootstrap/Card";
import Row from "../components/bootstrap/Row";
import Col from "../components/bootstrap/Col";
import "../styles/Home.css";
import NextLink from "@/components/NextLink";
import Image from "next/image";
import logo from "../../public/logo.png";

const HomePage = () => {
  return (
    <div className="page">
      <Row>
        <Col ColNumSize="3"> </Col>
        <Col ColNumSize="6">
          <section className="hero">
            <div className="container">
              <div className="w-100 d-flex justify-content-center">
              <Image
                alt="Application Hackathon Logo"
                src={logo.src}
                width={0}
                height={0}
                sizes="100vw"
                style={{ width: "auto",  height: "auto", minHeight:"200px" }}
              ></Image>
              </div>
              <p>
                Welcome to my database management application. Easily connect
                to any Postgres database and manage your data.
              </p>
              <NextLink
                path="/account/register"
                className="btn btn-primary color-btn"
              >
                Get Started
              </NextLink>
              <section className="features">
                <div className="container">
                  <h2 className="text-decoration-underline">Key Features</h2>
                  <div className="feature">
                    <h3 className="text-decoration-underline">Connect to Any Postgres Database</h3>
                    <p>
                      Easily connect to Postgres databases on Cockroach, Heroku
                      Postgres, and more. If you have access to your connection
                      settings, you can connect!
                    </p>
                  </div>
                  <div className="feature">
                    <h3 className="text-decoration-underline">Data Management</h3>
                    <p>
                      Efficiently manage your data with intuitive tools and
                      interfaces.
                    </p>
                  </div>
                </div>
              </section>
            </div>
          </section>
        </Col>
        <Col ColNumSize="3"> </Col>
      </Row>
    </div>
  );
};

export default HomePage;
