import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { editReceipt } from "../features/receipts/receiptSlice";
import Spinner from "../components/Spinner";
import { AppDispatch, RootState } from "../app/store";

const ReceiptForm = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { id } = useParams();

  const { user } = useSelector((state: RootState) => state.auth);
  const { receiptsArr, isLoading, isError, message } = useSelector(
    (state: RootState) => state.receipts
  );

  useEffect(() => {
    if (isError) {
      console.log(message);
    }

    if (!user) {
      navigate("/login");
    }

    if (!receiptsArr) {
      navigate("/");
    }
  }, [user, navigate, isError, message, dispatch]);
  if (!id) return <h2>Receipt not found</h2>;

  let receipt = receiptsArr.find((receipt) => receipt._id === id);

  const [receiptNumber, setReceiptNumber] = useState(
    receipt && receipt.receiptNumber ? receipt.receiptNumber : 0
  );

  const [receiptData, setReceiptData] = useState({
    // receiptNumber: receipt && receipt.receiptNumber ? receipt.receiptNumber : 0,
    place: receipt && receipt.place ? receipt.place : "",
    full_name:
      receipt && receipt.firstName && receipt.lastName
        ? `${receipt.firstName} ${receipt.lastName}`
        : receipt && receipt.full_name
        ? receipt.full_name
        : "",
    email: receipt && receipt.email ? receipt.email : "",
    address: receipt && receipt.address ? receipt.address : "",
    city: receipt && receipt.city ? receipt.city : "",
    province: receipt && receipt.province ? receipt.province : "",
    country: receipt && receipt.country ? receipt.country : "",
    postalCode: receipt && receipt.postalCode ? receipt.postalCode : "",
    type: receipt && receipt.type ? receipt.type : "",
    number: receipt && receipt.number ? receipt.number : 0,
    words: receipt && receipt.words ? receipt.words : "",
    signature: receipt && receipt.signature ? receipt.signature : "",
  });

  const {
    place,
    full_name,
    email,
    address,
    city,
    province,
    country,
    postalCode,
    type,
    number,
    words,
    signature,
  } = receiptData;

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const canSave = [
      place,
      full_name,
      email,
      address,
      city,
      province,
      country,
      postalCode,
      type,
      number.toString(),
      words,
      signature,
    ].every((el) => el.length >= 1);
    if (canSave) {
      try {
        await dispatch(
          editReceipt({
            _id: id,
            receiptNumber,
            place,
            full_name,
            email,
            address,
            city,
            province,
            country,
            postalCode,
            type,
            number,
            words,
            signature,
          })
        ).unwrap();
        toast.success("Receipt Edited Successfully");
        // setAddress("");
        setReceiptData({
          place: "Youngstown",
          full_name: "",
          email: "",
          address: "",
          city: "Calgary",
          province: "AB",
          country: "Canada",
          postalCode: "",
          type: "",
          number: 0,
          words: "",
          signature: "",
        });
        navigate("/");
      } catch (error: any) {
        const message =
          error.response.data.message || error.message || error.toString();
        toast.error(message);
        console.log(message);
      }
    } else {
      console.log(canSave);
      console.log("place", place.length);
      console.log("full_name", full_name.length);
      console.log("email", email.length);
      console.log("address", address.length);
      console.log("city", city.length);
      console.log("province", province.length);
      console.log("postalCode", postalCode.length);
      console.log("type", type.length);
      console.log("number", number);
      console.log("words", words.length);
      console.log("signature", signature.length);
      console.log("address", address.length);
      console.log("Please fill in all fields!");
      toast.error("Please Fill In All Fields", {
        position: toast.POSITION.TOP_LEFT,
      });
    }
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setReceiptData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setReceiptData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  if (!receipt) {
    return (
      <section>
        <h2>Receipt not found</h2>
      </section>
    );
  }

  if (isLoading) {
    return <Spinner />;
  }
  return (
    <section className="receipt-form">
      <form onSubmit={onSubmit}>
        <div className="receiptID">
          <div className="form-group">
            <p>ID: {receipt.receiptNumber || receipt.receipt_number}</p>
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
                name="full_name"
                id="full_name"
                placeholder="First Name"
                value={full_name}
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
            </div>
          </div>
        </div>

        {/* Right Section */}
        <div className="right">
          {/* Donation Amount */}
          <div className="donation">
            <div className="form-group">
              <select
                name="type"
                id="type"
                defaultValue={type}
                onChange={onSelectChange}
              >
                <option value="">--Please Select A Donation Type--</option>
                <option value="Visa">Visa</option>
                <option value="MasterCard">MasterCard</option>
                <option value="Amex">Amex</option>
                <option value="Debit">Debit</option>
                <option value="E-Transfer">E-Transfer</option>
                <option value="Cash">Cash</option>
                <option value="Cheque">Cheque</option>
                <option value="Void">Void</option>
                <option value="In-Kind">In-Kind</option>
              </select>
            </div>
            <div className="form-group">
              <input
                type="number"
                name="number"
                id="number"
                placeholder="Amount (Number)"
                value={number < 0 ? "" : number}
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