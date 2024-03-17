import AboutUs from './AboutUs';
import ContactUs from './ContactUs';
import FollowUs from './FollowUs';
import Order from './Order';

const Footer = () => {
    return (
        <div className='mt-3  px-4  bg-slate-300 '>
           <div className='md:flex justify-center'>
            <div className='md:grid md:grid-cols-2 gap-12 lg:grid-cols-4  py-20'>
                <div>
                    <FollowUs />
                </div>
                <div>
                    <AboutUs />
                </div>
                <div>
                    <ContactUs />
                </div>
                <div>
                    <Order />
                </div>
            </div>
           </div>
           
           
         <div className='py-10'>
            <p className='text-center  text-[10px]'>© Copyright 2024 Createcomm Tech Private Limited. All Rights Reserved</p>
            <p className='text-center  text-[10px] font-Rowdies'>Developer: <a href="https://github.com/Tirtho-Ray">Tirtho Ray</a></p>
         </div>
        </div>
    );
};

export default Footer;