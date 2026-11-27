---
summary: Five brand logo icons resized and switched to a fixed brand color
affectedExports:
  - DuoIcon
  - GoogleAuthIcon
  - OktaVerifyIcon
  - SymantecVipIcon
  - YubikeyIcon
files:
  - packages/core/odyssey-react-mui/src/logos.generated/
commit: 2457134a3
onlyRelevantIf: the consumer renders one of the six brand logos, which also moved to a new entry point
---

Five of the six brand logos, Duo, GoogleAuth, OktaVerify, SymantecVip and Yubikey, changed viewBox from 16 by 16 to 32 by 32, which fixes them rendering cropped, and their fill changed from `currentColor` to a fixed brand colour, so they no longer follow the surrounding text color. Check logo size and color everywhere they appear, particularly against a dark or high-contrast background where inheriting the color previously worked.
