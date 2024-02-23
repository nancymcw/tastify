import React from "react";
import { Card, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { LikedIt } from "./LikedIt";
import { DislikedIt } from "./DislikedIt";

const RestaurantList = ({ restaurants, setRestaurants }) => {
  //Mapping out all of the restaurants and styling them to show their information in each card. Did some css styling so that when you hover over the div edit-img-box the text 'Click to edit' appears.
  //Couldnt get boolean to work for my like & dislike because of json stringifying my inputs so instead I have a ternary for displaying either the thumbs up or thumbs down component if the string matches(Line 39).
  return (
    <div>
      <h2>My Restaurants</h2>
      <div className="card--container">
        <Row>
          {restaurants.map((restaurant) => (
            <Card
              key={restaurant.id}
              style={{ width: "18rem", padding: "5px", margin: "5px" }}
            >
              <div className="edit-img-box">
                {/* Link to each restaurant id attached to useParams with React Router. */}
                <Link to={`${restaurant.id}`}>
                  <Card.Img
                    id="card-img"
                    variant="top"
                    src={restaurant.img}
                    alt={restaurant.restaurantName}
                  />
                  <p className="card-edit-text">Click to Edit</p>
                </Link>
              </div>
              <Card.Body>
                <Card.Title id="greenCardTitle">
                  {restaurant.restaurantName}
                </Card.Title>
                <Card.Text>
                  <strong>Your rating:</strong>
                  {restaurant.like === "true" ? (
                    <LikedIt like={restaurant.like} />
                  ) : (
                    <DislikedIt />
                  )}
                  <br />
                  <strong>Cuisine:</strong> {restaurant.cuisine}
                  <br />
                  <strong>Date visited:</strong> {restaurant.dateVisited}
                </Card.Text>
              </Card.Body>
            </Card>
          ))}
        </Row>
      </div>
    </div>
  );
};

export default RestaurantList;
