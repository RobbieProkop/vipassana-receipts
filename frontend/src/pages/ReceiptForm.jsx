import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import PlacesAutocomplete from "react-places-autocomplete";
import { toast } from "react-toastify";
import { createReceipt } from "../features/receipts/receiptSlice";

const ReceiptForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // get the last known receipt in the receiptsArr
  const receipt = useSelector((state) => state.receipts.receiptsArr.slice(-1));

  // const [address, setAddress] = useState("");

  // used to increament the receipts number
  const [receiptNumber, setReceiptNumber] = useState(
    receipt.length ? receipt[0].receiptNumber + 1 : 198765432
  );

  const [receiptData, setReceiptData] = useState({
    place: "",
    firstName: "",
    lastName: "",
    email: "",
    address: "",
    postalCode: "",
    type: "",
    number: 0,
    words: "",
    signature: "",
  });

  const {
    place,
    firstName,
    lastName,
    email,
    address,
    postalCode,
    type,
    number,
    words,
    signature,
  } = receiptData;

  // useEffect(() => {});

  const onSubmit = (e) => {
    e.preventDefault();
    const canSave = [
      place,
      firstName,
      lastName,
      email,
      address,
      postalCode,
      type,
      number,
      words,
      signature,
    ].every((el) => el.length >= 1);
    if (canSave) {
      try {
        dispatch(
          createReceipt({
            receiptNumber,
            place,
            firstName,
            lastName,
            email,
            address,
            postalCode,
            type,
            number,
            words,
            signature,
          })
        ).unwrap();
        toast.success("Receipt Added Successfully");
        // setAddress("");
        setReceiptData({
          place: "",
          firstName: "",
          lastName: "",
          email: "",
          address: "",
          postalCode: "",
          type: "",
          number: 0,
          words: "",
          signature: "",
        });
        setReceiptNumber(receipt[0].receiptNumber + 1);
        navigate("/");
      } catch (error) {
        const message =
          error.response.data.message || error.message || error.toString();
        toast.error(message);
        console.log(message);
      }
    } else {
      console.log("place", place);
      console.log("firstName", firstName);
      console.log("lastName", lastName);
      console.log("email", email);
      console.log("postalCode", postalCode);
      console.log("type", type);
      console.log("number", number);
      console.log("words", words);
      console.log("signature", signature);
      console.log("address", address);
      console.log("Please fill in all fields!");
      toast.error("Please Fill In All Fields", {
        position: toast.POSITION.TOP_LEFT,
      });
    }
  };

  const onChange = (e) => {
    setReceiptData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  // //for google places address
  // const handleSelect = (value) => {
  //   setAddress(value);
  //   setReceiptData((prevState) => ({
  //     ...prevState,
  //     address: value,
  //   }));
  // };
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
          <div className="form-group">
            <input
              type="text"
              name="email"
              id="email"
              placeholder="Email"
              value={email}
              onChange={onChange}
            />
          </div>

          {/* Address */}
          <div className="address">
            <div className="form-group">
              <input
                type="text"
                name="address"
                id="address"
                placeholder="Address"
                value={address}
                onChange={onChange}
              />
            </div>
            {/* <div className="form-group">
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

                      {suggestions.map((suggestion, index) => {
                        const className = suggestion.active
                          ? "select-active"
                          : null;
                        return (
                          <div
                            key={index}
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
            </div> */}

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
              <select name="type" id="type" onChange={onChange}>
                <option value="">--Please Select Donation Type--</option>
                <option value="Visa">Visa</option>
                <option value="MasterCard">MasterCard</option>
                <option value="Amex">American Express</option>
                <option value="Cash">Cash</option>
                <option value="Cheque">Cheque</option>
              </select>
            </div>
            <div className="form-group">
              <input
                type="number"
                name="number"
                id="number"
                placeholder="Amount (Number)"
                value={number <= 0 ? "" : number}
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
        <button className="btn btn-cancel" onClick={() => navigate("/")}>
          Cancel
        </button>
      </form>
    </section>
  );
};
export default ReceiptForm;
