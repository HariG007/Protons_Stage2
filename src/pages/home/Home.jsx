import { useEffect } from "react";
import "./home.css";
import { useUserStore } from "../../stores/userStore";
import { useAppStore } from "../../stores/appStore";
import Loading from "./Loading";
import Map from "./Map";
import Search from "./Search";
import Result from "./Result";

function Home() {
  const { currPosition, setCurrentPostion } = useUserStore();
  // const {userData, setUserData} = useUserStore();
  const { view } = useAppStore();

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.permissions.query({ name: "geolocation" }).then(function () {
        navigator.geolocation.getCurrentPosition((pos) => {
          var crd = pos.coords;
          console.log("Your current position is:");
          console.log(`Latitude : ${crd.latitude}`);
          console.log(`Longitude: ${crd.longitude}`);
          setCurrentPostion([crd.latitude, crd.longitude]);
        });
      });
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  }, []);

  if (!currPosition) {
    return <Loading />;
  }
  return (
    <>
      <div className="container">
        <Search />
        {view === 1 ? <Result /> : null}
      </div>
      <Map />
    </>
  );
}

export default Home;
