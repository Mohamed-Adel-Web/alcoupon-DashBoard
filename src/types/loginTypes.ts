export interface loginData {
    email: string;
    password: string;
  }
  export interface submittedData extends loginData {
    role: string;
  }