import React, { useState } from "react";
import { restaurantAPI } from "../REST/RestaurantsAPI";
import { Button } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { LikedIt } from "./LikedIt";
import { DislikedIt } from "./DislikedIt";

const AddNewRestaurant = () => {
  const [newRestaurantName, setNewRestaurantName] = useState("");
  const [newRestaurantImage, setNewRestaurantImage] = useState("");
  const [newRestaurantCuisine, setNewRestaurantCuisine] = useState("");
  const [newRestaurantDate, setNewRestaurantDate] = useState(undefined);
  const [newRestaurantLike, setNewRestaurantLike] = useState(false);
  const { post } = restaurantAPI;

  //Post submit button for the new restaurant form submit button.
  const handlePostSubmit = (e) => {
    e.preventDefault();
    // returning alert if there is an empty input in the form(besides image, I have a default image for if user does not want to add image)
    if (
      !newRestaurantName ||
      !newRestaurantCuisine ||
      !newRestaurantDate ||
      !newRestaurantLike
    ) {
      return alert(
        "Please at least add name, cuisine, date visited, & rating for new restaurant."
      );
    }

    // POST
    post(
      newRestaurantName,
      newRestaurantCuisine,
      newRestaurantImage,
      newRestaurantDate,
      newRestaurantLike
    )
      .then((data) => {
        console.log(data); // logging data for myself
        // then clearing the form
        setNewRestaurantName("");
        setNewRestaurantCuisine("");
        setNewRestaurantImage("");
        setNewRestaurantDate("");
        //Alert to show that data went through successfully
        alert("Restaurant successfully added!");
      })
      .catch((error) => {
        console.error("Error adding new restaurant:", error);
      });
  };
  //Form for filling out each input, connected to the setState that's for that data respectively and using event targets to get the input data from the form.
  return (
    <div className="container fluid" id="add-new-div">
      <Form>
        <Form.Group className="mb-3" controlId="formNewRestaurantName">
          <Form.Label>Restaurant Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Restaurant Name"
            value={newRestaurantName}
            onChange={(e) => setNewRestaurantName(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formNewCuisine">
          <Form.Label>Cuisine</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Cuisine"
            value={newRestaurantCuisine}
            onChange={(e) => setNewRestaurantCuisine(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formNewImage">
          <Form.Label>Image</Form.Label>
          <Form.Control
            type="text"
            placeholder="Optional. Picture of food or the restaurant itself!"
            value={newRestaurantImage}
            onChange={(e) => setNewRestaurantImage(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formNewDate">
          <Form.Label>Date Visited</Form.Label>
          <Form.Control
            type="date"
            value={newRestaurantDate}
            onChange={(e) => setNewRestaurantDate(e.target.value)}
          />
          <br />
        </Form.Group>
        <Form>
          {/* radio form for boolean data for the like or dislike option, learned to make it so that you can only select on at a time they have to have the same name value. */}
          How was it?
          <div key={`inline-radio`} className="mb-3">
            <Form.Check
              inline
              label={<LikedIt />}
              name="like-radio"
              value={true}
              type="radio"
              id={`inline-radio-1`}
              onChange={(e) => setNewRestaurantLike(e.target.value)}
            />
            Liked it!
            <br />
            <Form.Check
              inline
              label={<DislikedIt />}
              name="like-radio"
              value={false}
              type="radio"
              id={`inline-radio-2`}
              onChange={(e) => setNewRestaurantLike(e.target.value)}
            />
            Did not enjoy...
          </div>
        </Form>

        <Button variant="dark" onClick={(e) => handlePostSubmit(e)}>
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default AddNewRestaurant;
