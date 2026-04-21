import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/login.css";

export default function UserIDLogin() {
  const [userID, setUserID] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showHelp, setShowHelp] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const payload = {
        username: userID,
        password: "test123",
      };

      // ✅ Login API
      const response = await fetch("/api/CBRSAPI/CBRSPensionerLogin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "Cache-Control": "no-cache",
        },
        body: JSON.stringify(payload),
      });

      const rawText = await response.text();
      let data = {};
      try {
        data = JSON.parse(rawText);
      } catch {
        data = { parseError: true, raw: rawText };
      }

      if (response.ok && data?.Logged) {
        // ✅ Store userData in localStorage for ProtectedRoute
        localStorage.setItem("userData", JSON.stringify(data));

        // ✅ Generate OTP immediately
        const otpPayload = {
          mobileNo: data.TelephoneNo,
          systemName: "Pension Portal",
          systemCode: "pension",
        };

        const otpRes = await fetch("/otpapi/api/otp/sendOtp", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(otpPayload),
        });

        const otpData = await otpRes.json();

        if (otpRes.ok && otpData !== -1) {
          // ✅ OTP sent → go to OTP page
          navigate("/otp", {
            state: { userID, userData: data, otpSent: true },
          });
        } else {
          setError("Failed to send OTP. Please try again.");
        }
      } else {
        setError(data.Errormsg || "Invalid UserID / PensionID");
      }
    } catch (err) {
      setError("Unable to connect to server. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bgcebBg h-screen w-screen flex items-center justify-center bg-white">
      <div className="relative">
        <form
          onSubmit={handleSubmit}
          className="w-[380px] bg-white border border-gray-200 shadow-xl rounded-3xl px-8 py-10 text-center"
        >
          {/* Logo */}
          <img
            src="ceb_logo_remove.png"
            alt="Logo"
            className="w-[90px] h-[90px] object-cover rounded-full border-4 border-gray-200 mx-auto mb-6"
          />

          {/* Heading */}
          <h2 className="text-2xl font-bold mb-8 text-[#6f1414]">
            Enter UserID / PensionID
          </h2>

          {/* Input */}
          <div className="relative mb-4">
            <input
              type="text"
              required
              value={userID}
              onChange={(e) => setUserID(e.target.value)}
              placeholder=" "
              className="peer w-full bg-gray-50 border border-gray-300 font-bold text-gray-900 rounded-xl px-4 pt-5 pb-2 focus:outline-none focus:ring-2 focus:ring-[#6f1414] focus:border-[#6f1414] placeholder-transparent"
            />
            <label className="absolute left-4 top-1 text-gray-500 text-sm transition-all peer-placeholder-shown:top-[-2px] peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-2 peer-focus:text-sm peer-focus:text-[#6f1414]">
              UserID / PensionID
            </label>
          </div>

          {/* Error */}
          {error && <p className="text-red-500 mb-4 text-sm">{error}</p>}

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-full bg-[#720f11] hover:bg-[#5f0c0d] text-white text-base font-semibold shadow-md transition-all disabled:opacity-50"
          >
            {loading ? "Submitting..." : "Submit"}
          </button>

          {/* Help Link */}
          <button
            type="button"
            onClick={() => setShowHelp(true)}
            className="mt-4 text-[#6f1414] hover:underline text-sm font-medium transition"
          >
            Need help with login?
          </button>

          {/* Help Popup Modal */}
          {showHelp && (
            <div className="mt-4 mb-4">
              <div className="bg-white rounded-xl shadow-lg border-2 border-[#6f1414]">
                {/* Header */}
                <div className="bg-[#6f1414] px-4 py-3 rounded-t-xl flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-4 h-4 text-white flex-shrink-0"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <circle cx="12" cy="12" r="10" />
                      <line x1="12" y1="8" x2="12" y2="12" />
                      <line x1="12" y1="16" x2="12.01" y2="16" />
                    </svg>
                    <span className="text-white text-sm font-semibold">
                      Login Instructions for Pensioners
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setShowHelp(false)}
                    className="text-white hover:text-gray-200 transition"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-5 h-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>

                {/* Body */}
                <div className="bg-[#fdf6f6] px-4 py-4 space-y-3 rounded-b-xl">
                  {[
                    "Use your existing CBRS login credentials — no additional registration is required.",
                    <>
                      Enter a capital{" "}
                      <strong className="text-[#6f1414]">"P"</strong> followed by
                      your pension number.
                    </>,
                    <>
                      Example:{" "}
                      <span className="inline-block bg-[#6f1414] text-white text-xs font-bold px-2 py-0.5 rounded">
                        P12345
                      </span>
                    </>,
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <span className="mt-0.5 flex-shrink-0 w-4 h-4 rounded-full bg-[#6f1414] text-white text-[10px] font-bold flex items-center justify-center">
                        {i + 1}
                      </span>
                      <p className="text-xs text-gray-700 leading-relaxed">
                        {item}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Footer */}
          <p className="mt-8 text-xs text-gray-500 bg-gray-100 px-3">
            © Ceylon Electricity Board - Version 1.0.3
          </p>
        </form>
      </div>
    </div>
  );
}
