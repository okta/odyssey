/*!
 * Copyright (c) 2021-present, Okta, Inc. and/or its affiliates. All rights reserved.
 * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
 *
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *
 * See the License for the specific language governing permissions and limitations under the License.
 */

// eslint-disable-next-line import/no-extraneous-dependencies
import { ReactNode } from "react";

type PlaceholderLogoProps = {
  children: ReactNode;
};

const PlaceholderLogo = ({ children }: PlaceholderLogoProps) => {
  return <>{children}</>;
};

export default PlaceholderLogo;

const One = () => {
  return (
    <PlaceholderLogo>
      <svg
        id="logo-44"
        width="172"
        height="40"
        viewBox="0 0 172 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {" "}
        <path
          d="M49.0364 29H60.3891V25.7673H52.4982V10.6727H49.0364V29Z"
          fill="#23216E"
          className="ccompli2"
        ></path>{" "}
        <path
          d="M67.2113 29.3818C68.5859 29.3818 69.795 29.0763 70.8386 28.4654C71.8907 27.846 72.7095 26.9933 73.295 25.9073C73.8889 24.8127 74.1859 23.5527 74.1859 22.1273C74.1859 20.7103 73.8931 19.4588 73.3077 18.3727C72.7222 17.2782 71.9034 16.4212 70.8513 15.8018C69.8077 15.1824 68.5944 14.8727 67.2113 14.8727C65.8537 14.8727 64.6531 15.1782 63.6095 15.7891C62.5659 16.4 61.7471 17.2527 61.1531 18.3473C60.5592 19.4333 60.2622 20.6933 60.2622 22.1273C60.2622 23.5442 60.5507 24.8 61.1277 25.8945C61.7131 26.9806 62.5277 27.8333 63.5713 28.4527C64.615 29.0721 65.8283 29.3818 67.2113 29.3818ZM67.2113 26.1491C66.1337 26.1491 65.315 25.7885 64.755 25.0673C64.2034 24.3376 63.9277 23.3576 63.9277 22.1273C63.9277 20.9309 64.1907 19.9636 64.7168 19.2254C65.2513 18.4788 66.0828 18.1054 67.2113 18.1054C68.3059 18.1054 69.1289 18.4703 69.6804 19.2C70.2404 19.9297 70.5204 20.9054 70.5204 22.1273C70.5204 23.3067 70.2447 24.2739 69.6931 25.0291C69.1501 25.7757 68.3228 26.1491 67.2113 26.1491Z"
          fill="#23216E"
          className="ccompli2"
        ></path>{" "}
        <path
          d="M81.0319 29.3818C81.6768 29.3818 82.2707 29.3054 82.8138 29.1527C83.3653 29 83.8659 28.7836 84.3156 28.5036V29.8909C84.3326 30.4 84.201 30.8242 83.921 31.1636C83.6495 31.5115 83.2847 31.7703 82.8265 31.94C82.3683 32.1182 81.8804 32.2073 81.3629 32.2073C80.8792 32.2073 80.4295 32.1012 80.0138 31.8891C79.6065 31.677 79.2925 31.3673 79.0719 30.96L75.8647 32.5127C76.3907 33.4036 77.1416 34.1206 78.1174 34.6636C79.0932 35.2151 80.1665 35.4909 81.3374 35.4909C82.3471 35.4909 83.2847 35.3551 84.1501 35.0836C85.0156 34.8206 85.7453 34.4176 86.3392 33.8745C86.9416 33.3315 87.3532 32.64 87.5738 31.8C87.6501 31.503 87.701 31.2018 87.7265 30.8963C87.7604 30.5994 87.7774 30.2812 87.7774 29.9418V15.2545H84.7483V16.0182C84.2816 15.6533 83.7513 15.3733 83.1574 15.1782C82.5719 14.9745 81.9229 14.8727 81.2101 14.8727C79.895 14.8727 78.7495 15.1867 77.7738 15.8145C76.798 16.4424 76.0386 17.3036 75.4956 18.3982C74.961 19.4842 74.6938 20.7273 74.6938 22.1273C74.6938 23.5018 74.9568 24.7363 75.4829 25.8309C76.0174 26.9254 76.7598 27.7909 77.7101 28.4273C78.6604 29.0636 79.7677 29.3818 81.0319 29.3818ZM81.5919 26.3018C80.8453 26.3018 80.2344 26.1151 79.7592 25.7418C79.2841 25.3685 78.9319 24.8679 78.7029 24.24C78.4738 23.6036 78.3592 22.8994 78.3592 22.1273C78.3592 21.3636 78.478 20.6679 78.7156 20.04C78.9532 19.4036 79.318 18.8988 79.8101 18.5254C80.3107 18.1436 80.9471 17.9527 81.7192 17.9527C82.8053 17.9527 83.5816 18.3388 84.0483 19.1109C84.515 19.8745 84.7483 20.88 84.7483 22.1273C84.7483 23.3745 84.5107 24.3842 84.0356 25.1563C83.5689 25.92 82.7544 26.3018 81.5919 26.3018Z"
          fill="#23216E"
          className="ccompli2"
        ></path>{" "}
        <path
          d="M95.9998 29.3818C97.3744 29.3818 98.5835 29.0763 99.6271 28.4654C100.679 27.846 101.498 26.9933 102.083 25.9073C102.677 24.8127 102.974 23.5527 102.974 22.1273C102.974 20.7103 102.682 19.4588 102.096 18.3727C101.511 17.2782 100.692 16.4212 99.6398 15.8018C98.5962 15.1824 97.3828 14.8727 95.9998 14.8727C94.6422 14.8727 93.4416 15.1782 92.398 15.7891C91.3544 16.4 90.5356 17.2527 89.9416 18.3473C89.3477 19.4333 89.0507 20.6933 89.0507 22.1273C89.0507 23.5442 89.3392 24.8 89.9162 25.8945C90.5016 26.9806 91.3162 27.8333 92.3598 28.4527C93.4035 29.0721 94.6168 29.3818 95.9998 29.3818ZM95.9998 26.1491C94.9222 26.1491 94.1034 25.7885 93.5434 25.0673C92.9919 24.3376 92.7162 23.3576 92.7162 22.1273C92.7162 20.9309 92.9792 19.9636 93.5053 19.2254C94.0398 18.4788 94.8713 18.1054 95.9998 18.1054C97.0944 18.1054 97.9174 18.4703 98.4689 19.2C99.0289 19.9297 99.3089 20.9054 99.3089 22.1273C99.3089 23.3067 99.0331 24.2739 98.4816 25.0291C97.9386 25.7757 97.1113 26.1491 95.9998 26.1491Z"
          fill="#23216E"
          className="ccompli2"
        ></path>{" "}
        <path
          d="M104.5 13.3454H107.962V10.2909H104.5V13.3454ZM104.5 29H107.962V15.2545H104.5V29Z"
          fill="#23216E"
          className="ccompli2"
        ></path>{" "}
        <path
          d="M110.225 35.1091H113.712V28.5036C114.162 28.7836 114.658 29 115.201 29.1527C115.753 29.3054 116.351 29.3818 116.996 29.3818C118.26 29.3818 119.368 29.0636 120.318 28.4273C121.268 27.7909 122.006 26.9254 122.532 25.8309C123.067 24.7363 123.334 23.5018 123.334 22.1273C123.334 20.7273 123.063 19.4842 122.52 18.3982C121.985 17.3036 121.23 16.4424 120.254 15.8145C119.278 15.1867 118.133 14.8727 116.818 14.8727C116.105 14.8727 115.452 14.9745 114.858 15.1782C114.272 15.3733 113.746 15.6533 113.28 16.0182V15.2545H110.225V35.1091ZM116.436 26.3018C115.282 26.3018 114.468 25.92 113.992 25.1563C113.517 24.3842 113.28 23.3745 113.28 22.1273C113.28 20.88 113.513 19.8745 113.98 19.1109C114.455 18.3388 115.231 17.9527 116.309 17.9527C117.081 17.9527 117.713 18.1436 118.205 18.5254C118.706 18.8988 119.075 19.4036 119.312 20.04C119.55 20.6679 119.669 21.3636 119.669 22.1273C119.669 22.8994 119.554 23.6036 119.325 24.24C119.096 24.8679 118.744 25.3685 118.269 25.7418C117.794 26.1151 117.183 26.3018 116.436 26.3018Z"
          fill="#23216E"
          className="ccompli2"
        ></path>{" "}
        <path
          d="M129.606 29.3818C131.404 29.3818 132.813 28.9788 133.831 28.1727C134.849 27.3666 135.358 26.2594 135.358 24.8509C135.358 23.7818 135.027 22.9376 134.366 22.3182C133.712 21.6988 132.601 21.1854 131.031 20.7782C129.962 20.5066 129.164 20.286 128.638 20.1163C128.121 19.9467 127.777 19.7812 127.607 19.62C127.446 19.4588 127.366 19.2594 127.366 19.0218C127.366 18.623 127.556 18.3176 127.938 18.1054C128.329 17.8933 128.842 17.8085 129.478 17.8509C130.827 17.9527 131.566 18.5297 131.693 19.5818L135.231 18.9454C135.053 17.6982 134.442 16.7097 133.398 15.98C132.355 15.2418 131.023 14.8727 129.402 14.8727C127.739 14.8727 126.411 15.263 125.418 16.0436C124.426 16.8242 123.929 17.8763 123.929 19.2C123.929 20.2521 124.273 21.0836 124.96 21.6945C125.647 22.297 126.831 22.8145 128.511 23.2473C129.504 23.5103 130.233 23.7224 130.7 23.8836C131.175 24.0448 131.481 24.2103 131.616 24.38C131.752 24.5412 131.82 24.7576 131.82 25.0291C131.82 25.4618 131.65 25.8012 131.311 26.0473C130.972 26.2848 130.488 26.4036 129.86 26.4036C129.096 26.4036 128.464 26.2212 127.964 25.8563C127.472 25.4915 127.153 24.9867 127.009 24.3418L123.471 24.8763C123.7 26.3103 124.345 27.4218 125.406 28.2109C126.475 28.9915 127.875 29.3818 129.606 29.3818Z"
          fill="#23216E"
          className="ccompli2"
        ></path>{" "}
        <path
          d="M141.744 29.4073C142.737 29.4073 143.602 29.2418 144.341 28.9109C145.079 28.58 145.698 28.1388 146.199 27.5873V29H149.253V15.2545H145.766V22.2291C145.766 23.0776 145.668 23.7648 145.473 24.2909C145.287 24.8085 145.045 25.203 144.748 25.4745C144.451 25.7376 144.133 25.9157 143.793 26.0091C143.454 26.1024 143.136 26.1491 142.839 26.1491C142.101 26.1491 141.528 25.9836 141.121 25.6527C140.722 25.3218 140.433 24.9103 140.255 24.4182C140.077 23.926 139.971 23.4382 139.937 22.9545C139.903 22.4624 139.886 22.0594 139.886 21.7454V15.2545H136.373V22.9673C136.373 23.1963 136.39 23.5612 136.424 24.0618C136.458 24.5624 136.556 25.1182 136.717 25.7291C136.878 26.3315 137.145 26.9127 137.519 27.4727C137.901 28.0327 138.431 28.4951 139.11 28.86C139.788 29.2248 140.667 29.4073 141.744 29.4073Z"
          fill="#23216E"
          className="ccompli2"
        ></path>{" "}
        <path
          d="M151.258 29H154.745V20.6763C154.745 19.8873 154.961 19.2467 155.394 18.7545C155.835 18.2539 156.416 18.0036 157.138 18.0036C157.893 18.0036 158.483 18.2582 158.907 18.7673C159.339 19.2679 159.556 19.9721 159.556 20.88V29H163.018V20.6763C163.018 19.8873 163.234 19.2467 163.667 18.7545C164.108 18.2539 164.689 18.0036 165.41 18.0036C166.166 18.0036 166.755 18.2582 167.179 18.7673C167.612 19.2679 167.829 19.9721 167.829 20.88V29H171.29V19.9636C171.29 18.4618 170.887 17.2485 170.081 16.3236C169.284 15.3903 168.1 14.9236 166.53 14.9236C165.648 14.9236 164.838 15.1145 164.099 15.4963C163.361 15.8782 162.772 16.4 162.33 17.0618C161.974 16.417 161.465 15.8994 160.803 15.5091C160.141 15.1188 159.318 14.9236 158.334 14.9236C157.502 14.9236 156.739 15.0891 156.043 15.42C155.347 15.7424 154.77 16.1879 154.312 16.7563V15.2545H151.258V29Z"
          fill="#23216E"
          className="ccompli2"
        ></path>{" "}
        <path
          d="M20 0C8.9543 0 0 8.9543 0 20C11.0457 20 20 11.0457 20 0Z"
          fill="#45D2B0"
          className="ccustom"
        ></path>{" "}
        <path
          d="M20 40C31.0457 40 40 31.0457 40 20C28.9543 20 20 28.9543 20 40Z"
          fill="#45D2B0"
          className="ccustom"
        ></path>{" "}
        <path
          d="M20 0C31.0457 0 40 8.9543 40 20C28.9543 20 20 11.0457 20 0Z"
          fill="#23216E"
          className="ccompli2"
        ></path>{" "}
        <path
          d="M20 40C8.9543 40 -9.65645e-07 31.0457 0 20C11.0457 20 20 28.9543 20 40Z"
          fill="#23216E"
          className="ccompli2"
        ></path>{" "}
      </svg>
    </PlaceholderLogo>
  );
};

