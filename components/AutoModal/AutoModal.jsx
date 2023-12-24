'use client';
import styles from "./AutoModal.module.scss";
import {useAuto, useUser} from "../../store/store";
import TitleText from "../ui/TitleText/TitleText";
import {useState} from "react";
import Image from "next/image";
import classNames from "classnames";
import closeIcon from "../../public/icons/close/close.svg";
import hidePass from "../../public/icons/auth/pass-hide.svg";
import showPass from "../../public/icons/auth/pass-show.svg";
import {getCookie, loginUser, registerUser} from "../../actions/auth";
import {setToken} from "../../api/createAxios";
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import addToBasket from "../../api/addToBasket";
import getAllBasketProducts from "../../api/getAllBasketProducts";
import setBasketItemQuantity from "../../api/setBasketItemQuantity";

export const cache = 'no-cache';
const AutoModal = () => {
  const isAutoOpen = useAuto(state => state.isAutoOpen);
  const setAutoClose = useAuto(state => state.closeAuto);
  const logUser = useUser(state => state.registerUser);
  const logOutUser = useUser(state => state.unregisterUser);
  const [loginOrSignup, setLoginOrSignup] = useState('register');
  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isNameDirty, setIsNameDirty] = useState(false);
  const [isEmailDirty, setIsEmailDirty] = useState(false);
  const [isPasswordDirty, setIsPasswordDirty] = useState(false);
  const [nameError, setNameError] = useState('Name cannot be empty');
  const [emailError, setEmailError] = useState('Email cannot be empty');
  const [passwordError, setPasswordError] = useState('Password cannot be empty');
  const handleWrapperClick = (e) => {
    if (e.target.closest(`.${styles.modal}`)) return;
    setAutoClose();
  }
  const handleCloseBtnClick = (e) => {
    e.preventDefault();
    setAutoClose();
  }
  const handleNameBlur = (e) => {
    setIsNameDirty(true);
    checkName(e.target.value);
  }
  const handleNameChange = (e) => {
    setName(e.target.value);
    checkName(e.target.value);
  }
  const handleEmailBlur = (e) => {
    setIsEmailDirty(true);
    checkEmail(e.target.value);
  }
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    checkEmail(e.target.value);
  }
  const handlePasswordBlur = (e) => {
    setIsPasswordDirty(true);
    checkPassword(e.target.value);
  }
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    checkPassword(e.target.value);
  }
  const checkPassword = (password) => {
    if (!password) {
      setPasswordError('Password cannot be empty');
    } else if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]).{5,}$/.test(password)) {
      setPasswordError('Password must contain at least 8 characters, one uppercase letter, one symbol and one number');
    } else {
      setPasswordError('');
    }
  }
  const checkEmail = (email) => {
    if (!email) {
      setEmailError('Email cannot be empty');
    } else if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
      setEmailError('Email is not valid');
    } else {
      setEmailError('');
    }
  }
  const checkName = (name) => {
    if (!name || !/^[a-zA-Z]+$/.test(name)) {
      setNameError('Name cannot be empty or contains numbers and special characters');
    } else {
      setNameError('');
    }
  }
  const setLoginError = (error) => {
    setEmailError(error);
    setPasswordError(error);
  }
  const setRegisterError = (error) => {
    setNameError(error);
    setEmailError(error);
    setPasswordError(error);
  }
  const handleAuthChange = (type) => {
    setLoginOrSignup(type);
    if (type === 'login') {
      setName('');
      setNameError('');
      setIsNameDirty(false);
    } else {
      setLoginError('');
      setIsNameDirty(true);
      setName('');
      setNameError('Name cannot be empty');
    }
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loginOrSignup === 'register') {
      const res = await registerUser(name, email, password);
      if (res === 'Error') {
        setRegisterError('Something wrong with your email or password or name. Maybe you are already registered?');
        toast('Something wrong with your email or password or name. Maybe you are already registered?')
        setName('');
        setNameError('Name cannot be empty');
        setIsNameDirty(true);
        setPassword("");
        setPasswordError('Password cannot be empty');
        setIsPasswordDirty(true);
        setEmail("");
        setEmailError('Email cannot be empty');
        setIsEmailDirty(true);
      } else {
        const accessToken = await getCookie();
        logUser();
        setToken(accessToken.value);
        setAutoClose();
        const allLocalBasket = localStorage.getItem('products');
        if (allLocalBasket && allLocalBasket.length > 0) {
          const localBasket = JSON.parse(allLocalBasket);
          localBasket.forEach(async (item) => {
            await addToBasket(item.title, item.slug, item.preview, item.color, item.type, item.price, item.merchant, res?.user?.username)
          });
          localStorage.removeItem('products');
        }
        toast('You are successfully registered! 🎉🎉', {
          autoClose: 2000,
        })
      }
    } else {
      const res = await loginUser(email, password);
      if (res === 'Error') {
        setLoginError('Something wrong with your email or password. Maybe you are not registered yet?');
        toast('Something wrong with your email or password. Maybe you are not registered yet?')
        setName('');
        setNameError('Name cannot be empty');
        setIsNameDirty(true);
        setPassword("");
        setPasswordError('Password cannot be empty');
        setIsPasswordDirty(true);
        setEmail("");
        setEmailError('Email cannot be empty');
        setIsEmailDirty(true);
      } else {
        const accessToken = await getCookie();
        setToken(accessToken.value);
        logUser();
        setAutoClose();
        const allLocalBasket = localStorage.getItem('products');
        if (allLocalBasket && allLocalBasket.length > 0) {
          const localBasket = JSON.parse(allLocalBasket);
          const userBasket = await getAllBasketProducts(res?.user?.username);
          localBasket.forEach(async (item) => {
            const productIndex = userBasket.data.findIndex((product) => product.attributes.slug === item.slug && product.attributes.type === item.type && product.attributes.color === item.color);
            if (productIndex === -1) {
              await addToBasket(item.title, item.slug, item.preview, item.color, item.type, item.price, item.merchant, res?.user?.username, item?.quantity);
            } else {
              const product = userBasket.data[productIndex];
              await setBasketItemQuantity(product.id, '_', product.attributes.quantity + item.quantity);
            }
          })
          localStorage.removeItem('products');
        }
        toast('You are successfully logged in! 🎉🎉', {
          autoClose: 2000,
        });
      }
    }
  }
  return (
    <>
      <div onClick={(e) => handleWrapperClick(e)} className={classNames(styles.wrapper, {
        [styles.wrapper_open]: isAutoOpen
      })}>
        <div className={classNames(styles.modal, {
          [styles.modal_open]: isAutoOpen
        })}>
          <div className={styles.modal_header}>
            <TitleText text={loginOrSignup === 'register' ? 'Sign Up' : 'Sign In'}/>
            <button onClick={(e) => handleCloseBtnClick(e)} className={styles.close_btn}>
              <Image width={24} height={24} src={closeIcon} className={styles.close}/>
            </button>
          </div>
          <form onSubmit={(e) => handleSubmit(e)} className={styles.signup_form}>
            {loginOrSignup === 'register' ? <fieldset className={styles.sign_row}>
              <label className={styles.sign_label} htmlFor="name">Name</label>
              <input value={name} onChange={(e) => handleNameChange(e)} onBlur={(e) => handleNameBlur(e)}
                     className={styles.sign_input}
                     placeholder={'Enter your name'}
                     name={'name'} id={'name'} type="text"/>
              {nameError && isNameDirty ? <span className={styles.error}>{nameError}</span> : null}
            </fieldset> : null}
            <fieldset className={styles.sign_row}>
              <label className={styles.sign_label} htmlFor="email">Email</label>
              <input value={email} onChange={(e) => handleEmailChange(e)} onBlur={(e) => handleEmailBlur(e)}
                     className={styles.sign_input} placeholder={'Enter your email'}
                     name={'email'} id={'email'}
                     type="text"/>
              {emailError && isEmailDirty ? <span className={styles.error}>{emailError}</span> : null}
            </fieldset>
            <fieldset className={styles.sign_row}>
              <label className={styles.sign_label} htmlFor="password">Password</label>
              <div className={styles.pass_block}>
                <input value={password} onChange={(e) => handlePasswordChange(e)} onBlur={(e) => handlePasswordBlur(e)}
                       className={styles.sign_input}
                       placeholder={'Enter your password'} name={'password'} id={'password'}
                       type={showPassword ? 'text' : "password"}/>
                {passwordError && isPasswordDirty ? <span className={styles.error}>{passwordError}</span> : null}
                <button type={'button'}
                        onClick={() => setShowPassword((prev) => !prev)}
                        className={styles.show_hide_password}>
                  <Image width={16} height={16} src={showPassword ? showPass : hidePass} alt={'Show or Hide Password'}/>
                </button>
              </div>
            </fieldset>
            {loginOrSignup === 'register' ?
              <div className={styles.btn_row}>
                <button type={"button"} onClick={() => handleAuthChange('login')} className={styles.reg}>Have
                  already account? Sign
                  In!
                </button>
              </div> :
              <div className={styles.btn_row}>
                <button type={"button"} onClick={() => handleAuthChange('register')} className={styles.reg}>Dont have
                  an account? Sign
                  up!
                </button>
              </div>}
            <button disabled={!!(passwordError || nameError || emailError)} type={"submit"}
                    className={styles.sign_btn}>
              {!!(passwordError || nameError || emailError) ? 'Something wrong with your input data' : loginOrSignup === 'register' ? 'Sign Up' : 'Sign In'}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default AutoModal;