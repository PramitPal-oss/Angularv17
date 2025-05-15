export interface userInterface {
  Id: number;
  fname: string;
  lname: string;
  email: string;
  phnumber: number;
  fullname: string
}

export interface EditInterface extends userInterface {
  EditId: number
}