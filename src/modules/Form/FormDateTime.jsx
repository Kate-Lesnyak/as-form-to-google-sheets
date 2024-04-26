import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import Button from "../../shared/components/Button/Button";

import {
  getFormToGoogleSheet,
  sendFormToGoogleSheet,
} from "../../shared/services/api";

import initialState from "./initialState";
import timeList from "../../data/hours.json";

import styles from "./form.module.scss";

const FormDateTime = ({ data, setIsSubmit }) => {
  const [isLoading, setIsLoading] = useState(false);

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: {
        date: initialState.date,
        time: initialState.time,
      },
      validationSchema: Yup.object().shape({}),
      onSubmit: async ({ date, time }, { resetForm }) => {
        try {
          setIsLoading(true);
          console.log("values-----", values);
          console.log("data props from FORM-----", data);

          // Получаем данные с формы, которые вводит юзер
          const formData = new FormData();
          formData.append("Прізвище", data.lastName);
          formData.append("Ім'я", data.name);
          formData.append("По батькові", data.surname);
          formData.append("Ідентифікаційний номер", data.code);
          formData.append("Електронна пошта", data.email);
          formData.append("Телефон", data.phone);
          formData.append("Дата", date);
          formData.append("Час", time);

          console.log(
            "formData props from FORM после добавления ----",
            formData
          );

          const [, , , , , , gettedDateFormData, gettedTimeFormData] =
            formData.values();

          // console.log("formData date values ", gettedDateFormData);
          // console.log("formData time values ", gettedTimeFormData);

          // Получаем массив данных с гугл таблицы
          const dataFromGoogleSheet = await getFormToGoogleSheet();

          // Проверяем на лимит записи в гугл таблице
          const isLimitDateTime = async (dayLimite, timeLimite) => {
            // console.log(
            //   "DATA IN FOR isLimitDateTime ====",
            //   dataFromGoogleSheet
            // );
            const limit = dataFromGoogleSheet.filter((item) => {
              const [, , , , , , , date, time] = item;
              console.log("date ==== ", date);
              console.log("time ==== ", time);
              return date === dayLimite && time === timeLimite;
            });

            // console.log("ЛИМИТ .........", limit);
            return limit;
          };

          const limit = await isLimitDateTime(
            gettedDateFormData,
            gettedTimeFormData
          );

          if (limit.length >= 3) {
            console.log("limit.length =====>>>", limit.length);
            return alert(
              `Вибачте! На жаль, ці дата: ${gettedDateFormData} та час: ${gettedTimeFormData} вже зайняті. Будь ласка, виберіть іншу дату та час`
            );
          } else {
            await sendFormToGoogleSheet(formData);
            console.log("limit.length =====>>>", limit.length);
            setIsSubmit(false);
            resetForm();
            return alert("Дякуємо! Ви успішно зареєструвались.");
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
        <label className={styles.label} htmlFor="date">
          Дата
        </label>
        <select
          className={styles.input}
          id="date"
          name="date"
          value={values.date}
          onChange={handleChange}
          placeholder="Виберіть дату"
          // required
        >
          <option value="" disabled>
            Виберіть дату
          </option>
          <optgroup label="Квітень">
            <option value="17-04-2024">17-04-2024</option>
            <option value="24-04-2024">24-04-2024</option>
          </optgroup>
          <optgroup label="Травень">
            <option value="08-05-2024">08-05-2024</option>
            <option value="15-05-2024">15-05-2024</option>
            <option value="22-05-2024">22-05-2024</option>
          </optgroup>
        </select>
      </div>

      <div>
        <label className={styles.label} htmlFor="time">
          Час
        </label>
        <select
          className={styles.input}
          id="time"
          name="time"
          value={values.time}
          onChange={handleChange}
          // required
        >
          <option value="" disabled>
            Виберіть час
          </option>
          {timeList.map(({ id, time }) => (
            <option key={id} value={time}>
              {time}
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

export default FormDateTime;
