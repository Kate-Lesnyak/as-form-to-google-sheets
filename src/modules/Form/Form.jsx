import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

import Button from "../../shared/components/Button/Button";
import FormDateTime from "./FormDateTime";

import {
  getFormToGoogleSheet,
  sendFormToGoogleSheet,
} from "../../shared/services/api";

import initialState from "./initialState";
// import timeList from "../../data/hours.json";

import styles from "./form.module.scss";

const Form = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmit, setIsSubmit] = useState(false);
  const [data, setData] = useState({});

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: {
        lastName: initialState.lastName,
        name: initialState.name,
        surname: initialState.surname,
        code: initialState.code,
        email: initialState.email,
        phone: initialState.phone,
        // date: initialState.date,
        // time: initialState.time,
      },
      validationSchema: Yup.object().shape({}),
      onSubmit: async (
        { lastName, name, surname, code, email, phone },
        { resetForm }
      ) => {
        try {
          setIsLoading(true);
          console.log(values);

          // Получаем данные с формы, которые вводит юзер
          const formData = new FormData();
          formData.append("Прізвище", lastName);
          formData.append("Ім'я", name);
          formData.append("По батькові", surname);
          formData.append("Ідентифікаційний номер", code);
          formData.append("Електронна пошта", email);
          formData.append("Телефон", phone);
          // formData.append("Дата", date);
          // formData.append("Час", time);

          // const [
          //   ,
          //   ,
          //   ,
          //   gettedCodeFormData,
          //   ,
          //   ,
          //   gettedDateFormData,
          //   gettedTimeFormData,
          // ] = formData.values();
          const [, , , gettedCodeFormData] = formData.values();

          console.log("formData code ", gettedCodeFormData);
          // console.log("formData date ", gettedDateFormData);
          // console.log("formData time ", gettedTimeFormData);

          // Получаем данные с гугл таблицы
          const dataFromGoogleSheet = await getFormToGoogleSheet();

          // Проверяем на дубликат в гугл таблице
          const isDublicateDateTime = async (
            codeDublicate
            // dayDublicate,
            // timeDublicate
          ) => {
            console.log(
              "DATA IN FOR isDublicateDateTime ====",
              dataFromGoogleSheet
            );
            const dublicate = dataFromGoogleSheet.find((item) => {
              // const [, , , , code, , , date, time] = item;
              const [, , , , code] = item;
              const codeStringFormat = code;
              // console.log("date ==== ", date);
              // console.log("time ==== ", time);
              console.log("codeStringFormat ==== ", codeStringFormat);

              return (
                codeStringFormat === codeDublicate
                // || (date === dayDublicate && time === timeDublicate)
              );
            });

            console.log("ДУБЛКАТ .........", dublicate);
            console.log("ДУБЛКАТ Boolean.........", Boolean(dublicate));
            return Boolean(dublicate);
          };

          const dublicate = await isDublicateDateTime(
            gettedCodeFormData
            // gettedDateFormData,
            // gettedTimeFormData
          );

          if (dublicate) {
            return alert(`Вибачте! На жаль, Ви вже зареєстровані`);
          } else {
            setData(values);
            console.log(' values elsе:  ', values);
            // await sendFormToGoogleSheet(formData);
            setIsSubmit(true);
            resetForm();
            // return alert("Дякуємо! Ви успішно зареєструвались.");
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
    <>
      {!isSubmit ? (
        <form
          className={styles.form}
          onSubmit={handleSubmit}
          autoComplete="off"
        >
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
              placeholder="Введіть прізвище"
              autoFocus
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
              name="name"
              value={values.name}
              onChange={handleChange}
              placeholder="Введіть ім'я"
              autoComplete="off"
              // required
            />
          </div>
          <div>
            <label className={styles.label} htmlFor="surname">
              По-батькові
            </label>
            <input
              className={styles.input}
              type="text"
              id="surname"
              name="surname"
              value={values.surname}
              onChange={handleChange}
              placeholder="Введіть по батькові"
              autoComplete="off"
              // required
            />
          </div>
          <div>
            <label className={styles.label} htmlFor="code">
              Ідентифікаційний номер
            </label>
            <input
              className={styles.input}
              type="text"
              id="code"
              name="code"
              value={values.code}
              onChange={handleChange}
              placeholder="Введіть ідентифікаційний номер"
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
              name="email"
              value={values.email}
              onChange={handleChange}
              placeholder="Введіть email"
              autoComplete="off"
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
              placeholder="Введіть телефон"
              autoComplete="off"
              // required
            />
          </div>

          <Button
            type="submit"
            disabled={isLoading ? true : false}
            text={isLoading ? "Обробляється..." : "Відправити"}
          />
        </form>
      ) : (
        <FormDateTime data={data} setIsSubmit={setIsSubmit} />
      )}
    </>
  );
};

export default Form;
