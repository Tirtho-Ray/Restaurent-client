import img1 from "../../../assets/i4.png"
import img2 from "../../../assets/i5.png"
import img3 from "../../../assets/i6.png"
import './HomeDeliveryProcess.css'; // Import your CSS file

const HomeDeliveryProcess = () => {
    return (
        <div className="home-delivery-container"> {/* Add a container div */}
            <div className="flex justify-center mt-32 lg:mt-">
                <div className="delivery-item fade-up">
                    <img src={img1} alt="" />
                    <h1 className="md:text-2xl lg:text-3xl text-center font-Rowdies">Fastest <br /> Delivery  
                    </h1>
                    <p className="text-center mt-1 md:text-sm lg:mt-3 text-[7px] lg:text-xl font-medium text-slate-500">Get your food delivered in less <br /> than an hour! That’s as fast as <br /> it can get.</p>
                </div>
                <div className="delivery-item fade-up">
                    <img src={img2} alt="" />
                    <h1 className="md:text-2xl lg:text-3xl text-center font-Rowdies">So Much to <br />
                    Choose From
                    </h1>
                    <p className="text-center mt-1 lg:mt-3 text-[7px] md:text-sm lg:text-xl font-medium text-slate-500">Find your favourite among the <br /> thousands of restaurants in our <br /> app.</p>
                </div>
                <div className="delivery-item fade-up">
                    <img src={img3} alt="" />
                    <h1 className="md:text-2xl lg:text-3xl text-center font-Rowdies">Best Offers <br /> In Town!</h1>
                    <p className="text-center mt-1 lg:mt-3 text-[7px] md:text-sm lg:text-xl font-medium text-slate-500">Get the best offers and combos <br /> at the best price only at Pathao <br /> Food!</p>
                </div>
            </div>
        </div>
    );
};

export default HomeDeliveryProcess;
