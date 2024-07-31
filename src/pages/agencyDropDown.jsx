import { useState } from "react";
import { gasProviders } from "../services/gasProvider";

export default function AgencyDropDown() {
  const [dropdownvalue, setdropdownvalue] = useState();
  const [isdropdownOpen, setisdropdownOpen] = useState(false);
  const handleChange = (event) => {
    setValue(event.target.value);
  };

  return (
    <>
      <div>
        <button
          className="dropdown"
          type="button"
          onClick={setisdropdownOpen(true)}
        >
          <input
            type="text"
            className="dropdown-btn"
            placeholder="Agency Name"
            value={dropdownvalue}
            onChange={handleChange}
          ></input>
          <i class="bi bi-chevron-down"></i>
        </button>
      </div>
      {isdropdownOpen && (
        <div className="dropdown-content">
          {gasProviders.map((provider) => (
            <button
              className="dropdown-item"
              onClick={() => setdropdownvalue(provider.label)}
            >
              {provider.label}
            </button>
          ))}
        </div>
      )}
    </>
  );
}
