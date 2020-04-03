import React, { useState, useEffect } from "react";
import './mainContent.scss';
import { render } from "@testing-library/react";
import MatchCreation from '../MatchCreation';
import TeamCreation from '../TeamCreation'
import * as d3 from "d3";

function MainContent ({isMatchActive}) {

  function showSplash(e){


    

    let x = e.screenX;
    let y = e.screenY;
    d3.select('.mainContainer').append("div")
      .attr("class", "test")
      .style("top",y - 150 + "px")
      .style("left",x - 45 + "px")
      
  //  document.getElementsByClassName('mainContainer').appendChild(test);
  }

  return(
    <div className="mainContainer" onClick={showSplash.bind(this)}>
      {isMatchActive ? <MatchCreation></MatchCreation> : <TeamCreation></TeamCreation>} 
    </div>
  );
}

export default MainContent;