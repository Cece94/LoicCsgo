import React, { useState } from "react";
import './header.scss';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
//import { faTumblr, faTwitter } from '@fortawesome/free-brands-svg-icons'
// import { faPoop, faKiwiBird } from '@fortawesome/free-solid-svg-icons'
import MainContent from '../MainContent'
import * as d3 from "d3";

function Header () {

    const [isMatchActive, setMatchActive] = useState(true);
    const [isTeamActive, setTeamActive] = useState(false);

    function activateMatchMenu() {
      setMatchActive(true);
      setTeamActive(false);
    };
    function activateTeamMenu() {
      setTeamActive(true);
      setMatchActive(false);
    };

    function removePaint(){
      d3.selectAll(".test").remove();
    }

  return(
    <div>
      <div className="mainHeader">
        {/* <FontAwesomeIcon id="icon-drone" className="iconPoop" icon={faKiwiBird}></FontAwesomeIcon> */}
        
        <div>
            <div onClick={removePaint}>
              <svg id="icon-fan" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 25.812 25.812">
                  <path className="wing" d="M13.908 7.875c.878-3.251-.979-5.329-3.473-5.091-1.176.115-2.355 1.62-1.631 2.99.679 1.284 2.1 1.165 2.535 2.629.406-.556 1.213-1.181 2.569-.528zM10.728 9.912c-3.255.865-4.127 3.512-2.673 5.553.686.961 2.58 1.23 3.404-.083.772-1.229-.041-2.4 1.009-3.509-.682-.074-1.628-.459-1.74-1.961zM14.082 11.648c2.376 2.385 5.104 1.817 6.145-.462.489-1.075-.225-2.851-1.774-2.907-1.45-.055-2.058 1.235-3.543.881.278.627.417 1.639-.828 2.488z" fill="#ea3970"/>
                  <path d="M12.911 1.113c4.794 0 8.694 3.902 8.694 8.699 0 4.796-3.902 8.698-8.698 8.699-4.797-.001-8.7-3.903-8.7-8.699 0-4.797 3.902-8.699 8.701-8.699h.003M12.91 0h-.002-.002C7.488 0 3.093 4.394 3.093 9.813c0 5.417 4.396 9.812 9.813 9.813 5.416-.001 9.812-4.396 9.812-9.813C22.719 4.392 18.324 0 12.91 0z" fill="#2a2a31"/>
                  <circle cx="12.906" cy="9.812" r="1.296" fill="#2a2a31"/>
                  <path d="M14.906 20.812s-.379.313-2 .313-2-.313-2-.313c0 2.001-4 2.344-4 4v1h12v-1c0-1.656-4-1.999-4-4z" fill="#2a2a31"/></svg>

            </div>
            <h2>csgo matchmaking</h2>
        </div>
        <div className="headerMenu">
          <div className={`menu1 ${isMatchActive? "active" : null}`} onClick={activateMatchMenu}><span> Créer un Match</span></div>
          <div className={`menu2 ${isTeamActive? "active" : null}`}  onClick={activateTeamMenu}><span> Créer une Team</span></div>
        </div>

        
      </div>
      <MainContent isMatchActive={isMatchActive}></MainContent>
    </div>
  );
}

export default Header;