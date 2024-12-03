import { Link } from "react-router-dom";
import { Navbar } from "flowbite-react";

export function CustomNav() {
  return (
    <Navbar fluid rounded>
      <Navbar.Brand as={Link} href="https://flowbite-react.com">
        <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">Flowbite React</span>
      </Navbar.Brand>
      <Navbar.Toggle />
      <Navbar.Collapse>
        <Navbar.Link href="#" active>
          Home
        </Navbar.Link>
        <Navbar.Link as={Link} href="#">
          About
        </Navbar.Link>
        <Navbar.Link href="/register">Register</Navbar.Link>
        <Navbar.Link href="/login">Login</Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
  );
}