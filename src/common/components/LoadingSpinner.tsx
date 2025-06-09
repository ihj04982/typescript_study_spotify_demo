import { styled, keyframes } from "@mui/material/styles";

const spinnerContainerStyles = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

const spin = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const SpinnerContainer = styled("div")(spinnerContainerStyles);

const Spinner = styled("div")(({ theme }) => ({
  width: "40px",
  height: "40px",
  border: `4px solid ${theme.palette.background.paper}`,
  borderTop: `4px solid ${theme.palette.primary.main}`,
  borderRadius: "50%",
  animation: `${spin} 1s linear infinite`,
}));

const LoadingSpinner = () => {
  return (
    <SpinnerContainer>
      <Spinner />
    </SpinnerContainer>
  );
};

export default LoadingSpinner;
