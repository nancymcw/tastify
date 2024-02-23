import RestaurantList from "../Components/RestaurantList";
//This page contains one component, the restaurantList, where I've passed props down from App.js through this.
export function RestaurantsPage({ restaurants, setRestaurants }) {
  return (
    <div className="container fluid">
      <RestaurantList
        restaurants={restaurants}
        setRestaurants={setRestaurants}
      />
    </div>
  );
}
