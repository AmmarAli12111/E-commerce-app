import React from "react";

function FeaturesFilter(props) {
  let arrFilter = [];

  for (let i = 0; i < props.arrFilters.length; i++) {
    arrFilter.push(
      <FilterItem
        key={props.arrFilters[i].id}
        name={props.arrFilters[i].name}
        setGenreFilter={props.setGenreFilter}
        setPriceRangeFilter={props.setPriceRangeFilter}
        setPlatformFilter={props.setPlatformFilter}
        setFeatureFilter={props.setFeatureFilter}
        value={props.arrFilters[i].value}
      />
    );
  }
  return (
    <div className={props.className}>
      <h3
        className="name position-relative text-white d-flex justify-content-between align-items-center text-uppercase fw-bold fs-7 mb-2 fs-6"
        onClick={props.clicked}
      >
        {props.title}
      </h3>
      <div className="filter-collapse" style={{ height: "0px" }}>
        <div className="filter-body">{arrFilter}</div>
      </div>
    </div>
  );
}

function FilterItem(props) {
  const selectFilter = (e) => {
    e.preventDefault();
    e.stopPropagation();

    const closestCheckbox = e.target.closest(".input-checkbox");
    if (closestCheckbox) {
      const filterBody = closestCheckbox.parentNode;
      const allCheckbox = filterBody.querySelectorAll(".input-checkbox");

      for (let i = 0; i < allCheckbox.length; i++) {
        if (allCheckbox[i] !== closestCheckbox) {
          allCheckbox[i].classList.remove("selected");
        }
      }
      closestCheckbox.classList.toggle("selected");
    }
    const typeFilter = closestCheckbox.closest(".box-filter");
    if (typeFilter) {
      if (typeFilter.classList.contains("genre-filter")) {
        if (closestCheckbox.classList.contains("selected")) {
          console.log("yes");
          const valueInput = closestCheckbox.querySelector("input").value;
          props.setGenreFilter(valueInput);
        } else {
          props.setGenreFilter("");
        }
      } else if (typeFilter.classList.contains("platform-filter")) {
        if (closestCheckbox.classList.contains("selected")) {
          const valueInput = closestCheckbox.querySelector("input").value;
          props.setPlatformFilter(valueInput);
        } else {
          props.setPlatformFilter("");
        }
      } else if (typeFilter.classList.contains("features-filter")) {
        if (closestCheckbox.classList.contains("selected")) {
          const valueInput = closestCheckbox.querySelector("input").value;
          props.setFeatureFilter(valueInput);
        } else {
          props.setFeatureFilter("");
        }
      } else if (typeFilter.classList.contains("price-filter")) {
        if (closestCheckbox.classList.contains("selected")) {
          const valueInput = closestCheckbox
            .querySelector("input")
            .value.trim();
          console.log(valueInput);
          if (valueInput.match(/under/gi)) {
            const price = parseFloat(valueInput.match(/\d+/gi));
            props.setPriceRangeFilter({ min: 0, max: price - 0.1 });
          } else if (valueInput.match(/over/gi)) {
            const price = parseFloat(valueInput.match(/\d+/gi));
            props.setPriceRangeFilter({ min: price + 0.1, max: Infinity });
          } else {
            const arrPrice = valueInput.split("-");
            const minPrice = parseFloat(arrPrice[0]);
            const maxPrice = parseFloat(arrPrice[1]);
            props.setPriceRangeFilter({ min: minPrice, max: maxPrice });
          }
        } else {
          props.setPriceRangeFilter({ min: null, max: null });
        }
      }
    }
  };

  return (
    <div className="input-checkbox" onClick={selectFilter}>
      <input type="hidden" className="" defaultValue={props.value} />
      <a
        href="#"
        aria-label="select product that take four stars in review"
        className="d-flex align-items-center fw-normal fs-6"
      >
        <span className="wrap-icon me-2">
          <span className="icon d-flex align-items-center rounded-5 justify-content-center"></span>
        </span>
        <span className="title-filter">{props.name}</span>
      </a>
    </div>
  );
}

export default FeaturesFilter;
