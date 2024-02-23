import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import { Home } from "./Pages/Home";
import { RestaurantsPage } from "./Pages/RestaurantsPage";
import { NewRestaurantForm } from "./Pages/NewRestaurantForm";
import { Restaurant } from "./Pages/RestaurantSoloPage";
import { Navigation } from "./Components/Navigation";
import { restaurantAPI } from "./REST/RestaurantsAPI";

//Set state all the way up top in App so that I could pass it down through other components. The state here is the updated restaurants / GETting the restaurant information from the API. I pass it to the pages that contain the Restaurant information.
export default function App() {
  const [restaurants, setRestaurants] = useState([]);
  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const data = await restaurantAPI.get();
        setRestaurants(data);
      } catch (error) {
        console.error("Error fetching restaurants:", error);
      }
    };
    fetchRestaurants();
  }, []);

  //A function for updating the state when a restaurant is deleted, that I passed down to the DeleteRestaurant button component so that the restaurant list displays properly when redirected after deletion.
  const removeRestaurant = (id) => {
    let filteredRestaurants = restaurants.filter((restaurant) => {
      return restaurant.id !== id;
    });
    console.log("filtered restaurant", filteredRestaurants);
    setRestaurants(filteredRestaurants);
  };
  //React Router routing with paths for each page
  return (
    <>
      <Navigation />
      <Router>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/restaurants">
            <Route
              index
              element={
                <RestaurantsPage
                  restaurants={restaurants}
                  setRestaurants={setRestaurants}
                />
              }
            />
            <Route
              path=":id"
              element={
                <Restaurant
                  restaurants={restaurants}
                  removeRestaurant={removeRestaurant}
                />
              }
            />
          </Route>
          <Route path="/addnewrestaurant" element={<NewRestaurantForm />} />
        </Routes>
      </Router>
    </>
  );
}
