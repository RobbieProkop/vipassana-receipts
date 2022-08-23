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
  let key = 0;

  const [receiptData, setReceiptData] = useState({
    receiptNumber: "",
    place: "",
    firtName: "",
    lastName: "",
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

  const handleSelect = async (value, e) => {
    setAddress(value);
  };
  return (
    <section className="receipt-form">
      <form onSubmit={onSubmit}>
        <div className="receiptID">
          <div className="form-group">
            <p>ID: Hardcoded number</p>
          </div>
          <div className="form-group">
            <p>Alberta Vipassana Foundation</p>
          </div>
        </div>
        <div className="left">
          <div className="place">
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
          </div>

          {/* Address */}
          <div className="address">
            <div className="form-group">
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
                        placeholder: "Enter address",
                        id: "addressSearch",
                      })}
                    />
                    <div>
                      {loading && <p>Loading...</p>}

                      {suggestions.map((suggestion) => {
                        const className = suggestion.active
                          ? "select-active"
                          : null;
                        return (
                          <div
                            key={key++}
                            {...getSuggestionItemProps(suggestion, {
                              className,
                            })}
                          >
                            {suggestion.description}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </PlacesAutocomplete>
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
            </div>
          </div>
        </div>

        {/* Right Section */}
        <div className="right">
          {/* Donation Amount */}
          <div className="donation">
            <div className="form-group">
              <input
                type="text"
                name="type"
                id="type"
                placeholder="Donation Type (Visa, MC, Cash)"
                value={type}
                onChange={onChange}
              />
            </div>
            <div className="form-group">
              <input
                type="number"
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
          </div>
          {/* Signature */}
          <div className="sig">
            <div className="form-group">
              <input
                type="text"
                name="signature"
                id="signature"
                placeholder="Digital Signature of Trustee"
                value={signature}
                onChange={onChange}
              />
            </div>
          </div>
        </div>
        <button className="btn">Submit Receipt</button>
      </form>
    </section>
  );
};
export default ReceiptForm;
