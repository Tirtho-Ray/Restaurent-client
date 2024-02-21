import HomeContent from "./HomeContent";
import HomeCustomerReview from "./HomeCustomerReview";
import HomeDeliveryProcess from "./HomeDeliveryProcess";
import HomeSlider from "./HomeSlider";


const Home = () => {
    return (
        <div>
           <HomeSlider></HomeSlider>
           <HomeContent />
           {/* <HomeCustomerReview /> */}
           <HomeDeliveryProcess />
        </div>
    );
};

export default Home;