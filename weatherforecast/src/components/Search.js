import React from "react";

import PlacesAutocomplete from "react-places-autocomplete";

const Search = (props) => {
  const handleSelect = address => {
    const cityFromFullAddress = address.split(',')[0];
    if(cityFromFullAddress.toLowerCase() === props.city.toLowerCase())
    props.onSearchCity(cityFromFullAddress)
  };
  
  return (
    <div>
      <div>{props.error ? error() : ""}</div>
      <PlacesAutocomplete
        value={props.city}
        onChange={props.handleCityChange}
        onSelect={handleSelect}
      >
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
          <div>
            <div className="row pb-2 justify-content-center">
              <input
                {...getInputProps({
                  placeholder: "Search Places ...",
                  className: "location-search-input form-control col-md-6",
                })}
              />
            </div>
            <div className="autocomplete-dropdown-container">
              {loading && (
                <div className="row justify-content-center">Loading...</div>
              )}
              {suggestions.map((suggestion) => {
                const className = suggestion.active
                  ? "suggestion-item--active"
                  : "suggestion-item";
                // inline style for demonstration purpose
                const style = suggestion.active
                  ? { cursor: "pointer" }
                  : { color: "black", cursor: "pointer" };
                return (
                  <div
                    {...getSuggestionItemProps(suggestion, {
                      className,
                      style,
                    })}
                  >
                    <span>{props.list ? null : suggestion.description} </span>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </PlacesAutocomplete>
    </div>
  );
};

const error = (props) => {
  return (
    <div className="alert alert-danger mx-5" role="alert">
      Please Enter Correct City
    </div>
  );
};

export default Search;
