import { useRef, useState } from "react";
import { addDays } from "date-fns";
import { useFormik, Formik, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
// import "./datepicker.css";
import Button from "../../shared/components/Button/Button";

import {
  getFormToGoogleSheet,
  sendFormToGoogleSheet,
} from "../../shared/services/api";

import initialState from "./initialState";
import hours from "../../data/hours.json";

import styles from "./form.module.scss";

const Form = () => {
  const [isLoading, setIsLoading] = useState(false);

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: {
        lastName: initialState.lastName,
        name: initialState.name,
        email: initialState.email,
        phone: initialState.phone,
        date: initialState.date,
        hour: initialState.hour,
      },
      validationSchema: Yup.object().shape({}),
      onSubmit: async (
        { lastName, name, email, phone, date, hour },
        { resetForm }
      ) => {
        try {
          setIsLoading(true);
          console.log(values);

          const formData = new FormData();
          formData.append("Прізвище", lastName);
          formData.append("Ім'я", name);
          formData.append("Електронна пошта", email);
          formData.append("Телефон", phone);
          formData.append("Дата", date);
          formData.append("Час", hour);

          // const gettedDate = formData.get("Дата");
          // const gettedHour = formData.get("Час");
          const [, , , , gettedDateFormData, gettedHourFormData] =
            formData.values();

          console.log("formData date ", gettedDateFormData);
          console.log("formData hour ", gettedHourFormData);

          const data1 = await getFormToGoogleSheet();

          const isDublicate = async (dayDublicate, timeDublicate) => {
            console.log("DATA IN FOR====", data1);
            const dublicate = data1.find((item) => {
              let formattedDateFromGoogle = "";
              let formattedHourFromGoogle = "";
              const [, , , , , date, hour] = item;
              const dateFromISOS = new Date(date);
              const day = dateFromISOS.getDate().toString().padStart(2, "0"); 
              const month = (dateFromISOS.getMonth() + 1)
                .toString()
                .padStart(2, "0");
              const year = dateFromISOS.getFullYear(); 
              // const formattedDate = `${day}-${month}-${year}`;
              formattedDateFromGoogle = `${year}-${month}-${day}`;
              formattedHourFromGoogle = hour;

              console.log(
                "formattedDateFromGoogle ==> ",
                formattedDateFromGoogle,
                "formattedHourFromGoogle ==> ",
                formattedHourFromGoogle
              ); 

              return formattedDateFromGoogle === dayDublicate && formattedHourFromGoogle === timeDublicate;
            });

            console.log("ДУБЛКАТ .........", dublicate);
            console.log("ДУБЛКАТ Boolean.........", Boolean(dublicate));
            return Boolean(dublicate);
          };

          if (await isDublicate(gettedDateFormData, gettedHourFormData)) {
            return alert(
              `${gettedDateFormData} - ${gettedHourFormData} is already exist`
            );
          } else {
            await sendFormToGoogleSheet(formData);
            resetForm();
            return alert("Thank you! Your form is submitted successfully.");
          }
        } catch (error) {
          console.log("Error!", error.message);
          alert(`Sorry, error! ${error.message}`);
        } finally {
          setIsLoading(false);
        }
      },
    });

  return (
    <form className={styles.form} onSubmit={handleSubmit} autoComplete="off">
      <div>
        <label className={styles.label} htmlFor="lastName">
          Прізвище
        </label>
        <input
          className={styles.input}
          type="text"
          id="lastName"
          name="lastName"
          value={values.lastName}
          onChange={handleChange}
          // onChange={handleInputChange}
          placeholder="Введіть прізвище"
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
          name="name"
          value={values.name}
          onChange={handleChange}
          // onChange={handleInputChange}
          placeholder="Введіть ім'я"
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
          name="email"
          value={values.email}
          onChange={handleChange}
          // onChange={handleInputChange}
          placeholder="Введіть email"
          // required
        />
      </div>
      <div>
        <label className={styles.label} htmlFor="phone">
          Телефон
        </label>
        <input
          className={styles.input}
          type="tel"
          id="phone"
          name="phone"
          // pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
          value={values.phone}
          onChange={handleChange}
          // onChange={handleInputChange}
          placeholder="Введіть телефон"
          // required
        />
      </div>
      <div>
        <label className={styles.label} htmlFor="date">
          Дата
        </label>
        <input
          className={styles.input}
          type="date"
          id="date"
          name="date"
          value={values.date}
          // min="2024-04-12T00:00"
          // max="2024-05-14T00:00"
          onChange={handleChange}
          // onChange={handleInputChange}
          placeholder="Виберіть дату"
          // required
        />
      </div>
      {/* <input
  type="datetime-local"
  id="meeting-time"
  name="meeting-time"
  value="2018-06-12T19:30"
  min="2018-06-07T00:00"
  max="2018-06-14T00:00" /> */}
      <div>
        <label className={styles.label} htmlFor="hour">
          Час
        </label>
        <select
          className={styles.input}
          id="hour"
          name="hour"
          value={values.hour}
          onChange={handleChange}
          // onChange={handleInputChange}
          // required
        >
          <option value="" disabled>
            Виберіть час
          </option>
          {hours.map(({ id, hour }) => (
            <option key={id} value={hour}>
              {hour}
            </option>
          ))}
        </select>
      </div>
      <Button
        type="submit"
        disabled={isLoading ? true : false}
        text={isLoading ? "Обробляється..." : "Відправити"}
      />
    </form>
  );
};

export default Form;
