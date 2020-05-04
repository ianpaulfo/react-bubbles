import React, { useState } from "react";
import axiosWithAuth from "../utils/axiosWithAuth";


const initialColor = {
  color: "",
  code: { hex: "" }
};

const ColorList = ({ colors, updateColors }) => {
  console.log(colors);
  const [editing, setEditing] = useState(false);
  const [colorToEdit, setColorToEdit] = useState(initialColor);
  const [colorToAdd, setcolorToAdd] = useState(initialColor);


  const editColor = color => {
    setEditing(true);
    setColorToEdit(color);
  };

  const saveEdit = e => {
    e.preventDefault();

    console.log("Saving edits to color", colorToEdit);

    axiosWithAuth()
      .put("colors/" + colorToEdit.id, colorToEdit)
      .then(res => {
        console.log("Color edited:", res);

        let updatedColors = [];

        for (let i = 0; i < colors.length; i++) {
          if (colors[i].id === colorToEdit.id) {
            updatedColors = [...updatedColors, colorToEdit];
          } else {
            updatedColors = [...updatedColors, colors[i]];
          }
        }

        updateColors(updatedColors);
      })
      .catch(error => {
        console.log("Couldn't edit color:", error);
      });
  };

  const deleteColor = color => {
    console.log("Deleting color", color);

    axiosWithAuth()
      .delete("colors/" + color.id)
      .then(res => {
        console.log("Color deleted:", res);

        let remainingColors = colors.filter(
          existingColor => existingColor.id !== color.id
        );
        updateColors(remainingColors);
      })
      .catch(error => {
        console.log("Couldn't delete color:", error);
      });
  };

  const addColor = event => {
    event.preventDefault();

    console.log("Adding color", colorToAdd);

    axiosWithAuth()
      .post("http://localhost:5000/api/colors", colorToAdd)
      .then(res => {
        console.log("Color added:", res);

        updateColors([...colors, colorToAdd]);
      })
      .catch(error => {
        console.log("Couldn't add color:", error);
      });  };

  return (
    <div className="colors-wrap">
      <p>colors</p>
      <div className="addColorDiv">
        <form name="addColor">
          <legend>add color</legend>
          <label>
            color name:
            <input 
              onChange={e =>
                setcolorToAdd({ ...colorToAdd, color: e.target.value })
              }
              value={colorToAdd.color}
            />
          </label>
          <label>
            hex code:
            <input
              onChange={e =>
                setcolorToAdd({
                  ...colorToAdd,
                  code: { hex: e.target.value }
                })
              }
              value={colorToAdd.code.hex}
            />
          </label>
          <div className="button-row">
            <button onClick={addColor}>add</button>
          </div>
        </form>
      </div>
      <ul className="color-list">
        {colors.map(color => (
          <li className="color-box-holder" key={color.color} onClick={() => editColor(color)}>
            <span>
              <span className="delete" onClick={e => {
                    e.stopPropagation();
                    deleteColor(color)
                  }
                }>
                  x
              </span>{" "}
              {color.color}
            </span>
            <div
              className="color-box"
              style={{ backgroundColor: color.code.hex }}
            />
          </li>
        ))}
      </ul>
      {editing && (
        <form className="edit-box" onSubmit={saveEdit}>
          <legend>edit color</legend>
          <label>
            color name:
            <input
              onChange={e =>
                setColorToEdit({ ...colorToEdit, color: e.target.value })
              }
              value={colorToEdit.color}
            />
          </label>
          <label>
            hex code:
            <input
              onChange={e =>
                setColorToEdit({
                  ...colorToEdit,
                  code: { hex: e.target.value }
                })
              }
              value={colorToEdit.code.hex}
            />
          </label>
          <div className="button-row">
            <button type="submit">save</button>
            <button onClick={() => setEditing(false)}>cancel</button>
          </div>
        </form>
      )}
      <div className="spacer" />
    </div>
  );
};

export default ColorList;
