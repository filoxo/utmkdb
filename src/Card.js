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
          style={{ backgroundColor: 'currentColor' }}
        />
      )}
      <div className="CardBody">
        <h3>{Name}</h3>
        {Switches && (
          <p>
            <span className="CardLabel">{Switches} switches</span>
          </p>
        )}
        {Keycaps && (
          <p>
            <span className="CardLabel">{Keycaps} keycaps</span>
          </p>
        )}
      </div>
    </div>
  )
}

export default Card
