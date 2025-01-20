
export function isEmail(value:string) {
  return value.includes('@');
}

export function isNotEmpty(value:string) {
  return value.trim() !== '';
}

export function hasMinLength(value:string, minLength:number) {
  return value.length >= minLength;
}

export function isEqualToOtherValue(value:string, otherValue:string) {
  return value === otherValue;
}

export const emailValidator = (value:string) => {
    if (!/^[a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]+$/.test(value))
      return "Invalid email address";
    return false;
  };

  export const nameValidator = (value:string) => {
      if (value.length < 3) return "Name must be at least 3 characters long";
      if (value.length > 20) return "Name must be less than 20 characters long";
      if (!/^[a-zA-Z ]+$/.test(value))
        return "Name must contain only letters and spaces";
      return false;
    };
    export const PhoneValidator = (value: string) => {
      const phoneRegex = /^05(0|2|3|4|8)-?[0-9]{8}$/;
      if(value.length!=10){
        return
      }

      if (!/^\d+$/.test(value)) {
        return;
      }

      if (!phoneRegex.test(value)) {
        return "Phone must start with '05' and contain 10 digits.";
      }
    };

    export const DropdownValidator = (value: string): string | true => {
      if (!value || value === "") {
        return "Please select a valid option.";
      }
      return true; // Valid
    };