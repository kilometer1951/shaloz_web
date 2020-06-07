import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import Header from "components/Header";
import StarterHeader from "components/StarterComponents/StarterHeader";
import HomeSection from "components/Home/HomeSection";
import HomeSection2 from "components/Home/HomeSection2";
import Footer from "components/Footer";
import { useSelector, useDispatch } from "react-redux";

const Home = (props) => {
  const user = useSelector((state) => state.auth.user);

  return (
    <div>
      <Header history={props.history}/>
      {Object.entries(user).length === 0 ? (
        <StarterHeader />
      ) : (
        <div style={{fontFamily:"poppins_extra_light", marginLeft:"6%", marginTop:"1%", fontSize:45, marginBottom:20}}>
          <p>Welcome back, {user.first_name}!</p>
        </div>
      )}

      <HomeSection history={props.history}/>
      <HomeSection2 />
      <Footer />
    </div>
  );
};

export default Home;
