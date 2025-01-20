import { isEmail, isNotEmpty } from "./validation";
import {
  emailValidator,
  nameValidator,
  PhoneValidator,
  DropdownValidator,
} from "./validation";

const validate = (
  id: string,
  value: string,
  skipValidation = false
): string | null => {
  if (skipValidation === true) return null;

  if (id === "email" && !isEmail(value as string)) {
    return "מייל לא תקין";
  } else if (id === "firstName" && !isNotEmpty(value)) {
    return "לא הוכנס שם";
  } else if (id === "lastName" && !isNotEmpty(value)) {
    return "לא הוכנס שם משפחה";
  } else if (id === "phone" && !PhoneValidator(value)) {
    return "לא הוכנס מספר פלאפון תקין";
  } else if (id === "terms" && value !== "true") {
    return "חובה להסכים לתנאי השימוש";
  } else if (id === "contactingReason" && !isNotEmpty(value)) {
    return "אנא בחר סיבת פניה";
  } else if (id === "acquisitionChannel" && !value) {
    return "אנא בחר איך שמעת עלינו";
  }
  return null;
};

export default validate;
