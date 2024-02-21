import img1 from "../../../assets/i4.png"
import img2 from "../../../assets/i5.png"
import img3 from "../../../assets/i6.png"

const HomeCustomerReview = () => {
    return (
        <div>
            <div>
                <img src={img1} alt="" />
                    <h1>Fastest Delivery  
                    </h1>
            </div>
            <div>
                <img src={img2} alt="" />
                <h1>So Much to
                Choose From
                </h1>
            </div>
            <div>
                <img src={img3} alt="" />
                <h1>Best Offers In Town!</h1>
            </div>
        </div>
    );
};

export default HomeCustomerReview;