const Two = () => {
  return (
    <PlaceholderLogo>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="40"
        height="40"
        fill="none"
        viewBox="0 0 40 40"
      >
        <path
          fill="#F06225"
          d="M20 0c11.046 0 20 8.954 20 20v14a6 6 0 0 1-6 6H21v-8.774c0-2.002.122-4.076 1.172-5.78a10 10 0 0 1 6.904-4.627l.383-.062a.8.8 0 0 0 0-1.514l-.383-.062a10 10 0 0 1-8.257-8.257l-.062-.383a.8.8 0 0 0-1.514 0l-.062.383a9.999 9.999 0 0 1-4.627 6.904C12.85 18.878 10.776 19 8.774 19H.024C.547 8.419 9.29 0 20 0Z"
        ></path>
        <path
          fill="#F06225"
          d="M0 21h8.774c2.002 0 4.076.122 5.78 1.172a10.02 10.02 0 0 1 3.274 3.274C18.878 27.15 19 29.224 19 31.226V40H6a6 6 0 0 1-6-6V21ZM40 2a2 2 0 1 1-4 0 2 2 0 0 1 4 0Z"
        ></path>
      </svg>
    </PlaceholderLogo>
  );
};

const Three = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="82"
      height="40"
      fill="none"
      viewBox="0 0 82 40"
    >
      <path
        fill="#FFD43D"
        d="M73.365 19.71c0 2.904-2.241 5.31-5.27 5.31-3.03 0-5.228-2.406-5.228-5.31 0-2.905 2.199-5.312 5.228-5.312s5.27 2.407 5.27 5.311Z"
      ></path>
      <path
        fill="#FF0C81"
        d="M48.764 19.544c0 2.946-2.323 5.145-5.27 5.145-2.904 0-5.227-2.2-5.227-5.145 0-2.947 2.323-5.104 5.228-5.104 2.946 0 5.27 2.158 5.27 5.104Z"
      ></path>
      <path
        fill="#11EEFC"
        d="M20.074 25.02c3.029 0 5.27-2.406 5.27-5.31 0-2.905-2.241-5.312-5.27-5.312-3.03 0-5.228 2.407-5.228 5.311 0 2.905 2.199 5.312 5.228 5.312Z"
      ></path>
      <path
        fill="#171A26"
        d="M68.095 30.54c-6.307 0-11.12-4.897-11.12-10.872 0-5.934 4.855-10.83 11.12-10.83 6.349 0 11.162 4.938 11.162 10.83 0 5.975-4.855 10.871-11.162 10.871Zm0-5.52c3.03 0 5.27-2.406 5.27-5.31 0-2.905-2.24-5.312-5.27-5.312-3.029 0-5.228 2.407-5.228 5.311 0 2.905 2.199 5.312 5.228 5.312ZM43.08 40c-4.813 0-8.506-2.116-10.373-5.934l4.896-2.655c.913 1.784 2.614 3.195 5.394 3.195 3.486 0 5.85-2.448 5.85-6.473v-.374c-1.12 1.411-3.111 2.49-6.016 2.49-5.768 0-10.373-4.481-10.373-10.581 0-5.934 4.813-10.788 11.12-10.788 6.431 0 11.162 4.605 11.162 10.788v8.299C54.74 35.27 49.76 40 43.08 40Zm.415-15.311c2.946 0 5.27-2.2 5.27-5.145 0-2.947-2.324-5.104-5.27-5.104-2.905 0-5.228 2.158-5.228 5.104s2.323 5.145 5.228 5.145ZM20.074 30.54c-6.307 0-11.12-4.897-11.12-10.872 0-5.934 4.854-10.83 11.12-10.83 6.348 0 11.162 4.938 11.162 10.83 0 5.975-4.855 10.871-11.162 10.871Zm0-5.52c3.029 0 5.27-2.406 5.27-5.31 0-2.905-2.241-5.312-5.27-5.312-3.03 0-5.228 2.407-5.228 5.311 0 2.905 2.199 5.312 5.228 5.312ZM0 0h5.892v30H0V0ZM82 6.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0Z"
      ></path>
    </svg>
  );
};

