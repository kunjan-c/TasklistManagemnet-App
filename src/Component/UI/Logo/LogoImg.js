import React from "react";
import MobileFirstLogo from "../../../Assets/dummyLOgo.png";

export default function LogoImg() {
  return (
    <div>
      <img className="logo-img" src={MobileFirstLogo} alt="MobileFirst-Logo"></img>
    </div>
  );
}
