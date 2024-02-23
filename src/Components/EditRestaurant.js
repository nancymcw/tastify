import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import { restaurantAPI } from "../REST/RestaurantsAPI";
import { LikedIt } from "./LikedIt";
import { DislikedIt } from "./DislikedIt";

function EditRestaurant(props) {
  //Setting state for whether or not the modal is showing, by default it is set to false until you click on the edit button.
  const [show, setShow] = useState(false);
  //Then functions for the modal opening and closing, setting setShow to true or false.
  const handleClose = () => {
    setShow(false);
    if (props.onModalClose) {
      props.onModalClose();
    }
  };

  const handleShow = () => setShow(true);

  //State for the updated restaurant information after edited

  const [updatedRestaurantName, setUpdatedRestaurantName] = useState(
    props.restaurantName
  );
  const [updatedRestaurantCuisine, setUpdatedRestaurantCuisine] = useState(
    props.cuisine
  );
  const [updatedRestaurantImage, setUpdatedRestaurantImage] = useState(
    props.img
  );
  const [updatedRestaurantDate, setUpdatedRestaurantDate] = useState(
    props.dateVisited
  );
  const [updatedRestaurantLike, setUpdatedRestaurantLike] = useState(
    props.like
  );
  //Getting PUT operation from API service file.
  const { put } = restaurantAPI;
  //Function for submitting the edited restaurant
  const handleUpdateSubmit = (e) => {
    e.preventDefault();
    //Pulling the current restaurant info from props
    const updatedRestaurant = {
      id: props.id,
      restaurantName: updatedRestaurantName,
      cuisine: updatedRestaurantCuisine,
      img: updatedRestaurantImage,
      dateVisited: updatedRestaurantDate,
      like: updatedRestaurantLike,
    };

    //PUT for updating the information in the API.
    put(updatedRestaurant)
      .then((data) => {
        console.log(data); // log the response data
        // props.onUpdateSuccess();
        // updateSubmitted();
        props.handleModalClose(); //This refreshes the page, / passed it down from an above component.
        handleClose(); // close the modal after successful update
      })
      .catch((error) => {
        console.error("Error updating restaurant:", error);
      });
  };
  //Below we have the editing form. All values are set to the initial value(updatedRestaurant) so that if you only want to edit one or however many items the rest will be left as is. On change of the form/ on submit all of it will be updated with use of the setState method.
  return (
    <>
      <Button variant="dark" onClick={handleShow}>
        Edit
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>{props.restaurantName}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form id="edit-modal">
            <h3>Update This Restaurant:</h3>
            <br />

            <Form>
              <Form.Group className="mb-3" controlId="formUpdateRestaurantName">
                <Form.Label>Restaurant Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder={props.restaurantName}
                  value={updatedRestaurantName}
                  onChange={(e) => setUpdatedRestaurantName(e.target.value)}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formUpdateCuisine">
                <Form.Label>Cuisine</Form.Label>
                <Form.Control
                  type="text"
                  placeholder={props.cuisine}
                  value={updatedRestaurantCuisine}
                  onChange={(e) => setUpdatedRestaurantCuisine(e.target.value)}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formUpdateImage">
                <Form.Label>Image</Form.Label>
                <Form.Control
                  type="text"
                  placeholder={props.img}
                  value={updatedRestaurantImage}
                  onChange={(e) => setUpdatedRestaurantImage(e.target.value)}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formUpdateDateVisited">
                <Form.Label>Date Visited</Form.Label>
                <Form.Control
                  type="date"
                  value={updatedRestaurantDate}
                  onChange={(e) => setUpdatedRestaurantDate(e.target.value)}
                />
              </Form.Group>
              How was it?
              <div key={`inline-radio`} className="mb-3">
                <Form.Check
                  inline
                  label={<LikedIt />}
                  name="like-radio"
                  value={true}
                  type="radio"
                  id={`inline-radio-1`}
                  onChange={(e) => setUpdatedRestaurantLike(e.target.value)}
                />
                <Form.Check
                  inline
                  label={<DislikedIt />}
                  name="like-radio"
                  value={false}
                  type="radio"
                  id={`inline-radio-2`}
                  onChange={(e) => setUpdatedRestaurantLike(e.target.value)}
                />
              </div>
            </Form>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button
            variant="primary"
            form="edit-modal"
            onClick={(e) => {
              handleUpdateSubmit(e);
            }}
          >
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default EditRestaurant;
