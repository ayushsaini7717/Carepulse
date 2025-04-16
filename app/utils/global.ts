
export let otp = Math.floor(100000 + Math.random() * 900000);
export let export_mail = "";
export let export_fullName = "";
export let export_phone = "";

export const setGlobals = (mail: string, name: string, phone: string, generatedOtp: number) => {
  export_mail = mail;
  export_fullName = name;
  export_phone = phone;
  otp = generatedOtp;
};
