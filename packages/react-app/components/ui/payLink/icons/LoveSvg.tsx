import React, { ComponentProps } from "react";

const LoveSvg = (props: ComponentProps<"svg">) => {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 121 129" fill="none">
      <g clip-path="url(#clip0_361_22724)">
        <path
          d="M68.527 46.7215C69.5005 45.9537 70.323 45.2769 71.1751 44.6387C76.7918 40.4291 82.9067 37.1746 89.7176 35.312C92.6614 34.5107 95.6976 34.1592 98.5948 35.3471C101.281 36.4486 104.135 37.2576 106.469 39.1221C110.612 42.4322 112.406 46.6682 111.694 51.9282C111.003 56.9954 109.001 61.5319 106.216 65.7611C103.346 70.1327 99.7979 73.9246 96.0683 77.5589C84.0797 89.246 70.0616 97.7033 54.2963 103.346C49.7214 104.984 45.0056 106.103 40.1064 106.27C38.7942 106.315 37.4755 106.206 36.1583 106.179C35.2878 106.162 34.414 106.121 33.5435 106.172C31.7012 106.267 30.4149 105.077 30.4293 103.237C30.4299 103.15 30.4305 103.062 30.4307 102.973C30.5464 100.79 30.3646 98.5992 29.8904 96.461C28.8305 91.5858 28.6088 86.6103 28.3081 81.6495C27.8475 74.0464 27.4813 66.4362 27.6409 58.8183C27.8043 50.9447 28.8903 43.222 31.4359 35.7492C33.4952 29.7059 36.5634 24.1718 40.0511 18.8701C41.8871 16.0742 43.8642 13.3772 46.3457 11.1001C49.0071 8.66392 51.9997 6.82134 55.6629 6.32251C62.4593 5.39517 68.703 9.25593 71.1485 15.8796C72.9998 20.8869 73.2833 26.0607 72.7619 31.2935C72.2514 36.4263 70.8539 41.3289 68.7716 46.0371C68.6981 46.2052 68.6456 46.387 68.527 46.7215ZM36.3385 101.338C37.916 100.711 39.3459 100.112 40.8025 99.5698C47.7407 96.9696 54.5815 94.1564 61.1411 90.7028C70.5079 85.772 79.1818 79.8896 86.6572 72.3679C88.6706 70.343 90.7247 68.3402 92.2091 65.8538C93.7527 63.2886 95.0612 60.5891 96.1187 57.7876C96.8367 55.8634 97.5705 53.9408 97.6457 51.8498C97.708 50.1063 97.0997 48.6791 95.6205 47.6682C94.2859 46.7553 92.7693 46.4327 91.2 46.3055C87.9517 46.0478 84.9251 46.9101 82.0197 48.2042C77.0591 50.4201 72.564 53.411 68.1134 56.4854C66.1416 57.8488 64.2723 59.3037 63.057 61.4282C62.7606 61.9367 62.4195 62.4222 62.093 62.9116C61.1246 64.3606 59.4712 64.7867 57.9444 63.9833C56.5434 63.2395 56.2025 62.088 56.9111 60.3373C57.7968 58.1437 58.5625 55.9302 58.6628 53.5261C58.7065 52.5016 58.8799 51.4829 58.9978 50.4622C59.5508 45.7076 60.1387 40.9613 60.179 36.1553C60.1983 33.6068 60.0751 31.0694 59.1308 28.6528C58.3773 26.7221 57.1376 26.3834 55.6885 27.8389C54.4273 29.1093 53.2771 30.4843 52.2499 31.9494C49.6617 35.6345 47.9844 39.7686 46.7673 44.0784C43.5384 55.584 40.9732 67.2683 39.0844 79.0742C38.09 85.2207 37.2793 91.3985 36.4406 97.569C36.2761 98.7719 36.3679 100.004 36.3385 101.338ZM61.9817 44.3646L62.0745 44.3838C62.1052 44.2864 62.1453 44.1914 62.1686 44.0911C63.2483 39.4191 63.7452 34.6925 63.3081 29.895C63.063 27.197 62.5264 24.5582 61.3467 22.0893C60.1669 19.6204 58.1777 18.6293 55.5153 19.1001C53.8458 19.3939 52.4383 20.2167 51.1371 21.2426C48.9767 22.9452 47.3555 25.1076 45.8981 27.4035C42.2442 33.1425 40.109 39.4601 38.8184 46.1017C37.5657 52.5604 37.1216 59.1005 36.93 65.6665C36.8619 68.018 36.8216 70.3691 36.7677 72.7198C36.8987 72.5664 36.9831 72.3789 37.0111 72.1789C37.821 68.219 38.5656 64.2452 39.4513 60.3022C41.071 53.0984 42.6848 45.8866 45.1642 38.9154C46.527 35.0849 48.2676 31.4323 50.9657 28.3483C52.159 26.989 53.4888 25.755 54.9347 24.6654C56.4912 23.4925 58.1249 23.6982 59.5803 24.9546C59.9257 25.2592 60.2415 25.5957 60.5233 25.9595C61.8515 27.644 62.3829 29.6228 62.5813 31.7033C62.959 35.5877 62.5464 39.4378 62.0984 43.2856L61.9817 44.3646ZM68.8346 39.0518L68.9983 39.0699C69.4157 36.3787 69.9352 33.6986 70.2298 30.9874C70.7004 26.6233 70.4545 22.2847 69.1305 18.0566C68.2922 15.3664 66.9743 12.9535 64.6882 11.1946C60.7713 8.17572 55.4977 8.06968 51.1926 10.8892C49.1935 12.1971 47.5498 13.8867 46.0734 15.7376C43.4468 19.0453 41.28 22.671 39.1833 26.3286C36.0764 31.743 33.7075 37.4465 32.5204 43.6142C31.3044 49.9154 31.0606 56.2824 31.1402 62.6847C31.1475 62.7496 31.1614 62.8136 31.1817 62.8758C31.2725 62.6481 31.3202 62.4053 31.3223 62.1597C31.6016 56.5188 32.0785 50.9006 33.1384 45.3552C34.8269 36.5437 37.9157 28.333 43.4903 21.1949C45.5822 18.5162 47.9578 16.1532 51.092 14.692C54.7661 12.9705 58.4708 12.7811 62.0801 14.8848C64.6545 16.3853 66.1396 18.7895 67.1812 21.4875C68.5345 24.9937 69.0249 28.6586 69.0529 32.3771C69.0686 34.5954 68.9146 36.8241 68.8352 39.0507L68.8346 39.0518ZM106.516 44.1729C106.536 44.2973 106.549 44.4217 106.58 44.5426C107.058 46.4617 107.171 48.4508 106.912 50.4065C106.364 54.6205 104.619 58.3635 102.421 61.9206C96.8731 70.8982 89.6899 78.3672 81.2163 84.635C73.6691 90.2183 65.4747 94.6747 56.8374 98.3435C50.646 100.974 44.4023 103.474 37.798 104.953C37.7374 104.976 37.6804 105.008 37.6285 105.047C37.9378 105.114 38.2564 105.126 38.5689 105.081C45.9816 104.394 52.9576 102.23 59.6782 99.1587C70.3009 94.3105 79.8855 87.9044 88.5957 80.192C93.6762 75.6958 98.5456 70.99 102.476 65.4185C105.332 61.3719 107.398 56.9744 108.234 52.0494C108.714 49.2189 108.304 46.5627 106.517 44.1736L106.516 44.1729ZM100.978 50.6333C101.438 48.1703 101.198 45.6498 99.7655 43.3292C98.6929 41.5918 97.1176 40.528 95.0578 40.4973C93.7657 40.4701 92.4772 40.6207 91.2287 40.9449C85.3152 42.5295 80.0102 45.3518 75.1136 48.9659C75.0344 49.0374 74.9627 49.1165 74.8994 49.2022C75.2552 49.0773 75.5957 48.9135 75.9149 48.7138C79.18 46.8312 82.5005 45.066 86.1745 44.0819C88.9852 43.3304 91.8254 43.0058 94.677 43.9047C97.375 44.755 99.4235 46.3526 100.418 49.0916L100.978 50.6333Z"
          fill="#D9FC99"
        />
      </g>
      <defs>
        <clipPath id="clip0_361_22724">
          <rect width="81" height="101" fill="white" transform="translate(50.8604) rotate(30.2365)" />
        </clipPath>
      </defs>
    </svg>
  );
};

export default LoveSvg;