import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import EditRestaurant from "../Components/EditRestaurant";
import { LikedIt } from "../Components/LikedIt";
import { DislikedIt } from "../Components/DislikedIt";
import { DeleteButton } from "../Components/DeleteButton";

//Each restaurant has its own page. React Router has the useParams method so I could use the restaurant id to change the url when clicked.
export function Restaurant(props) {
  const { id } = useParams();

  //Set state for figuring out which restaurant in the list we're showing by mapping out the restaurants and singling out the one with the matching id to the page url.

  const [specificRestaurant, setSpecificRestaurant] = useState([]);

  const showRestaurant = async () => {
    console.log("show restaurant", props);
    props.restaurants.map((restaurant) => {
      if (id === restaurant.id) {
        setSpecificRestaurant(restaurant);
      }
      // console.log(id, "mapped restaurants", restaurant);
    });
  };

  useEffect(() => {
    showRestaurant();
  });

  //Reload the page so that the updates made when edited show.

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
      <strong>Your rating:</strong>
      {specificRestaurant.like === "true" ? (
        <LikedIt like={specificRestaurant.like} />
      ) : (
        <DislikedIt />
      )}
      <br />
      {/* Adding in the EditRestaurant component that opens a modal to alter any details, passed props containing the restaurant info of the current restaurant page we're on. */}
      <EditRestaurant
        id={specificRestaurant.id}
        restaurantName={specificRestaurant.restaurantName}
        cuisine={specificRestaurant.cuisine}
        img={specificRestaurant.img}
        handleModalClose={() => {
          handleModalClose();
        }}
      />
      <br />
      <DeleteButton
        id={specificRestaurant.id}
        restaurantName={specificRestaurant.restaurantName}
        cuisine={specificRestaurant.cuisine}
        img={specificRestaurant.img}
        like={specificRestaurant.like}
        removeRestaurant={props.removeRestaurant}
        // handleReload={() => {
        //   onPostSuccess();
        // }}
      />
    </div>
  );
}
