import React from 'react'

function About(props){

  return (
      <div id="about" className="container about">
        <h1>{props.header}</h1>
        <p>
          {props.text}
        </p>
      </div>
  )

}

export default About
