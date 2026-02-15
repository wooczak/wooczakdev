import styles from "./ContactForm.module.scss";
import useContactForm from "./useContactForm.hook";

export default function ContactForm() {
  const { formState, dispatch, validateForm, errors, areErrors } =
    useContactForm();

  return (
    <form onBlur={() => validateForm()} className={styles.contactForm}>
      <label className={styles.label} htmlFor="name">
        Your name
      </label>
      <input
        className={`${styles.input} ${errors.name && !!formState.name ? styles.inputError : ""}`}
        type="text"
        id="name"
        name="name"
        value={formState.name}
        onChange={({ target: { value } }) =>
          dispatch({ type: "UPDATE_NAME_FIELD", value })
        }
      />
      {errors.name && !!formState.name && (
        <p className={styles.error}>{errors.name}</p>
      )}

      <label className={styles.label} htmlFor="email">
        Your email
      </label>
      <input
        className={`${styles.input} ${errors.email && !!formState.email ? styles.inputError : ""}`}
        type="email"
        id="email"
        name="email"
        onChange={({ target: { value } }) =>
          dispatch({ type: "UPDATE_EMAIL_FIELD", value })
        }
        value={formState.email}
      />
      {errors.email && !!formState.email && (
        <p className={styles.error}>{errors.email}</p>
      )}
      <label className={styles.label} htmlFor="message">
        Your message
      </label>
      <textarea
        className={styles.input}
        id="message"
        name="message"
        value={formState.message}
        onChange={({ target: { value } }) =>
          dispatch({ type: "UPDATE_MESSAGE_FIELD", value })
        }
      ></textarea>
      <button
        className={`action-btn ${areErrors ? "action-btn--disabled" : ""}`}
        disabled={areErrors}
        type="submit"
      >
        Send your message
      </button>
    </form>
  );
}
