export type FormState = {
    errors: { [key: string]: string | null };
    enteredValues: {
      firstName?: string;
      lastName?: string;
      email?: string;
      phone?: string;
      contactingReason?: string;
      acquisitionChannel?: string;
      textBox?: string;
      terms?: string;
    };
  };
  
  export const initialFormState: FormState = {
    errors: {},
    enteredValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      contactingReason: "",
      acquisitionChannel: "",
      textBox: "",
      terms: "",
    },
  };
  
  export type Payload = {
    field: string;
    value: string | { [key: string]: string | null }; // Allow `value` to be a string or the errors object
    skipValidation?: boolean;
  };