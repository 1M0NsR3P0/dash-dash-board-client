import React, { useEffect, useState } from 'react';

const FirstLoading = () => {


  return (
    <div style={{ width: "100%", height: "100vh", display: "flex", justifyContent: "center", alignItems: "center" }} className='loader-container relative'>
      <div className='flex relative' style={{ gap: "35px", fontSize: "25px" }}>
        <h1>Dash</h1>
        <h1>Dash</h1>
        <h1>Board</h1>
      </div>
      <div className='flex'>
        <h1 className='anime' style={{ fontSize: "45px" }}>-</h1>
        <h1 className='anime2' style={{ fontSize: "45px" }}>-</h1>
      </div>
      <img src="/loading.png" alt="" className='rotate'  style={{width:"45px", marginLeft:"-20px"}}/>
    </div>
  );
};

export default FirstLoading;
