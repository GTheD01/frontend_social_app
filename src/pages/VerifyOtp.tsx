import { useEffect, useRef, useState } from "react";
import { useVerifyMfaMutation } from "../redux/features/authApiSlice";
import { setAuth } from "../redux/features/authSlice";
import { toast } from "react-toastify";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAppDispatch } from "../redux/hooks";

export default function VerifyOtp() {
  const numberOfDigits = 6;
  const [otp, setOtp] = useState(new Array(numberOfDigits).fill(""));
  const otpBoxReference = useRef<(HTMLInputElement | null)[]>([]);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [searchParams] = useSearchParams();
  const email = searchParams.get("email");

  const [verifyMfa] = useVerifyMfaMutation();

  function handleChange(value: string, index: number) {
    let newArr = [...otp];
    newArr[index] = value;
    setOtp(newArr);

    if (value && index < numberOfDigits - 1) {
      otpBoxReference.current[index + 1]?.focus();
    }
  }

  function handleBackspaceAndEnter(
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) {
    if (e.key === "Backspace" && !e.currentTarget.value && index > 0) {
      otpBoxReference.current[index - 1]?.focus();
    }
    if (
      e.key === "Enter" &&
      e.currentTarget.value &&
      index < numberOfDigits - 1
    ) {
      otpBoxReference.current[index + 1]?.focus();
    }
  }

  useEffect(() => {
    if (otp.join("").length === 6) {
      // send request
      try {
        verifyMfa({ otp: otp.join(""), email: email })
          .unwrap()
          .then((response) => {
            dispatch(setAuth());
            toast.success("Logged in");
            navigate("/home");
          })
          .catch((error) => {
            toast.error(`${error.data.message}`);
            console.log(error);
          });
      } catch (error) {
        console.log(error);
      }
    }
  }, [otp, dispatch, email, navigate, verifyMfa]);

  return (
    <article className="text-center">
      <p className="text-2xl font-medium text-black mt-12">
        OTP Input With Validation
      </p>

      <p className="text-base text-black mt-6 mb-4">One Time Password (OTP)</p>

      <div className="flex items-center gap-4 justify-center">
        {otp.map((digit, index) => (
          <input
            key={index}
            value={digit}
            maxLength={1}
            onChange={(e) => handleChange(e.target.value, index)}
            onKeyUp={(e) => handleBackspaceAndEnter(e, index)}
            ref={(reference) => (otpBoxReference.current[index] = reference)}
            className={`border w-20 text-xl h-auto text-black p-3 rounded-md text-center block focus:border-2 focus:outline-none appearance-none`}
          />
        ))}
      </div>
    </article>
  );
}
