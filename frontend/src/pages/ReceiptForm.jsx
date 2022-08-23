import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import PlacesAutocomplete, {
  geocodeByAddress,
  geocodeByPlaceId,
} from "react-places-autocomplete";

const ReceiptForm = () => {
  const dispatch = useDispatch();

  const [address, setAddress] = useState("");

  const [receiptData, setReceiptData] = useState({
    receiptNumber: "",
    place: "",
    firtName: "",
    lastName: "",
    houseNumber: "",
    street: "",
    city: "",
    province: "",
    country: "",
    postalCode: "",
    type: "",
    number: "",
    words: "",
    signature: "",
  });

  const {
    receiptNumber,
    place,
    firstName,
    lastName,
    houseNumber,
    street,
    city,
    province,
    country,
    postalCode,
    type,
    number,
    words,
    signature,
  } = receiptData;

  // const {} = useSelector(() => {});

  // useEffect(() => {});

  const onSubmit = (e) => {
    e.preventDefault();
  };

  const onChange = (e) => {
    setReceiptData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSelect = async (value) => {};
  return (
    <section className="receipt-form">
      <form onSubmit={onSubmit}>
        <div className="left">
          {/* <div className="place">
            <div className="form-group">
              <input
                type="text"
                name="place"
                id="place"
                placeholder="Current Location (Youngstown)"
                value={place}
                onChange={onChange}
              />
            </div>
          </div>
          <div className="names">
            <div className="form-group">
              <input
                type="text"
                name="firstName"
                id="firstName"
                placeholder="First Name"
                value={firstName}
                onChange={onChange}
              />
            </div>
            <div className="form-group">
              <input
                type="text"
                name="lastName"
                id="lastName"
                placeholder="Last Name"
                value={lastName}
                onChange={onChange}
              />
            </div>
          </div> */}

          {/* Address */}
          <div className="address">
            <div className="form-group">
              {/* <input
                type="text"
                name="address"
                id="addressSearch"
                placeholder="Search address..."
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              /> */}
              <PlacesAutocomplete
                value={address}
                onChange={setAddress}
                onSelect={handleSelect}
              >
                {({
                  getInputProps,
                  suggestions,
                  getSuggestionItemProps,
                  loading,
                }) => (
                  <div>
                    <input
                      {...getInputProps({
                        placeholder: "Search address...",
                        id: "addressSearch",
                      })}
                    />
                    <div>
                      {loading ? <p>Loading...</p> : null}

                      {suggestions.map((suggestion) => {
                        return <div>{suggestion.description}</div>;
                      })}
                    </div>
                  </div>
                )}
              </PlacesAutocomplete>
            </div>
            {/* <div className="form-group">
              <input
                type="text"
                name="houseNumber"
                id="houseNumber"
                placeholder="House Number"
                value={houseNumber}
                onChange={onChange}
              />
            </div>
            <div className="form-group">
              <input
                type="text"
                name="street"
                id="stree"
                placeholder="Street"
                value={street}
                onChange={onChange}
              />
            </div>
            <div className="form-group">
              <input
                type="text"
                name="city"
                id="city"
                placeholder="City"
                value={city}
                onChange={onChange}
              />
            </div>
            <div className="form-group">
              <input
                type="text"
                name="province"
                id="province"
                placeholder="Province"
                value={province}
                onChange={onChange}
              />
            </div>
            <div className="form-group">
              <input
                type="text"
                name="country"
                id="country"
                placeholder="Country"
                value={country}
                onChange={onChange}
              />
            </div>
            <div className="form-group">
              <input
                type="text"
                name="postalCode"
                id="postalCode"
                placeholder="Postal Code"
                value={postalCode}
                onChange={onChange}
              />
            </div> */}
          </div>
        </div>

        {/* Right Section */}
        <div className="right">
          {/* Donation Amount */}
          {/* <div className="donation">
            <div className="form-group">
              <input
                type="text"
                name="type"
                id="type"
                placeholder="Donation Type"
                value={type}
                onChange={onChange}
              />
            </div>
            <div className="form-group">
              <input
                type="text"
                name="number"
                id="number"
                placeholder="Amount (Number)"
                value={number}
                onChange={onChange}
              />
            </div>
            <div className="form-group">
              <input
                type="text"
                name="words"
                id="words"
                placeholder="Amount (Words)"
                value={words}
                onChange={onChange}
              />
            </div>
          </div> */}
          {/* Signature */}
          {/* <div className="sig">
            <p>Please return to trustee</p>
            <div className="form-group">
              <input
                type="text"
                name="signature"
                id="signature"
                placeholder="Name of Trustee"
                value={signature}
                onChange={onChange}
              />
            </div>
          </div> */}
        </div>
      </form>
    </section>
  );
};
export default ReceiptForm;