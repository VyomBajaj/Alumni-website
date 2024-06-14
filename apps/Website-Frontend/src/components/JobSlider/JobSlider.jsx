import React from 'react';
import Slider from 'react-slick';
import './JobSlider.css'; // Importing CSS file for styling
// import BlogCard from '../BlogCard/BlogCard';
import JobCard from '../JobCard/JobCard'

const JobSlider = () => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 4,
        // autoplay: true,
        // autoplaySpeed: 5000 autoplay image,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                }
            }
        ]
    };

    const images = [
        'https://via.placeholder.com/300x200?text=Image+1',
        'https://via.placeholder.com/300x200?text=Image+2',
        'https://via.placeholder.com/300x200?text=Image+3',
        'https://via.placeholder.com/300x200?text=Image+4',
        'https://via.placeholder.com/300x200?text=Image+5',
        'https://via.placeholder.com/300x200?text=Image+6',
        'https://via.placeholder.com/300x200?text=Image+7',
        'https://via.placeholder.com/300x200?text=Image+8',
    ];

    return (
        <div className="image-slider">
            <Slider {...settings}>
                <JobCard />
                <JobCard />
                <JobCard />
                <JobCard />
                <JobCard />
                <JobCard />
                <JobCard />
                <JobCard />
            </Slider>
        </div>
    );
};

export default JobSlider;

//alumni slider
//event card -->slider
//job card -->slider