const Four = () => {
  return (
    <svg
      id="logo-46"
      className="gradient"
      width="123"
      height="61"
      viewBox="0 0 123 61"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {" "}
      <path
        d="M0.036377 54H11.3891V50.7673H3.4982V35.6727H0.036377V54Z"
        fill="#333268"
        className="cneutral"
      ></path>{" "}
      <path
        d="M18.2113 54.3818C19.5859 54.3818 20.795 54.0763 21.8386 53.4654C22.8907 52.846 23.7095 51.9933 24.295 50.9073C24.8889 49.8127 25.1859 48.5527 25.1859 47.1273C25.1859 45.7103 24.8931 44.4588 24.3077 43.3727C23.7222 42.2782 22.9034 41.4212 21.8513 40.8018C20.8077 40.1824 19.5944 39.8727 18.2113 39.8727C16.8537 39.8727 15.6531 40.1782 14.6095 40.7891C13.5659 41.4 12.7471 42.2527 12.1531 43.3473C11.5592 44.4333 11.2622 45.6933 11.2622 47.1273C11.2622 48.5442 11.5507 49.8 12.1277 50.8945C12.7131 51.9806 13.5277 52.8333 14.5713 53.4527C15.615 54.0721 16.8283 54.3818 18.2113 54.3818ZM18.2113 51.1491C17.1337 51.1491 16.315 50.7885 15.755 50.0673C15.2034 49.3376 14.9277 48.3576 14.9277 47.1273C14.9277 45.9309 15.1907 44.9636 15.7168 44.2254C16.2513 43.4788 17.0828 43.1054 18.2113 43.1054C19.3059 43.1054 20.1289 43.4703 20.6804 44.2C21.2404 44.9297 21.5204 45.9054 21.5204 47.1273C21.5204 48.3067 21.2447 49.2739 20.6931 50.0291C20.1501 50.7757 19.3228 51.1491 18.2113 51.1491Z"
        fill="#333268"
        className="cneutral"
      ></path>{" "}
      <path
        d="M32.0319 54.3818C32.6768 54.3818 33.2707 54.3054 33.8138 54.1527C34.3653 54 34.8659 53.7836 35.3156 53.5036V54.8909C35.3326 55.4 35.201 55.8242 34.921 56.1636C34.6495 56.5115 34.2847 56.7703 33.8265 56.94C33.3683 57.1182 32.8804 57.2073 32.3629 57.2073C31.8792 57.2073 31.4295 57.1012 31.0138 56.8891C30.6065 56.677 30.2925 56.3673 30.0719 55.96L26.8647 57.5127C27.3907 58.4036 28.1416 59.1206 29.1174 59.6636C30.0932 60.2151 31.1665 60.4909 32.3374 60.4909C33.3471 60.4909 34.2847 60.3551 35.1501 60.0836C36.0156 59.8206 36.7453 59.4176 37.3392 58.8745C37.9416 58.3315 38.3532 57.64 38.5738 56.8C38.6501 56.503 38.701 56.2018 38.7265 55.8963C38.7604 55.5994 38.7774 55.2812 38.7774 54.9418V40.2545H35.7483V41.0182C35.2816 40.6533 34.7513 40.3733 34.1574 40.1782C33.5719 39.9745 32.9229 39.8727 32.2101 39.8727C30.895 39.8727 29.7495 40.1867 28.7738 40.8145C27.798 41.4424 27.0386 42.3036 26.4956 43.3982C25.961 44.4842 25.6938 45.7273 25.6938 47.1273C25.6938 48.5018 25.9568 49.7363 26.4829 50.8309C27.0174 51.9254 27.7598 52.7909 28.7101 53.4273C29.6604 54.0636 30.7677 54.3818 32.0319 54.3818ZM32.5919 51.3018C31.8453 51.3018 31.2344 51.1151 30.7592 50.7418C30.2841 50.3685 29.9319 49.8679 29.7029 49.24C29.4738 48.6036 29.3592 47.8994 29.3592 47.1273C29.3592 46.3636 29.478 45.6679 29.7156 45.04C29.9532 44.4036 30.318 43.8988 30.8101 43.5254C31.3107 43.1436 31.9471 42.9527 32.7192 42.9527C33.8053 42.9527 34.5816 43.3388 35.0483 44.1109C35.515 44.8745 35.7483 45.88 35.7483 47.1273C35.7483 48.3745 35.5107 49.3842 35.0356 50.1563C34.5689 50.92 33.7544 51.3018 32.5919 51.3018Z"
        fill="#333268"
        className="cneutral"
      ></path>{" "}
      <path
        d="M46.9998 54.3818C48.3744 54.3818 49.5835 54.0763 50.6271 53.4654C51.6792 52.846 52.498 51.9933 53.0835 50.9073C53.6774 49.8127 53.9744 48.5527 53.9744 47.1273C53.9744 45.7103 53.6816 44.4588 53.0962 43.3727C52.5107 42.2782 51.6919 41.4212 50.6398 40.8018C49.5962 40.1824 48.3828 39.8727 46.9998 39.8727C45.6422 39.8727 44.4416 40.1782 43.398 40.7891C42.3544 41.4 41.5356 42.2527 40.9416 43.3473C40.3477 44.4333 40.0507 45.6933 40.0507 47.1273C40.0507 48.5442 40.3392 49.8 40.9162 50.8945C41.5016 51.9806 42.3162 52.8333 43.3598 53.4527C44.4035 54.0721 45.6168 54.3818 46.9998 54.3818ZM46.9998 51.1491C45.9222 51.1491 45.1034 50.7885 44.5434 50.0673C43.9919 49.3376 43.7162 48.3576 43.7162 47.1273C43.7162 45.9309 43.9792 44.9636 44.5053 44.2254C45.0398 43.4788 45.8713 43.1054 46.9998 43.1054C48.0944 43.1054 48.9174 43.4703 49.4689 44.2C50.0289 44.9297 50.3089 45.9054 50.3089 47.1273C50.3089 48.3067 50.0331 49.2739 49.4816 50.0291C48.9386 50.7757 48.1113 51.1491 46.9998 51.1491Z"
        fill="#333268"
        className="cneutral"
      ></path>{" "}
      <path
        d="M55.5004 38.3454H58.9622V35.2909H55.5004V38.3454ZM55.5004 54H58.9622V40.2545H55.5004V54Z"
        fill="#333268"
        className="cneutral"
      ></path>{" "}
      <path
        d="M61.2251 60.1091H64.7124V53.5036C65.1621 53.7836 65.6585 54 66.2015 54.1527C66.753 54.3054 67.3512 54.3818 67.996 54.3818C69.2603 54.3818 70.3676 54.0636 71.3179 53.4273C72.2682 52.7909 73.0063 51.9254 73.5324 50.8309C74.0669 49.7363 74.3342 48.5018 74.3342 47.1273C74.3342 45.7273 74.0627 44.4842 73.5197 43.3982C72.9851 42.3036 72.23 41.4424 71.2542 40.8145C70.2785 40.1867 69.133 39.8727 67.8179 39.8727C67.1051 39.8727 66.4518 39.9745 65.8578 40.1782C65.2724 40.3733 64.7463 40.6533 64.2797 41.0182V40.2545H61.2251V60.1091ZM67.436 51.3018C66.2821 51.3018 65.4676 50.92 64.9924 50.1563C64.5172 49.3842 64.2797 48.3745 64.2797 47.1273C64.2797 45.88 64.513 44.8745 64.9797 44.1109C65.4548 43.3388 66.2312 42.9527 67.3088 42.9527C68.0809 42.9527 68.713 43.1436 69.2051 43.5254C69.7057 43.8988 70.0748 44.4036 70.3124 45.04C70.55 45.6679 70.6688 46.3636 70.6688 47.1273C70.6688 47.8994 70.5542 48.6036 70.3251 49.24C70.096 49.8679 69.7439 50.3685 69.2688 50.7418C68.7936 51.1151 68.1827 51.3018 67.436 51.3018Z"
        fill="#333268"
        className="cneutral"
      ></path>{" "}
      <path
        d="M80.6056 54.3818C82.4044 54.3818 83.8128 53.9788 84.831 53.1727C85.8492 52.3666 86.3583 51.2594 86.3583 49.8509C86.3583 48.7818 86.0274 47.9376 85.3656 47.3182C84.7122 46.6988 83.6007 46.1854 82.031 45.7782C80.9619 45.5066 80.1644 45.286 79.6383 45.1163C79.1207 44.9467 78.7771 44.7812 78.6074 44.62C78.4462 44.4588 78.3656 44.2594 78.3656 44.0218C78.3656 43.623 78.5565 43.3176 78.9383 43.1054C79.3286 42.8933 79.8419 42.8085 80.4783 42.8509C81.8274 42.9527 82.5656 43.5297 82.6928 44.5818L86.231 43.9454C86.0529 42.6982 85.4419 41.7097 84.3983 40.98C83.3547 40.2418 82.0225 39.8727 80.4019 39.8727C78.7389 39.8727 77.411 40.263 76.4183 41.0436C75.4256 41.8242 74.9292 42.8763 74.9292 44.2C74.9292 45.2521 75.2728 46.0836 75.9601 46.6945C76.6474 47.297 77.831 47.8145 79.511 48.2473C80.5038 48.5103 81.2335 48.7224 81.7001 48.8836C82.1753 49.0448 82.4807 49.2103 82.6165 49.38C82.7522 49.5412 82.8201 49.7576 82.8201 50.0291C82.8201 50.4618 82.6504 50.8012 82.311 51.0473C81.9716 51.2848 81.488 51.4036 80.8601 51.4036C80.0965 51.4036 79.4644 51.2212 78.9638 50.8563C78.4716 50.4915 78.1535 49.9867 78.0092 49.3418L74.471 49.8763C74.7001 51.3103 75.345 52.4218 76.4056 53.2109C77.4747 53.9915 78.8747 54.3818 80.6056 54.3818Z"
        fill="#333268"
        className="cneutral"
      ></path>{" "}
      <path
        d="M92.7442 54.4073C93.7369 54.4073 94.6024 54.2418 95.3406 53.9109C96.0788 53.58 96.6982 53.1388 97.1988 52.5873V54H100.253V40.2545H96.766V47.2291C96.766 48.0776 96.6685 48.7648 96.4733 49.2909C96.2866 49.8085 96.0448 50.203 95.7478 50.4745C95.4509 50.7376 95.1327 50.9157 94.7933 51.0091C94.4539 51.1024 94.1357 51.1491 93.8388 51.1491C93.1006 51.1491 92.5278 50.9836 92.1206 50.6527C91.7218 50.3218 91.4333 49.9103 91.2551 49.4182C91.0769 48.926 90.9709 48.4382 90.9369 47.9545C90.903 47.4624 90.886 47.0594 90.886 46.7454V40.2545H87.3733V47.9673C87.3733 48.1963 87.3903 48.5612 87.4242 49.0618C87.4581 49.5624 87.5557 50.1182 87.7169 50.7291C87.8782 51.3315 88.1454 51.9127 88.5188 52.4727C88.9006 53.0327 89.4309 53.4951 90.1097 53.86C90.7885 54.2248 91.6666 54.4073 92.7442 54.4073Z"
        fill="#333268"
        className="cneutral"
      ></path>{" "}
      <path
        d="M102.258 54H105.745V45.6763C105.745 44.8873 105.961 44.2467 106.394 43.7545C106.835 43.2539 107.416 43.0036 108.138 43.0036C108.893 43.0036 109.483 43.2582 109.907 43.7673C110.339 44.2679 110.556 44.9721 110.556 45.88V54H114.018V45.6763C114.018 44.8873 114.234 44.2467 114.667 43.7545C115.108 43.2539 115.689 43.0036 116.41 43.0036C117.166 43.0036 117.755 43.2582 118.179 43.7673C118.612 44.2679 118.829 44.9721 118.829 45.88V54H122.29V44.9636C122.29 43.4618 121.887 42.2485 121.081 41.3236C120.284 40.3903 119.1 39.9236 117.53 39.9236C116.648 39.9236 115.838 40.1145 115.099 40.4963C114.361 40.8782 113.772 41.4 113.33 42.0618C112.974 41.417 112.465 40.8994 111.803 40.5091C111.141 40.1188 110.318 39.9236 109.334 39.9236C108.502 39.9236 107.739 40.0891 107.043 40.42C106.347 40.7424 105.77 41.1879 105.312 41.7563V40.2545H102.258V54Z"
        fill="#333268"
        className="cneutral"
      ></path>{" "}
      <path
        d="M-6.39719e-07 14.5C6.0374e-08 6.49187 6.49187 1.6959e-06 14.5 2.39599e-06C18.8417 2.77556e-06 22.7378 1.90824 25.3952 4.93177C30.2168 10.345 34.2038 10.0602 38.4379 6.06395C40.5154 4.10244 43.3173 2.9 46.4 2.9C52.8065 2.90001 58 8.0935 58 14.5C58 20.9065 52.8065 26.1 46.4 26.1C43.3173 26.1 40.5154 24.8975 38.4379 22.936C34.2048 18.9407 30.2187 18.655 25.3987 24.0642C22.7412 27.0901 18.8436 29 14.5 29C6.49187 29 -1.33981e-06 22.5081 -6.39719e-07 14.5Z"
        fill="#F2F5FA"
      ></path>{" "}
      <path
        d="M-6.39719e-07 14.5C6.0374e-08 6.49187 6.49187 1.6959e-06 14.5 2.39599e-06C18.8417 2.77556e-06 22.7378 1.90824 25.3952 4.93177C30.2168 10.345 34.2038 10.0602 38.4379 6.06395C40.5154 4.10244 43.3173 2.9 46.4 2.9C52.8065 2.90001 58 8.0935 58 14.5C58 20.9065 52.8065 26.1 46.4 26.1C43.3173 26.1 40.5154 24.8975 38.4379 22.936C34.2048 18.9407 30.2187 18.655 25.3987 24.0642C22.7412 27.0901 18.8436 29 14.5 29C6.49187 29 -1.33981e-06 22.5081 -6.39719e-07 14.5Z"
        fill="url(#paint0_linear_1422_596)"
      ></path>{" "}
      <path
        d="M-6.39719e-07 14.5C6.0374e-08 6.49187 6.49187 1.6959e-06 14.5 2.39599e-06C18.8417 2.77556e-06 22.7378 1.90824 25.3952 4.93177C30.2168 10.345 34.2038 10.0602 38.4379 6.06395C40.5154 4.10244 43.3173 2.9 46.4 2.9C52.8065 2.90001 58 8.0935 58 14.5C58 20.9065 52.8065 26.1 46.4 26.1C43.3173 26.1 40.5154 24.8975 38.4379 22.936C34.2048 18.9407 30.2187 18.655 25.3987 24.0642C22.7412 27.0901 18.8436 29 14.5 29C6.49187 29 -1.33981e-06 22.5081 -6.39719e-07 14.5Z"
        fill="url(#paint1_linear_1422_596)"
      ></path>{" "}
      <path
        d="M-6.39719e-07 14.5C6.0374e-08 6.49187 6.49187 1.6959e-06 14.5 2.39599e-06C18.8417 2.77556e-06 22.7378 1.90824 25.3952 4.93177C30.2168 10.345 34.2038 10.0602 38.4379 6.06395C40.5154 4.10244 43.3173 2.9 46.4 2.9C52.8065 2.90001 58 8.0935 58 14.5C58 20.9065 52.8065 26.1 46.4 26.1C43.3173 26.1 40.5154 24.8975 38.4379 22.936C34.2048 18.9407 30.2187 18.655 25.3987 24.0642C22.7412 27.0901 18.8436 29 14.5 29C6.49187 29 -1.33981e-06 22.5081 -6.39719e-07 14.5Z"
        fill="url(#paint2_radial_1422_596)"
      ></path>{" "}
      <path
        d="M-6.39719e-07 14.5C6.0374e-08 6.49187 6.49187 1.6959e-06 14.5 2.39599e-06C18.8417 2.77556e-06 22.7378 1.90824 25.3952 4.93177C30.2168 10.345 34.2038 10.0602 38.4379 6.06395C40.5154 4.10244 43.3173 2.9 46.4 2.9C52.8065 2.90001 58 8.0935 58 14.5C58 20.9065 52.8065 26.1 46.4 26.1C43.3173 26.1 40.5154 24.8975 38.4379 22.936C34.2048 18.9407 30.2187 18.655 25.3987 24.0642C22.7412 27.0901 18.8436 29 14.5 29C6.49187 29 -1.33981e-06 22.5081 -6.39719e-07 14.5Z"
        fill="url(#paint3_radial_1422_596)"
      ></path>{" "}
      <path
        d="M-6.39719e-07 14.5C6.0374e-08 6.49187 6.49187 1.6959e-06 14.5 2.39599e-06C18.8417 2.77556e-06 22.7378 1.90824 25.3952 4.93177C30.2168 10.345 34.2038 10.0602 38.4379 6.06395C40.5154 4.10244 43.3173 2.9 46.4 2.9C52.8065 2.90001 58 8.0935 58 14.5C58 20.9065 52.8065 26.1 46.4 26.1C43.3173 26.1 40.5154 24.8975 38.4379 22.936C34.2048 18.9407 30.2187 18.655 25.3987 24.0642C22.7412 27.0901 18.8436 29 14.5 29C6.49187 29 -1.33981e-06 22.5081 -6.39719e-07 14.5Z"
        fill="url(#paint4_radial_1422_596)"
      ></path>{" "}
      <defs>
        {" "}
        <linearGradient
          id="paint0_linear_1422_596"
          x1="43.6961"
          y1="21.7069"
          x2="10.3036"
          y2="-4.24328"
          gradientUnits="userSpaceOnUse"
        >
          {" "}
          <stop className="ccustom" stop-color="#FF557E"></stop>{" "}
          <stop
            className="ccompli1"
            offset="0.841052"
            stop-color="#FF5555"
            stop-opacity="0"
          ></stop>{" "}
        </linearGradient>{" "}
        <linearGradient
          id="paint1_linear_1422_596"
          x1="14.5023"
          y1="27.0553"
          x2="23.4238"
          y2="-3.84997"
          gradientUnits="userSpaceOnUse"
        >
          {" "}
          <stop className="ccompli1" stop-color="#58CCDC"></stop>{" "}
          <stop
            className="ccompli1"
            offset="1"
            stop-color="#58CCDC"
            stop-opacity="0"
          ></stop>{" "}
        </linearGradient>{" "}
        <radialGradient
          id="paint2_radial_1422_596"
          cx="0"
          cy="0"
          r="1"
          gradientUnits="userSpaceOnUse"
          gradientTransform="translate(45.4879 35.041) rotate(-122.928) scale(37.051 30.3393)"
        >
          {" "}
          <stop className="ccompli2" stop-color="#8263DB"></stop>{" "}
          <stop
            offset="0.568731"
            stop-color="#8172DA"
            stop-opacity="0.26"
          ></stop>{" "}
          <stop
            className="ccompli2"
            offset="1"
            stop-color="#8172DA"
            stop-opacity="0"
          ></stop>{" "}
        </radialGradient>{" "}
        <radialGradient
          id="paint3_radial_1422_596"
          cx="0"
          cy="0"
          r="1"
          gradientUnits="userSpaceOnUse"
          gradientTransform="translate(18.3021 -4.19503) rotate(77.6745) scale(24.9567 39.2264)"
        >
          {" "}
          <stop className="ccompli1" stop-color="#41D1B7"></stop>{" "}
          <stop
            className="ccompli1"
            offset="0.492704"
            stop-color="#41D1B7"
            stop-opacity="0.35"
          ></stop>{" "}
          <stop
            className="ccompli1"
            offset="1"
            stop-color="#41D1B7"
            stop-opacity="0"
          ></stop>{" "}
        </radialGradient>{" "}
        <radialGradient
          id="paint4_radial_1422_596"
          cx="0"
          cy="0"
          r="1"
          gradientUnits="userSpaceOnUse"
          gradientTransform="translate(59.6446 -10.7446) rotate(125.113) scale(27.1121 57.4261)"
        >
          {" "}
          <stop className="ccompli2" stop-color="#FFEC45"></stop>{" "}
          <stop
            className="ccompli2"
            offset="0.549191"
            stop-color="#FFEC45"
            stop-opacity="0.3"
          ></stop>{" "}
          <stop
            className="ccompli2"
            offset="0.961144"
            stop-color="#FFEC45"
            stop-opacity="0"
          ></stop>{" "}
        </radialGradient>{" "}
      </defs>{" "}
    </svg>
  );
};

