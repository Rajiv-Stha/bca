import { Link, useNavigate } from "react-router-dom";
import styles from "../Auth.module.css";
import { SyntheticEvent, useState } from "react";
import { signUpApi } from "../../../utils/api";
import { useAlert } from "../../../hooks/useAlert";

const Signup = () => {
  const navigate = useNavigate();
  const { alert } = useAlert();
  const [signUpData, setSignUpData] = useState({
    username: "",
    email: "",
    password: "",
    country: "Nepal", // default to Nepal
  });
  const [errors, setErrors] = useState({
    username: "",
    password: "",
    email:"",
  });
  const validateEmail = (email: string) => {
    // Email regex to ensure it doesn't start with special characters and ends with @gmail.com
    const emailRegex = /^[A-Za-z0-9][A-Za-z0-9._%+-]*@gmail\.com$/;
    if (!emailRegex.test(email)) {
      return "Invalid email address. Email must not start with special characters and must end with '@gmail.com'.";
    }
    return "";
  };
  

  
  const validateUsername = (username: string) => {
    const usernameRegex = /^[A-Za-z][A-Za-z0-9_]{2,}$/; // Start with alphabet and at least 3 characters
    if (!usernameRegex.test(username)) {
      return "Username must start with an alphabet and be at least 3 characters long.";
    }
    return "";
  };

  const validatePassword = (password: string) => {
    const passwordRegex =
      /^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*[0-9])(?=.*[a-zA-Z]).{8,}$/;
    if (!passwordRegex.test(password)) {
      return "Password must be at least 8 characters long and include 1 capital letter, 1 special character, and 1 number.";
    }
    return "";
  };

  const handleSignUpChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = event.target;
    setSignUpData((prev) => {
      return { ...prev, [name]: value };
    });

    // Validate username and password in real-time
    if (name === "username") {
      setErrors((prev) => ({ ...prev, username: validateUsername(value) }));
    }
    if (name === "password") {
      setErrors((prev) => ({ ...prev, password: validatePassword(value) }));
    }
  };

  const handleSignUp = async (event: SyntheticEvent) => {
    event.preventDefault();
    const emailError = validateEmail(signUpData.email)
    console.log(emailError);
    const usernameError = validateUsername(signUpData.username);
    const passwordError = validatePassword(signUpData.password);

    if (usernameError || passwordError || emailError) {
      setErrors({
        email: emailError,
        username: usernameError,
        password: passwordError,
      });
      return; // Prevent form submission if there are validation errors
    }

    try {
      const { data, status } = await signUpApi(signUpData);
      console.log(data);
      if (status === 200) {
        alert("success", "Confirmation link is sent to your email");
        navigate("/account/confirmation_email_sent");
      } else {
        throw new Error(data.message);
      }
    } catch (error: any) {
      console.log(error.messages);
      alert("error", error?.response?.data.message ?? "Something went wrong, try again");
    }
  };

  return (
    <div className={styles.AuthWrapper}>
      <img onClick={() => navigate("/")} src="/images/logo2.png" className={styles.logo} />
      {/* <h1 onClick={()=>navigate("/")} className={styles.logo}>logo</h1> */}
      <div className={styles.login_main_box}>
        <div className={styles.login_welcome_text}></div>
        <div className={styles.sign_in_with_email_division}>
          <div className={styles.left_hr}></div>
          <p>Sign up with email</p>
          <div className={styles.right_hr}></div>
        </div>

        <form className={styles.form_wrapper} onSubmit={handleSignUp}>
          <div className={styles.auth_input_item}>
            <input
              className={styles.input_element}
              onChange={handleSignUpChange}
              type="text"
              placeholder="Username"
              name="username"
            />
            {errors.username && <p className={styles.error_text}>{errors.username}</p>}
          </div>

          <div className={styles.single_item}>
            <div className={styles.auth_input_item}>
              <input
                className={styles.input_element}
                type="email"
                onChange={handleSignUpChange}
                placeholder="Enter your email address"
                name="email"
              />
              {errors.email && <p className={styles.error_text}>{errors.email}</p>}
            </div>
          </div>

          <div className={styles.single_item}>
            <div className={styles.auth_input_item}>
              <select
                className={styles.input_element}
                name="country"
                onChange={handleSignUpChange}
                value={signUpData.country}
              >
                <option value="Nepal">Nepal</option>
                <option value="India">India</option>
                <option value="China">China</option>
              </select>
            </div>
          </div>

          <div className={styles.auth_input_item}>
            <input
              className={styles.input_element}
              onChange={handleSignUpChange}
              type="password"
              placeholder="Enter your password"
              name="password"
            />
            {errors.password && <p className={styles.error_text}>{errors.password}</p>}
          </div>

          <div className={styles.auth_input_item}>
            <input
              className={styles.input_element}
              onChange={handleSignUpChange}
              type="password"
              placeholder="Confirm password"
              name="confirm_password"
            />
          </div>

          <button className={styles.login_button} type="submit">
            Sign up
          </button>
          <Link to="/login">
            <p className={styles.no_account_text}>Already have an account</p>
          </Link>
        </form>
      </div>
    </div>
  );
};

export default Signup;
