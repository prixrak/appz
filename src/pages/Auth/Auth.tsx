import { ErrorMessage, Field, Form, Formik } from 'formik';
import { FC, useCallback, useEffect, useState } from 'react';
import { useStyles } from './Auth.styles';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { ReactComponent as EmailIcon } from '@assets/icons/email.svg';
import { ReactComponent as PasswordIcon } from '@assets/icons/password.svg';
import { loginUser, registerUser } from './../../redux/user/actions';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import { Paths } from '@enums/Path';
import { useAuth } from '../../hooks/useAuth';

const Auth: FC = () => {
  const styles = useStyles();
  const location = useLocation();
  const [isRegisterView, setIsRegisterView] = useState<boolean>();
  const currentUser = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    if (currentUser.data) {
      navigate(Paths.root);
    }
  }, [currentUser]);
  useEffect(() => {
    location.pathname === Paths.register ? setIsRegisterView(true) : setIsRegisterView(false);
  }, [location.pathname]);

  const initialValues = {
    email: '',
    password: '',
    role: 'Guard',
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Required'),
    password: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('Required'),
  });

  const dispatch = useDispatch();

  const handleFormSubmit = useCallback(
    (values) => {
      isRegisterView ? dispatch(registerUser(values)) : dispatch(loginUser(values));
    },
    [isRegisterView]
  );

  return (
    <div className={styles.root}>
      <div className={styles.container}>
        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleFormSubmit}>
          {() => (
            <Form>
              <div className={styles.fieldsBlocks}>
                <div className={styles.fieldBlock}>
                  <label htmlFor="email" className={styles.label}>
                    Email
                  </label>
                  <div className={styles.inputBlock}>
                    <EmailIcon />
                    <Field name="email" type="email" placeholder="user@mail.com" className={styles.inputField} />
                  </div>
                  <ErrorMessage component="div" name="email" className={styles.errorField} />
                </div>
                <div className={styles.fieldBlock}>
                  <label htmlFor="password" className={styles.label}>
                    Password
                  </label>
                  <div className={styles.inputBlock}>
                    <PasswordIcon />
                    <Field name="password" type="password" placeholder="password" className={styles.inputField} />
                  </div>
                  <ErrorMessage component="div" name="password" className={styles.errorField} />
                </div>
                <button type="submit" className={styles.button}>
                  {isRegisterView ? 'Sign up' : 'Sign in'}
                </button>
              </div>
            </Form>
          )}
        </Formik>
        <Link to={isRegisterView ? Paths.login : Paths.register} className={styles.footerLink}>
          {isRegisterView && 'Sign in'}
        </Link>
      </div>
    </div>
  );
};

export default Auth;
