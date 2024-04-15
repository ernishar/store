import {
  Container,
  Row,
  Col,
  Nav,
  Accordion,
  Card,
  Button,
  Dropdown,
} from "react-bootstrap";
import AccordionCollapse from "react-bootstrap/AccordionCollapse";
import DropdownMenu from "react-bootstrap/DropdownMenu";

const Sidebar = () => {
  return (
    <Container fluid className="mt-4">
      <Row className="flex-nowrap">
        <Col xs={12} md={3} xl={2} className="px-sm-2 px-0 bg-dark text-white">
          <div className="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 min-vh-100">
            <hr />
            <Dropdown className="pb-4">
              <Dropdown.Toggle
                id="dropdownUser1"
                className="d-flex align-items-center text-white text-decoration-none"
                aria-expanded="false"
              >
                <img
                  src="https://github.com/mdo.png"
                  alt="hugenerd"
                  width="30"
                  height="30"
                  className="rounded-circle"
                />
              </Dropdown.Toggle>
              <DropdownMenu variant="dark" className="text-small shadow">
                <Dropdown.Item href="#">New project...</Dropdown.Item>
                <Dropdown.Item href="#">Settings</Dropdown.Item>
                <Dropdown.Item href="#">Profile</Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item href="#">Sign out</Dropdown.Item>
              </DropdownMenu>
            </Dropdown>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Sidebar;
