import React from "react";

function Slider() {
  return (
    <div className="container mt-4">
      <div
        id="carouselExampleControls"
        className="carousel slide"
        data-bs-ride="carousel"
      >
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img
              src={"../Images/2021-bmw-m4-x3.jpg"}
              className="d-block w-100 slider-img"
              alt="Slide 1"
            />
          </div>
          <div className="carousel-item">
            <img
              src={"../Images/1 BMW M3 xDrive.webp"}
              className="d-block w-100 slider-img"
              alt="Slide 2"
            />
          </div>
          <div className="carousel-item">
            <img
              src={"../Images/12.webp"}
              className="d-block w-100 slider-img"
              alt="Slide 3"
            />
          </div>
        </div>

        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleControls"
          data-bs-slide="prev"
        >
          <span
            className="carousel-control-prev-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Previous</span>
        </button>

        {/* Next Button */}
        <button
          className="carousel-control-next mb-5"
          type="button"
          data-bs-target="#carouselExampleControls"
          data-bs-slide="next"
        >
          <span
            className="carousel-control-next-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
      <div className="margin"></div>
    </div>
  );
}

export default Slider;
