import { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar/Navbar';
import Footer from '../components/Footer/Footer';
import './Root.css'; // Import your CSS file for additional styling

const Root = () => {
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        // Function to handle scroll event
        const handleScroll = () => {
            const scrollTop = window.scrollY;
            // Check if the user has scrolled down a certain amount (e.g., 100 pixels)
            setIsScrolled(scrollTop > 100);
        };

        // Attach scroll event listener
        window.addEventListener('scroll', handleScroll);

        // Clean up by removing the scroll event listener when component unmounts
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []); // Empty dependency array means this effect runs only once after initial render

    return (
        <div className="max-w-[1640px] mx-auto">
            <div className={` backdrop-blur-[16px]  sh bg-opacity-10 sticky ${isScrolled ? 'scrolled' : ''}`}>
                <Navbar />
            </div>
            <Outlet />
            <Footer />
        </div>
    );
};

export default Root;
