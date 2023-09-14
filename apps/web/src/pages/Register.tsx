import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Header } from '../components/Header.tsx';
import { Link } from 'react-router-dom';

interface Values {
  email: string;
  username: string;
  password: string;
}

export const Input = ({ ...args }) => {
  return (
    <Field
      className={`border-[1px] border-slate-100 rounded-sm shadow-sm px-2 w-full h-[35px] focus:outline-none focus:border-blue-200`}
      {...args}
    />
  );
};

export function RegisterPage() {
  return (
    <div className="w-full h-screen container mx-auto">
      <Header />
      <Formik
        initialValues={{ email: '', username: '', password: '' }}
        validate={(values: Values) => {
          const errors: {
            email?: string;
            username?: string;
            password?: string;
          } = {};

          if (!values.email) errors.email = 'Email is required';

          if (!values.username)
            errors.username = 'Username is required';

          if (!values.password)
            errors.password = 'Password is required';

          return errors;
        }}
        onSubmit={(values: Values) => {
          console.log(values);
        }}
      >
        <div className="flex justify-center items-center h-screen">
          <Form className="w-[400px]">
            <div className="flex items-center flex-col space-y-1">
              <div className="group w-full flex flex-col">
                <label htmlFor="email">Email</label>
                <Input
                  id="email"
                  name="email"
                  placeholder="email"
                  type="email"
                />
                <ErrorMessage
                  className="font-sans text-md font-normal text-red-400"
                  name="email"
                  component="div"
                />
              </div>
              <div className="w-full flex flex-col">
                <label htmlFor="username">Username</label>
                <Input
                  id="username"
                  name="username"
                  placeholder="username"
                />
                <ErrorMessage
                  className="font-sans text-md font-normal text-red-400"
                  name="username"
                  component="div"
                />
              </div>
              <div className="w-full flex flex-col">
                <label htmlFor="password">Password</label>
                <Input
                  id="password"
                  name="password"
                  placeholder="password"
                  type="password"
                />
                <ErrorMessage
                  className="font-sans text-md font-normal text-red-400"
                  name="password"
                  component="div"
                />
              </div>

              <div className="w-full flex flex-col items-center">
                <button
                  className="w-full h-[35px] font-sans bg-slate-200 hover:bg-blue-100"
                  type="submit"
                >
                  Sign-Up
                </button>
                <span>or</span>
                <Link
                  to={'/login'}
                  className="font-sans text-md text-blue-400 underline"
                >
                  login
                </Link>
              </div>
            </div>
          </Form>
        </div>
      </Formik>
    </div>
  );
}
