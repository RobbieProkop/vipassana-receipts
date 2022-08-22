import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const ReceiptForm = () => {
  const dispatch = useDispatch();

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
  return (
    <section className="form">
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="place">Current Location: (Youngstown)</label>
          <input
            type="text"
            name="place"
            id="place"
            value={place}
            onChange={onChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="firstName">First Name</label>
          <input
            type="text"
            name="firstName"
            id="firstName"
            value={firstName}
            onChange={onChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="lastName">Last Name</label>
          <input
            type="text"
            name="lastName"
            id="lastName"
            value={lastName}
            onChange={onChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="houseNumber">House Number</label>
          <input
            type="text"
            name="houseNumber"
            id="houseNumber"
            value={houseNumber}
            onChange={onChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="street">Street</label>
          <input
            type="text"
            name=""
            id="text"
            value={place}
            onChange={onChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="text">Current Location: (Youngstown)</label>
          <input
            type="text"
            name="text"
            id="text"
            value={place}
            onChange={onChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="text">Current Location: (Youngstown)</label>
          <input
            type="text"
            name="text"
            id="text"
            value={place}
            onChange={onChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="text">Current Location: (Youngstown)</label>
          <input
            type="text"
            name="text"
            id="text"
            value={place}
            onChange={onChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="text">Current Location: (Youngstown)</label>
          <input
            type="text"
            name="text"
            id="text"
            value={place}
            onChange={onChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="text">Current Location: (Youngstown)</label>
          <input
            type="text"
            name="text"
            id="text"
            value={place}
            onChange={onChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="text">Current Location: (Youngstown)</label>
          <input
            type="text"
            name="text"
            id="text"
            value={place}
            onChange={onChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="text">Current Location: (Youngstown)</label>
          <input
            type="text"
            name="text"
            id="text"
            value={place}
            onChange={onChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="text">Current Location: (Youngstown)</label>
          <input
            type="text"
            name="text"
            id="text"
            value={place}
            onChange={onChange}
          />
        </div>
      </form>
    </section>
  );
};
export default ReceiptForm;
