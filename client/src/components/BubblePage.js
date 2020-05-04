import React, { useState, useEffect } from "react";
import axiosWithAuth from "../utils/axiosWithAuth";


import Bubbles from "./Bubbles";
import ColorList from "./ColorList";

const BubblePage = () => {
  let initialState = [];
  axiosWithAuth()
      .get("http://localhost:5000/api/colors")
      .then(res => {
        console.log("Bubble data retrieved:", res)
        let initialState = res.data
      })
      .catch(err => console.log("Could not retrieve bubble datat:", err))

  const [colorList, setColorList] = useState(initialState);
  // fetch your colors data from the server when the component mounts
  // set that data to the colorList state property

  useEffect(() => {
    axiosWithAuth()
      .get("http://localhost:5000/api/colors")
      .then(res => {
        console.log("Bubble data updated:", res)
        setColorList(res.data)
      })
      .catch(err => console.log("Could not update bubble datat:", err))
    }, [setColorList])

  return (
    <>
      <ColorList colors={colorList} updateColors={setColorList} />
      <Bubbles colors={colorList} />
    </>
  );
};

export default BubblePage;