const Five = () => {
  return (
    <svg
      id="logo-15"
      width="49"
      height="48"
      viewBox="0 0 49 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {" "}
      <path
        d="M24.5 12.75C24.5 18.9632 19.4632 24 13.25 24H2V12.75C2 6.53679 7.03679 1.5 13.25 1.5C19.4632 1.5 24.5 6.53679 24.5 12.75Z"
        className="ccustom"
        fill="#17CF97"
      ></path>{" "}
      <path
        d="M24.5 35.25C24.5 29.0368 29.5368 24 35.75 24H47V35.25C47 41.4632 41.9632 46.5 35.75 46.5C29.5368 46.5 24.5 41.4632 24.5 35.25Z"
        className="ccustom"
        fill="#17CF97"
      ></path>{" "}
      <path
        d="M2 35.25C2 41.4632 7.03679 46.5 13.25 46.5H24.5V35.25C24.5 29.0368 19.4632 24 13.25 24C7.03679 24 2 29.0368 2 35.25Z"
        className="ccustom"
        fill="#17CF97"
      ></path>{" "}
      <path
        d="M47 12.75C47 6.53679 41.9632 1.5 35.75 1.5H24.5V12.75C24.5 18.9632 29.5368 24 35.75 24C41.9632 24 47 18.9632 47 12.75Z"
        className="ccustom"
        fill="#17CF97"
      ></path>{" "}
    </svg>
  );
};

PlaceholderLogo.One = One;
PlaceholderLogo.Two = Two;
PlaceholderLogo.Three = Three;
PlaceholderLogo.Four = Four;
PlaceholderLogo.Five = Five;
