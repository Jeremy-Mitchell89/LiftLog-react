import React from "react";
import Downshift from "downshift";

function BasicAutocomplete({ items, onChange }) {
  return (
    <Downshift onChange={onChange}>
      {({
        getInputProps,
        getItemProps,
        isOpen,
        inputValue,
        selectedItem,
        highlightedIndex
      }) => (
        <div>
          <input {...getInputProps({ width: "100%" })} />
          {isOpen ? (
            <div
              style={{
                backgroundColor: "#e6ecf0",
                border: "1px solid #ccc",
                position: "absolute",
                zIndex: 9999
              }}
            >
              {items
                .filter(
                  i =>
                    !inputValue ||
                    i.toLowerCase().includes(inputValue.toLowerCase())
                )
                .map((item, index) => (
                  <div
                    {...getItemProps({ item })}
                    key={item}
                    style={{
                      backgroundColor:
                        highlightedIndex === index ? "gray" : "white",
                      fontWeight: selectedItem === item ? "bold" : "normal",
                      padding: "10px"
                    }}
                  >
                    {item}
                  </div>
                ))}
            </div>
          ) : null}
        </div>
      )}
    </Downshift>
  );
}

export default BasicAutocomplete;
