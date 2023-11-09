import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";

const steps = ["تحكم في مشترياتك", "أكمل تسجيل بياناتك", "التقدم للدفع"];

interface CartStepperProps {
  stepUpdate: number; 
}

export const CartStepper: React.FC<CartStepperProps>  = ({ stepUpdate }) => {
  return (
    <div dir="ltr" className="bg-light py-5">
      <Box sx={{ width: "100%" }}>
        <Stepper activeStep={stepUpdate} alternativeLabel>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>
                <span className="fs-3">{label}</span>
              </StepLabel>
            </Step>
          ))}
        </Stepper>
      </Box>
    </div>
  );
};
