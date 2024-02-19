import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import EditRestaurant from "../Components/EditRestaurant";
import { restaurantAPI } from "../REST/RestaurantsAPI";
import { HandThumbsUpFill } from "react-bootstrap-icons";

export function Restaurant(props) {
  console.log("props", props);
  const { id } = useParams();
  console.log("id", id);

  const [specificRestaurant, setSpecificRestaurant] = useState([]);
  const showRestaurant = async () => {
    console.log("show restaurant", props);
    props.restaurants.map((restaurant) => {
      if (id === restaurant.id) {
        setSpecificRestaurant(restaurant);
      }
      console.log(id, "mapped restaurants", restaurant);
    });
  };

  useEffect(() => {
    showRestaurant();
  });

  const { deleteRestaurant } = restaurantAPI;

  // Function for handling deletion with delete button
  const handleDelete = (e, restaurant) => {
    e.preventDefault();
    deleteRestaurant(restaurant);
    // let updatedRest = restaurants.filter((item) => item.id !== restaurant.id);
    // setRestaurants(updatedRest);
  };

  const handleModalClose = () => {
    window.location.reload();
  };

  return (
    <div className="container fluid" id="add-new-div">
      <h2>{specificRestaurant.restaurantName}</h2> {specificRestaurant.cuisine}
      <br />
      <img
        src={specificRestaurant.img}
        alt="Image for this restaurant"
        width="500rem"
      />
      <br />
      You visited on {specificRestaurant.dateVisited}
      <br />
      You Liked It <HandThumbsUpFill size={20} />
      <br />
      <EditRestaurant
        id={specificRestaurant.id}
        restaurantName={specificRestaurant.restaurantName}
        cuisine={specificRestaurant.cuisine}
        img={specificRestaurant.img}
        handleModalClose={() => {
          handleModalClose();
        }}
        // handleDelete={handleDelete}
        // onUpdateSuccess={updateRestaurantList}
      />
    </div>
  );
}
