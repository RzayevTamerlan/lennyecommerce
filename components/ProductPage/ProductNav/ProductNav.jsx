'use client';
import {useRouter} from "next/navigation";
import classNames from "classnames";

const ProductNav = ({className, text}) => {
  const router = useRouter();
  return (
    <button onClick={() => router.back()}
            className={classNames(...className)}>{text}</button>
  );
};

export default ProductNav;