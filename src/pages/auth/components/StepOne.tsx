import PasswordField from "@/components/common/PasswordField";
import { TextField, Box, Button } from "@mui/material";

type SetState<T> = (value: T) => void;

interface StepOneProps {
  email: string;
  password: string;
  confirmPassword: string;
  setEmail: SetState<string>;
  setPassword: SetState<string>;
  setConfirmPassword: SetState<string>;
  nextStep: () => void;
}

const StepOne = ({
    email, 
    password, 
    confirmPassword, 
    setEmail, 
    setPassword, 
    setConfirmPassword, 
    nextStep, 
  }: StepOneProps) => {
  return (
    <form 
      onSubmit={(e) => e.preventDefault()} 
      style={{ width: "100%" }}
    >
      <TextField 
        label="Email" 
        type="email" 
        fullWidth 
        margin="normal" 
        value={email} 
        onChange={(e) => setEmail(e.target.value)} 
        required 
      />
      <PasswordField 
        label={"Password"} 
        value={password}
        onChange={
          (e) => setPassword(e.target.value)
        }
      />
      <PasswordField 
        label={"Confirm Password"} 
        value={confirmPassword}
        onChange={
          (e) => setConfirmPassword(e.target.value)
        }
      />

      <Box sx={{ mt: 2, display: "flex", justifyContent: "center" }}>
        <Button variant="contained" color="primary" onClick={nextStep}>
          Next
        </Button>
      </Box>
    </form>
  );
};

export default StepOne;
