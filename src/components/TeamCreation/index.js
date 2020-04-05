import React, {useState} from "react";
import './teamCreation.scss';
import { Form, Field, withTypes } from 'react-final-form'
import {Button, Divider} from 'semantic-ui-react'

function TeamCreation () {

  const [teamString, setTeamString] = useState("");
  const [fileName, setFileName] = useState("data.cfg");
  const [download, setDownload]= useState("");
  const [isFilled, setIsFilled] = useState(false);
  //const [allPlayers, setPlayers] = useState({});
 //  const test = value => (value ? undefined : 'RequiredTEST')
// // // const mustBeNumber = value => (isNaN(value) ? 'Must be a number' : undefined)
// // // const minValue = min => value =>
// // //   isNaN(value) || value >= min ? undefined : `Should be greater than ${min}`
// // // const composeValidators = (...validators) => value =>
// // //   validators.reduce((error, validator) => error || validator(value), undefined)

  async function onSubmit () {
 
    setFileName(JSON.parse(teamString).team.name + ".cfg");
    setDownload("data:text/json;charset=utf-8," + encodeURIComponent(teamString));
    console.log(download)
    
  // el.setAttribute("href", "data:"+data);
  // el.setAttribute("download", "data.json");
  }

  function updateValues(data){
     let players = {
       [data.playerOne] : data.playerOne? "": undefined,
       [data.playerTwo] : data.playerTwo? "": undefined,
       [data.playerThree] : data.playerThree? "": undefined,
       [data.playerFour] : data.playerFour? "": undefined,
       [data.playerFive] : data.playerFive? "": undefined
     }

    let dataTeam = {
      name : data.teamName? data.teamName : undefined,
      tag: data.tag? data.tag : undefined,
      flag: data.flag? data.flag : undefined,
      logo: data.logo? data.logo: undefined
    }
    
    dataTeam.players = (Object.keys(players).length > 0) && Object.keys(players) != "undefined"? players : undefined;

    let team = {};
    team.team = dataTeam;
    setTeamString(JSON.stringify(team,0, 2).slice(1,-1));
    //setTeamString(JSON.stringify(team,0, 2));

  }




  return (
    <div className="teamCreationContainer">
      <Form
        onSubmit = {onSubmit}
        validate={values => {
          const errors = {}
          if (!values.teamName) {
            errors.teamName = 'Required'
          }
          if (!values.tag) {
            errors.tag = 'Required'
          }   
          if (!values.flag) {
            errors.flag = 'Required'
          }   
          if (!values.logo) {
            errors.logo = 'Required'
          }
          if (!values.playerOne) {
            errors.playerOne = 'Required'
          }
          if (!values.playerTwo) {
            errors.playerTwo = 'Required'
          }
          if (!values.playerThree) {
            errors.playerThree = 'Required'
          }
          if (!values.playerFour) {
            errors.playerFour = 'Required'
          }
          if (!values.playerFive) {
            errors.playerFive = 'Required'
          }
          updateValues(values);
          
          (Object.keys(errors).length > 0) ? setIsFilled(false): setIsFilled(true);

          return errors
        }}
        render={({ handleSubmit, form, submitting, pristine, values }) => (
          <form className="teamForm" onSubmit={handleSubmit}>

            <Field name = "teamName">
            {({ input, meta }) => (
              <div className="field">
                <div className="ui input"><input type="text" {...input} placeholder="Team name" /></div>
                {meta.error && meta.touched && <div className="errorMessage"><span>{meta.error}</span></div>}
              </div>
            )}
            </Field>
            <Field name = "tag">
            {({ input, meta }) => (
              <div className="field">
                <div className="ui input"><input type="text" {...input} placeholder="Tag" /></div>
                {meta.error && meta.touched && <div className="errorMessage"><span>{meta.error}</span></div>}
              </div>
            )}
            </Field>
            <Field name = "flag">
            {({ input, meta }) => (
              <div className="field">
                <div className="ui input"><input type="text" {...input} placeholder="Flag" /></div>
                {meta.error && meta.touched && <div className="errorMessage"><span>{meta.error}</span></div>}
              </div>
            )}
            </Field>
            <Field name = "logo">
            {({ input, meta }) => (
              <div className="field">
                <div className="ui input"><input type="text" {...input} placeholder="logo" /></div>
                {meta.error && meta.touched && <div className="errorMessage"><span>{meta.error}</span></div>}
              </div>
            )}
            </Field>
            <div className="teamMembers">
              <Field name = "playerOne">
              {({ input, meta }) => (
                <div className="field">
                  <div className="ui left icon input">
                    <input {...input} type="text" placeholder="Player name" />
                    <i aria-hidden="true" className="users icon"></i>
                  </div>
                  {meta.error && meta.touched && <div className="errorMessage"><span>{meta.error}</span></div>}
                </div>
              )}
              </Field>
              <Field name = "playerTwo">
            {({ input, meta }) => (
              <div className="field">
                <div className="ui left icon input">
                    <input {...input} type="text" placeholder="Player name" />
                    <i aria-hidden="true" className="users icon"></i>
                </div>
                {meta.error && meta.touched && <div className="errorMessage"><span>{meta.error}</span></div>}
              </div>
            )}
            </Field>
            <Field name = "playerThree" >
            {({ input, meta }) => (
              <div className="field">
                <div className="ui left icon input">
                    <input {...input} type="text" placeholder="Player name" />
                    <i aria-hidden="true" className="users icon"></i>
                </div>
                {meta.error && meta.touched && <div className="errorMessage"><span>{meta.error}</span></div>}
              </div>
            )}
            </Field>
            <Field name = "playerFour">
            {({ input, meta }) => (
              <div className="field">
                <div className="ui left icon input">
                    <input {...input} type="text" placeholder="Player name" />
                    <i aria-hidden="true" className="users icon"></i>
                </div>
                {meta.error && meta.touched && <div className="errorMessage"><span>{meta.error}</span></div>}
              </div>
            )}
            </Field>
            <Field name = "playerFive">
            {({ input, meta }) => (
              <div className="field">
                <div className="ui left icon input">
                    <input {...input} type="text" placeholder="Player name" />
                    <i aria-hidden="true" className="users icon"></i>
                </div>
                {meta.error && meta.touched && <div className="errorMessage"><span>{meta.error}</span></div>}
              </div>
            )}
            </Field>
            </div>
            <div className="submitDiv">
              <Button type="submit" color='teal' style={{padding:0, width: 6.5+"em", height:2.5+"em"}} onClick={onSubmit}  disabled={!isFilled}>
                <a download={fileName} href={download}>
                  Download
                </a>
              </Button>
                <Button 
                primary
                  type="button"
                  onClick={form.reset}
                  disabled={submitting || pristine}
                >
                  Reset
                </Button>
            </div>
          </form>
        )}
      />
      <Divider vertical >To</Divider>

      <pre>{teamString}</pre>
    </div>
  );
}

export default TeamCreation;