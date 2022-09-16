import React from 'react';

const StyleSelector = ({style, styles, onClick}) => {
  return (
    <div className="style-title">
      Style: {style}
    <div className="styles-holder"> {styles.map((styl, index) => {
      if (styl.name === style) {
        return (
          <img key={index} className="style-bubble selected"
          src={styl.photos[0].thumbnail_url}
          width="80"
          height="80"
          onClick={() => {onClick(styl)}}/>)
      } else { return (
          <img key={index} className="style-bubble"
          src={styl.photos[0].thumbnail_url}
          width="80"
          height="80"
          onClick={() => {onClick(styl)}}/>)}})}</div>
    </div>
  )
}

export default StyleSelector;