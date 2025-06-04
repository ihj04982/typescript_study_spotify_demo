import { styled, keyframes } from "@mui/material/styles";

const spinnerContainerStyles = {
  position: "fixed" as const,
  top: 0,
  left: 0,
  width: "100vw",
  height: "100vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  zIndex: 9999,
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
