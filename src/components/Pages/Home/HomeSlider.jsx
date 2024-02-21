
import  { useState, useEffect } from 'react';
// import { FaLessThan } from "react-icons/fa";
import { FaArrowCircleRight,FaArrowCircleLeft } from "react-icons/fa";
import { motion } from "framer-motion"
import { fadeIn, staggerContainer } from '../../Variant';
// import img from '../../../assets/images (1).jpg';


const HomeSlider = () => {
  const [images, setImages] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPreviousClicked, setPreviousClicked] = useState(false);
  const [isNextClicked, setNextClicked] = useState(false);

  useEffect(() => {
    // featch my data from data.json
    fetch('/Data.json') 
      .then((response) => response.json())
      .then((data) => setImages(data))
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  // slider
  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
    setNextClicked(true);
    setPreviousClicked(false);
  };

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
    setPreviousClicked(true);
    setNextClicked(false);
  };

  return (
    <div className="relative w-full max-w-[1580px] mx-auto px-2 md:px-4  ">
      <motion.div
       initial={{y:-3000}}
       animate={{y:0}}
       transition={{
           duration:"1",
           delay:"0.1"
       }}
      
      className="slider-container relative w-full h-96
       md:h-[300px] lg:h-[470px]">
        {images?.map((image, index) => (
          <div
            key={image.id}
            className={`slide absolute md:h-[300px] lg:h-[470px]  w-full h-96 transition-transform duration-300 transform translate-x-${100 * (index - currentIndex)} ${
              index === currentIndex ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <img src={image.image} alt={image.title} className="object-cover w-full h-full opacity-85" />
            <div className='absolute bottom-36 md:bottom-10 lg:bottom-24 left-1/2 transform -translate-x-1/2 w-[200px] md:w-[300px] lg:w-[400px]
            text-center  '>

              {/* Text animation */}
              <motion.p 
              variants={staggerContainer(0.3,1)}
              initial='hidden'
              whileInView={'show'}
              // img
              className='text-4xl md:text-6xl lg:text-7xl ml-3 font-extrabold text-white font-BBlack'>
                  <motion.span  variants={fadeIn('down','tween',0.2,1.1)}>The Best </motion.span>
                  <motion.span  variants={fadeIn('down','tween',0.3,2.1)}>Food</motion.span>
                  <motion.span  variants={fadeIn('down','tween',0.4,3.1)}> Delivered</motion.span>
              </motion.p>
          </div>

          </div>
        ))}
      </motion.div>

      {/* slider arrow */}
      <motion.div 
      initial={{y:-3000}}
      animate={{y:0}}
      transition={{
          duration:"1",
          delay:"0.1"
      }}

      className="flex justify-end mt-3 mr-2  right-8">
      <button
        onClick={goToPrevious}
        className={` mr-4 text-xl rounded-full ${isPreviousClicked ? 'bg-blue-500' : ''}`}
      >
        <FaArrowCircleLeft />
      </button>
        <button
        onClick={goToNext}
        className={` text-xl rounded-full ${isNextClicked ? 'bg-green-500' : ''}`}
      >
        <FaArrowCircleRight />
      </button>
      
      </motion.div>
      
    </div>
  );
};

export default HomeSlider;