import { useCallback, useEffect, useMemo, useReducer, useState } from "react";
import { debounce, FormSchema } from "./utils";

interface FormState {
  name: string;
  email: string;
  message: string;
}

type FormAction =
  | { type: "UPDATE_NAME_FIELD"; value: string }
  | { type: "UPDATE_EMAIL_FIELD"; value: string }
  | { type: "UPDATE_MESSAGE_FIELD"; value: string };

const initialState: FormState = {
  name: "",
  email: "",
  message: "",
};

export default function useContactForm() {
  const [formState, dispatch] = useReducer(reducer, initialState);
  const [errors, setErrors] = useState<{
    message: string;
    name: string;
    email: string;
  }>({ message: "", name: "", email: "" });

  const validateForm = useCallback(() => {
    const validation = FormSchema.safeParse(formState);

    if (!validation.success) {
      const fieldErrors = validation.error.flatten().fieldErrors;

      setErrors({
        name: fieldErrors.name ? fieldErrors.name[0] : "",
        email: fieldErrors.email ? fieldErrors.email[0] : "",
        message: fieldErrors.message ? fieldErrors.message[0] : "",
      });
    } else {
      setErrors({ message: "", name: "", email: "" });
    }
  }, [formState]);

  const areErrors = useMemo(() => {
    return (
      Object.values(errors).some((error) => error !== "") ||
      Object.values(formState).some((value) => value === "")
    );
  }, [errors]);

  return { formState, dispatch, validateForm, errors, areErrors } as const;
}

function reducer(state: FormState, action: FormAction) {
  switch (action.type) {
    case "UPDATE_NAME_FIELD":
      return {
        ...state,
        name: action.value,
      };
    case "UPDATE_EMAIL_FIELD":
      return {
        ...state,
        email: action.value,
      };
    case "UPDATE_MESSAGE_FIELD":
      return {
        ...state,
        message: action.value,
      };
    default:
      return state;
  }
}
