import { useEffect } from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import PlacesAutocomplete from "react-places-autocomplete";
import { createReceipt } from "../features/receipts/receiptSlice";

const ReceiptForm = () => {
  const dispatch = useDispatch();

  const [googleAdd, setGoogleAdd] = useState("");

  //temporary key
  let tempkey = 0;

  const [receiptData, setReceiptData] = useState({
    receiptNumber: 123456789,
    place: "",
    firstName: "",
    lastName: "",
    address: googleAdd,
    // houseNumber: "",
    // street: "",
    // city: "",
    // province: "",
    // country: "",
    postalCode: "",
    type: "",
    number: "",
    words: "",
    signature: "",
  });
  const initialReceipt = { ...receiptData };
  console.log("receiptData", receiptData);

  const {
    receiptNumber,
    place,
    firstName,
    lastName,
    address,
    // houseNumber,
    // street,
    // city,
    // province,
    // country,
    postalCode,
    type,
    number,
    words,
    signature,
  } = receiptData;

  console.log("address,", address);

  // useEffect(() => {});

  const onSubmit = (e) => {
    e.preventDefault();
    console.log("receiptData Form", receiptData);
    dispatch(
      createReceipt({
        receiptNumber,
        place,
        firstName,
        lastName,
        address,
        postalCode,
        type,
        number,
        words,
        signature,
      })
    );
    // setGoogleAdd("");
    // setReceiptData(initialReceipt);
  };

  const onChange = (e) => {
    setReceiptData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  //for google places address
  const handleSelect = (value) => {
    setGoogleAdd(value);
    setReceiptData((prevState) => ({
      ...prevState,
      address: value,
    }));
  };
  return (
    <section className="receipt-form">
      <form onSubmit={onSubmit}>
        <div className="receiptID">
          <div className="form-group">
            <p>ID: {receiptNumber}</p>
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
                value={googleAdd}
                onChange={setGoogleAdd}
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
                            //change this key to receipt num
                            key={tempkey++}
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
                    */}

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
        <button className="btn" type="submit">
          Submit Receipt
        </button>
      </form>
    </section>
  );
};
export default ReceiptForm;
