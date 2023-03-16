import React from "react";
import { NavLink } from "react-router-dom";

export default function PinCard(props) {
  return (
    <div
      style={{
        ...styles.singlePin,
        ...styles[props.size],
      }}
    >
      <NavLink to={`/pins/${props.pin.id}`}>
        <img style={styles.img} src={props.pin.imageUrl}></img>
      </NavLink>
    </div>
  );
}

const styles = {
  singlePin: {
    margin: "15px 10px",
    padding: 0,
    borderRadius: "16px",
    backgroundColor: "gray",
  },
  small: {
    gridRowEnd: "span 26",
  },
  medium: {
    gridRowEnd: "span 33",
  },
  large: {
    gridRowEnd: "span 45",
  },
  img: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
};
