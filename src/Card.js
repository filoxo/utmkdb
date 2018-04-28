import React from 'react'
import './Card.css'

const Card = props => {
  const { Image, Name, Switches, Keycaps } = props
  return (
    <div className="Card">
      {Image ? (
        <div
          className="CardHeader"
          style={{ backgroundImage: `url(${Image[0].thumbnails.large.url}` }}
        />
      ) : (
        <div
          className="CardHeader"
          data-chip={Name.split(' ')[0]}
          style={{ backgroundColor: 'rgba(0,0,0,.1)' }}
        />
      )}
      <div className="CardBody">
        <h3>{Name}</h3>
        <p>
          <span className="CardLabel">Switches: </span>
          {Switches}
        </p>
        <p>
          <span className="CardLabel">Keycaps: </span>
          {Keycaps}
        </p>
      </div>
    </div>
  )
}

export default Card
