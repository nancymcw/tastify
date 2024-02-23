import { Form, Button } from "react-bootstrap/";
// A search bar I found the style for on react bootstrap, thought it would look nice in the navbar.
export function SearchBar() {
  return (
    <Form className="d-flex">
      <Form.Control
        type="search"
        placeholder="Search for a restaurant..."
        className="me-2"
        aria-label="Search"
      />
      <Button variant="outline-dark">Search</Button>
    </Form>
  );
}
