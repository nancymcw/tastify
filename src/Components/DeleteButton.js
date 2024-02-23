import { restaurantAPI } from "../REST/RestaurantsAPI";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export function DeleteButton(props) {
  //Getting restaurant ID from props/parent component
  const restaurantId = props.id;
  //Getting deleteRestaurant function for DELETE CRUD operation from my restaurantAPI file.
  const { deleteRestaurant } = restaurantAPI;
  //Used the useNavigate method included with React Router to change pageview back to the list on deletion.
  let navigate = useNavigate();
  //This function takes the event(click) & the restaurant ID to DELETE restaurant, then removeRestaurant is called to filter restaurants on the redirect to the /restaurants page.
  const handleDelete = (e, restaurantId) => {
    console.log(restaurantId);
    e.preventDefault();
    deleteRestaurant(restaurantId);
    alert("Restaurant deleted.");
    props.removeRestaurant(restaurantId);
    navigate("/restaurants");
  };

  return (
    <Button
      variant="dark"
      onClick={(e) => {
        handleDelete(e, restaurantId);
      }}
    >
      Delete
    </Button>
  );
}
