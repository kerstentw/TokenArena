import React from "react"

class Carousel extends React.Component {
    render() {
        return (
          <div id="carousel-title" className="carousel slide" data-ride="carousel">
              <div className="carousel-inner">
                  <div id="titc-backer1" className="carousel-item active">

                  </div>
                  <div id="titc-backer2" className="carousel-item">
                  </div>
                  <div id="titc-backer3"className="carousel-item">
                  </div>
              </div>
              <a className="carousel-control-prev" role="button" href="#carousel-title" data-slide="prev">
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                <span className="sr-only">Previous</span>
              </a>
              <a className="carousel-control-next" role="button" href="#carousel-title" data-slide="next">
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                <span className="sr-only">Next</span>
              </a>
          </div>
        )

    }
}

export default Carousel
