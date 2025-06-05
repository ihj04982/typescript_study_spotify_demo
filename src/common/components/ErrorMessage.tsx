import { Alert } from "@mui/material";

interface IErrorMessageProps {
  errorMessage: string;
}

const ErrorMessage = ({ errorMessage }: IErrorMessageProps) => {
  return <Alert severity="error">errorMessage</Alert>;
};

export default ErrorMessage;
