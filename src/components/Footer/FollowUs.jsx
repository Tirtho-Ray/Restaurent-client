import { FaGoogle,FaFacebook,FaLinkedin } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import img1 from '../../assets/Screenshot1.png'
import img2 from '../../assets/Screenshot2.png'

const FollowUs = () => {
    return (
        <div>
            <h1 className="font-bold text-sm md:text-xl mt-3">Follow Us :</h1>
            <div className="flex gap-3 mt-3">
                <div className="text-sm md:text-xl lg-text-2xl">
                    <FaGoogle />
                </div>
                <div className="text-sm md:text-xl lg-text-2xl">
                    <FaFacebook />
                </div>
                <div className="text-sm md:text-xl lg-text-2xl">
                    <FaLinkedin />
                </div>
                <div className="text-sm md:text-xl lg-text-2xl">
                    <FaXTwitter />
                </div>
            </div>
            <div className="md:flex gap-2 md:mt-1">
                <div>
                    <img className="w-24 mt-2" src={img1} alt="" />
                </div>
                <div>
                    <img className="w-24 mt-2" src={img2} alt="" />
                </div>
            </div>
        </div>
    );
};

export default FollowUs;