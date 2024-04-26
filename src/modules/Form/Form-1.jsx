import { useRef, useState } from "react";
import { addDays } from "date-fns";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
// import "./datepicker.css";
import Button from "../../shared/components/Button/Button";

import { sendFormToGoogleSheet } from "../../shared/services/api";
import initialState from "./initialState";

import styles from "./form.module.scss";


const Form = () => {
  // const [state, setState] = useState({...initialState});
const [loading, setLoading] = useState(false);
  const formRef = useRef(null);
 
  // const handleChange = ({ target }) => {
  //   const { name, value } = target;

  //   setState((prevState) => {
  //       return { ...prevState, [name]: value };
  //   });
  //   console.log({[name]: value})
  // };


const handleSubmit = async (e) => {
  e.preventDefault();
  const formData = new FormData(formRef.current);
  try {
    setLoading(true);
    await sendFormToGoogleSheet(formData);

    // await sendFormToGoogleSheet(state);
    // if(response.ok){
    // window.location.reload();
    // alert("Thank you! your form is submitted successfully.");
    //   setState({ ...initialState });
    // }

    window.location.reload();
    console.log(formData)
    // onSubmit({ ...state });
    
    alert("Thank you! your form is submitted successfully.");
  }
  catch (error) {
    console.log('Error!', error.message);
    alert('Sorry, error!')
  } finally {
    setLoading(false);
  }
};

//   const reset = () => {
//     setState({ ...initialState });
//   };

  // const { lastName, name, email, phone, mounth, day } = state;

  return (
    <form 
    ref={formRef} 
    className={styles.form} onSubmit={handleSubmit}>
      <div>
        <label className={styles.label} htmlFor="lastName">
          Прізвище
        </label>
        <input
          className={styles.input}
          type="text"
          id="lastName"
          name="Прізвище"
          // value={lastName}
          // onChange={handleChange}
          placeholder="Введіть прізвище"
          autoComplete="off"
          // required
        />
      </div>
      <div>
        <label className={styles.label} htmlFor="name">
          Ім'я
        </label>
        <input
          className={styles.input}
          type="text"
          id="name"
          name="Ім'я"
          // value={name}
          // onChange={handleChange}
          placeholder="Введіть ім'я"
          autoComplete="off"
          // required
        />
      </div>
      <div>
        <label className={styles.label} htmlFor="email">
         Email
        </label>
        <input
          className={styles.input}
          type="email"
          id="email"
          name="Електронна пошта"
          // value={email}
          // onChange={handleChange}
          placeholder="Введіть email"
          autoComplete="off"
          // required
        />
      </div>
      <Button type="submit" disabled={loading ? true : false}text={loading ? "Обробляється..." : "Відправити"} />
    </form>
  );
};

export default Form;
