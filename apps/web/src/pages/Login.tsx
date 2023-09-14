import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Link } from 'react-router-dom';

import { Header } from '../components/Header.tsx';
import { login } from '../api/user.ts';

interface Values {
  email: string;
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

export function LoginPage() {
  return (
    <div className="w-full h-screen container mx-auto">
      <Header />
      <Formik
        initialValues={{ email: '', password: '' }}
        validate={(values: Values) => {
          const errors: {
            email?: string;
            password?: string;
          } = {};

          if (!values.email) errors.email = 'Email is required';
          if (!values.password)
            errors.password = 'Password is required';

          return errors;
        }}
        onSubmit={(values: Values) => {
          login(values).then((response) =>
            console.log('response:login', response.data),
          );
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
                  className="w-full h-[35px] font-sans bg-slate-200 hover:bg-blue-100 shadow-sm"
                  type="submit"
                >
                  Login
                </button>
                <span>or</span>
                <Link
                  to={'/register'}
                  className="font-sans text-md text-blue-400 underline"
                >
                  register
                </Link>
              </div>
            </div>
          </Form>
        </div>
      </Formik>
    </div>
  );
}
