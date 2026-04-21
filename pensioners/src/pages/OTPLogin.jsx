import React, { useState, useRef, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
// import "../styles/login.css";

export default function OtpPage() {
  const location = useLocation();
  const navigate = useNavigate();

  const userID = location.state?.userID || "";
  const userData = location.state?.userData || {};
  const otpSent = location.state?.otpSent || false;

  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const inputsRef = useRef([]);
  const [counter, setCounter] = useState(30);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState(
    otpSent ? "OTP sent successfully!" : ""
  );

  const mobileNo = userData?.TelephoneNo || "0770000000";
  const maskedMobile =
    mobileNo.length >= 10
      ? `${mobileNo.slice(0, 3)}****${mobileNo.slice(-3)}`
      : mobileNo;

  const handleChange = (value, index) => {
    if (/^[0-9]?$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      if (value && index < otp.length - 1) {
        inputsRef.current[index + 1].focus();
      }
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputsRef.current[index - 1].focus();
    }
  };

  // Resend OTP
  const sendOtp = async () => {
    try {
      setLoading(true);
      setError("");
      setSuccessMsg("");

      const payload = {
        mobileNo,
        systemName: "Pension Portal",
        systemCode: "pension",
      };

      const res = await fetch("/otpapi/api/otp/sendOtp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (res.ok && data !== -1) {
        setSuccessMsg("OTP sent successfully!");
        setCounter(30);
      } else {
        setError("Failed to send OTP. Please try again.");
      }
    } catch (err) {
      setError("Server error. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  // Validate OTP
  const validateOtp = async (enteredOtp) => {
    try {
      setLoading(true);
      setError("");
      setSuccessMsg("");

      const payload = {
        mobileNo,
        otp: parseInt(enteredOtp, 10),
      };

      const res = await fetch("/otpapi/api/otp/validateOtp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (res.ok && data === true) {
        localStorage.setItem("userData", JSON.stringify(userData));
        navigate("/pension-home");
      } else {
        setError("Invalid OTP. Please try again.");
      }
    } catch (err) {
      setError("Server error. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const enteredOTP = otp.join("");
    if (enteredOTP.length === 6) {
      validateOtp(enteredOTP);
    } else {
      setError("Please enter a valid 6-digit OTP.");
    }
  };

  useEffect(() => {
    if (counter > 0) {
      const timer = setTimeout(() => setCounter(counter - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [counter]);

  return (
    <div className="bgcebBg h-screen w-screen flex items-center justify-center bg-white">
      <form
        onSubmit={handleSubmit}
        className="w-[380px] bg-white border border-gray-200 shadow-xl rounded-3xl px-8 py-10 text-center"
      >
        <img
          src="ceb_logo_remove.png"
          alt="Logo"
          className="w-[90px] h-[90px] object-cover rounded-full border-4 border-gray-200 mx-auto mb-6"
        />

        <h2 className="text-2xl font-bold mb-2 text-[#6f1414]">
          Pensioners OTP Login
        </h2>

        <p className="mb-2 text-gray-700 text-sm">
          UserID/PensionID: <span className="font-medium">{userID}</span>
        </p>
        <p className="mb-6 text-gray-500 text-xs">
          OTP sent to mobile:{" "}
          <span className="font-medium">{maskedMobile}</span>
        </p>

        <div className="mb-6">
          <p className="mb-3 text-gray-600 text-sm">Enter the 6-digit OTP</p>
          <div className="flex justify-between gap-2">
            {otp.map((digit, index) => (
              <input
                key={index}
                ref={(el) => (inputsRef.current[index] = el)}
                type="text"
                maxLength="1"
                value={digit}
                onChange={(e) => handleChange(e.target.value, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                className="w-12 h-14 text-center text-xl text-gray-900 bg-gray-50 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#6f1414] shadow-sm transition-all"
              />
            ))}
          </div>
        </div>

        {error && <p className="text-red-500 mb-3 text-sm">{error}</p>}
        {successMsg && (
          <p className="text-green-600 mb-3 text-sm">{successMsg}</p>
        )}

        <div className="mb-6 text-sm text-gray-500">
          {counter > 0 ? (
            <p>Resend OTP in {counter}s</p>
          ) : (
            <button
              type="button"
              onClick={sendOtp}
              className="text-[#6f1414] hover:underline font-medium transition"
            >
              Resend OTP
            </button>
          )}
        </div>

        <div className="space-y-3">
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-full bg-[#720f11] hover:bg-[#5f0c0d] text-white text-base font-semibold shadow-md transition-all disabled:opacity-50"
          >
            {loading ? "Processing..." : "Verify OTP"}
          </button>

          <button
            type="button"
            onClick={() => navigate("/pentionId")}
            className="w-full py-3 rounded-full bg-gray-100 border border-gray-300 text-gray-700 text-base font-medium hover:bg-gray-200 transition-all"
          >
            Cancel
          </button>
        </div>

        <p className="mt-8 text-xs text-gray-500 bg-gray-100 px-3">
          © Ceylon Electricity Board - Version 2.4.7
        </p>
      </form>
    </div>
  );
}
