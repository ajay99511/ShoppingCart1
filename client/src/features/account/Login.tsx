import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { Avatar, Container, Paper } from '@mui/material';
import { LockOutlined } from '@mui/icons-material';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FieldValues, useForm } from 'react-hook-form';
import { LoadingButton } from '@mui/lab';
import { UseAppDispatch } from '../../app/store/ConfigureStore';
import { signInAsync } from './AccountSlice';

export default function Login() {
  const navigate = useNavigate();
    const dispatch = UseAppDispatch();
    const location = useLocation();

    const {register,handleSubmit,formState:{isSubmitting,isValid,errors}} = useForm(
      {
        mode:'onTouched'
      }
    );

    async function submitForm(data:FieldValues) {
      try {
        // await agent.Account.login(data);
        await dispatch(signInAsync(data));
        navigate(location.state?.from || '/catalog')
      } catch (error) {
        console.log(error);
      }
    }

  return (
    <>
    <Container component={Paper} maxWidth="sm"  
    sx={{display:'flex', flexDirection:'column',alignItems:'center',padding:4}}>
        <Avatar
        sx={{m:1,bgcolor:'secondary.main'}}
        >
            <LockOutlined/>
        </Avatar>
            <Typography
              component="h1"
              variant="h4"
            >
              Sign in
            </Typography>
            <Box
              component="form"
              onSubmit={handleSubmit(submitForm)}
              noValidate
              sx={{
                display: 'flex',
                flexDirection: 'column',
                width: '80%',
                gap: 2,
                mt:1
              }}
            >
              <FormControl>
                <TextField
                  placeholder="username"
                  label="username"
                  autoFocus
                  fullWidth
                  variant="outlined"
                  sx={{ ariaLabel: 'email' }}
                  {...register('username',{required:'Username is required'})} // react form has built in on change with name property and validators
                  error = {!!errors.username} // makes the background red and !! converts the errors.username into boolean
                  helperText = {errors?.username?.message?.toString()} //Displays text below the text field
                />
              </FormControl>
              <FormControl>
                <TextField
                  placeholder="password"
                  type="password"
                  label="password"
                  fullWidth
                  variant="outlined"
                  {...register('password',{required:'Password is required'})}
                  error = {!!errors.password}
                  helperText = {errors?.password?.message?.toString()}
                />
              </FormControl>
              <LoadingButton
                disabled = {!isValid}
                type="submit"
                fullWidth
                loading={isSubmitting}
                variant="contained"
              >
                Login
              </LoadingButton>
              <Typography sx={{ textAlign: 'center' }}>
                Don&apos;t have an account?{' '}
                <span>
                  <Link
                    to="/register"
                  >
                    Sign up
                  </Link>
                </span>
              </Typography>
            </Box>          
    </Container>
            </>
  );
}

// const [values,setValues] = useState(
//   {
//    username:'',
//    password:''
//   }
// )
// const handleSubmit = (event:any) => {
// event.preventDefault();
// agent.Account.login(values);
// };

// function handleInputChange(event:any)
// {
// const {name, value} = event.target;
// setValues({...values,[name]:value});

// }


{/* <FormControl>
                <TextField
                  name="password"
                  placeholder="Password"
                  type="password"
                  label="Password"
                  autoFocus
                  fullWidth
                  variant="outlined"
                  onChange={handleInputChange}
                  value={values.password}
                />
              </FormControl> */}