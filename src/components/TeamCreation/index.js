import React, { useState, useEffect } from "react";
import "./teamCreation.scss";
import { Form, Field, withTypes, FormSpy } from "react-final-form";
import { Button, Divider } from "semantic-ui-react";

function TeamCreation() {
  const [teamString, setTeamString] = useState("");
  const [fileName, setFileName] = useState("data.json");
  const [download, setDownload] = useState("");
  const [isFilled, setIsFilled] = useState(false);
  const [initialValues, setinitialValues] = useState();
  useEffect(() => {
    console.log("azeaze: ", initialValues);
  }, [initialValues]);

  //const [allPlayers, setPlayers] = useState({});
  //  const test = value => (value ? undefined : 'RequiredTEST')
  // // // const mustBeNumber = value => (isNaN(value) ? 'Must be a number' : undefined)
  // // // const minValue = min => value =>
  // // //   isNaN(value) || value >= min ? undefined : `Should be greater than ${min}`
  // // // const composeValidators = (...validators) => value =>
  // // //   validators.reduce((error, validator) => error || validator(value), undefined)

  async function onSubmit() {
    setFileName(JSON.parse(teamString).team.name + ".json");
    setDownload(
      "data:text/json;charset=utf-8," + encodeURIComponent(teamString)
    );
  }

  function handleImport(teamFile) {
    let jsonFile;
    return new Promise((resolve) => {
      let reader = new FileReader();
      reader.onload = (evt) => {
        let resultText = evt.target.result;
        jsonFile = JSON.parse(resultText);
        setinitialValues(jsonFile.team);
        resolve();
      }; //.bind(this);
      reader.readAsText(teamFile[0]);
    });
  }

  function updateValues(data) {
    let players = {
      [data.playerOne]: data.playerOne ? "" : undefined,
      [data.playerTwo]: data.playerTwo ? "" : undefined,
      [data.playerThree]: data.playerThree ? "" : undefined,
      [data.playerFour]: data.playerFour ? "" : undefined,
      [data.playerFive]: data.playerFive ? "" : undefined,
    };
    if (data.playerOneName && data.playerOne) {
      let key = Object.keys(players).find((value) => value === data.playerOne);
      players[key] = data.playerOneName;
    }
    if (data.playerTwoName && data.playerTwo) {
      let key = Object.keys(players).find((value) => value === data.playerTwo);
      players[key] = data.playerTwoName;
    }
    if (data.playerThreeName && data.playerThree) {
      let key = Object.keys(players).find(
        (value) => value === data.playerThree
      );
      players[key] = data.playerThreeName;
    }
    if (data.playerFourName && data.playerFour) {
      let key = Object.keys(players).find((value) => value === data.playerFour);
      players[key] = data.playerFourName;
    }
    if (data.playerFiveName && data.playerFive) {
      let key = Object.keys(players).find((value) => value === data.playerFive);
      players[key] = data.playerFiveName;
    }

    let dataTeam = {
      name: data.name ? data.name : undefined,
      tag: data.tag ? data.tag : undefined,
      flag: data.flag ? data.flag : undefined,
      logo: data.logo ? data.logo : undefined,
    };

    dataTeam.players =
      Object.keys(players).length > 0 && Object.keys(players) != "undefined"
        ? players
        : undefined;

    let team = new Object({});
    team.team = dataTeam;
    //setTeamString(JSON.stringify(team,0, 2).slice(1,-1));
    setTeamString(JSON.stringify(team, 0, 2));
  }

  return (
    <div className="teamCreationContainer">
      <Form
        initialValues={
          initialValues && {
            ...initialValues,
            playerOne: Object.keys(initialValues.players)[0],
            playerOneName:
              initialValues.players[Object.keys(initialValues.players)[0]],
            playerTwo: Object.keys(initialValues.players)[1],
            playerTwoName:
              initialValues.players[Object.keys(initialValues.players)[1]],
            playerThree: Object.keys(initialValues.players)[2],
            playerThreeName:
              initialValues.players[Object.keys(initialValues.players)[2]],
            playerFour: Object.keys(initialValues.players)[3],
            playerFourName:
              initialValues.players[Object.keys(initialValues.players)[3]],
            playerFive: Object.keys(initialValues.players)[4],
            playerFiveName:
              initialValues.players[Object.keys(initialValues.players)[4]],
          }
        }
        onSubmit={onSubmit}
        validate={(values) => {
          const errors = {};
          const playerErrors = {};
          if (!values.name) {
            errors.name = "Required";
          }
          if (!values.tag) {
            errors.tag = "Required";
          }
          if (!values.flag) {
            errors.flag = "Required";
          }
          if (!values.logo) {
            errors.logo = "Required";
          }
          if (!values.playerOne) {
            playerErrors.playerOne = "Required";
          }
          if (!values.playerTwo) {
            playerErrors.playerTwo = "Required";
          }
          if (!values.playerThree) {
            playerErrors.playerThree = "Required";
          }
          if (!values.playerFour) {
            playerErrors.playerFour = "Required";
          }
          if (!values.playerFive) {
            playerErrors.playerFive = "Required";
          }
          updateValues(values);

          if (Object.keys(errors).length > 0) {
            setIsFilled(false);
          } else {
            if (Object.keys(playerErrors).length < 2) {
              setIsFilled(true);
            }
          }

          return errors;
        }}
        render={({ handleSubmit, form, submitting, pristine, values }) => (
          <form className="teamForm" onSubmit={handleSubmit}>
            <input
              className="importTeam"
              type="file"
              placeholder="Import Team"
              onChange={(e) => {
                handleImport(e.target.files);
              }}
              accept=".json"
            />
            <Field name="name">
              {({ input, meta }) => (
                <div className="field">
                  <div className="ui input">
                    <input type="text" {...input} placeholder="Team name" />
                  </div>
                  {meta.error && meta.touched && (
                    <div className="errorMessage">
                      <span>{meta.error}</span>
                    </div>
                  )}
                </div>
              )}
            </Field>
            <Field name="tag">
              {({ input, meta }) => (
                <div className="field">
                  <div className="ui input">
                    <input type="text" {...input} placeholder="Tag" />
                  </div>
                  {meta.error && meta.touched && (
                    <div className="errorMessage">
                      <span>{meta.error}</span>
                    </div>
                  )}
                </div>
              )}
            </Field>
            <Field name="flag">
              {({ input, meta }) => (
                <div className="field">
                  <div className="ui input">
                    <input type="text" {...input} placeholder="Flag" />
                  </div>
                  {meta.error && meta.touched && (
                    <div className="errorMessage">
                      <span>{meta.error}</span>
                    </div>
                  )}
                </div>
              )}
            </Field>
            <Field name="logo">
              {({ input, meta }) => (
                <div className="field">
                  <div className="ui input">
                    <input type="text" {...input} placeholder="logo" />
                  </div>
                  {meta.error && meta.touched && (
                    <div className="errorMessage">
                      <span>{meta.error}</span>
                    </div>
                  )}
                </div>
              )}
            </Field>
            <div className="teamMembers">
              <div className="teamPlayer">
                <Field name="playerOne">
                  {({ input, meta }) => (
                    <div className="field">
                      <div className="ui left icon input">
                        <input
                          {...input}
                          type="text"
                          placeholder="Player name"
                        />
                        <i aria-hidden="true" className="users icon"></i>
                      </div>
                      {/* {meta.error && meta.touched && <div className="errorMessage"><span>{meta.error}</span></div>} */}
                    </div>
                  )}
                </Field>
                <Field name="playerOneName">
                  {({ input, meta }) => (
                    <div className="ui input">
                      <input {...input} type="text" placeholder="Player name" />
                    </div>
                  )}
                </Field>
              </div>
              <div className="teamPlayer">
                <Field name="playerTwo">
                  {({ input, meta }) => (
                    <div className="field">
                      <div className="ui left icon input">
                        <input
                          {...input}
                          type="text"
                          placeholder="Player name"
                        />
                        <i aria-hidden="true" className="users icon"></i>
                      </div>
                      {/* {meta.error && meta.touched && <div className="errorMessage"><span>{meta.error}</span></div>} */}
                    </div>
                  )}
                </Field>
                <Field name="playerTwoName">
                  {({ input, meta }) => (
                    <div className="ui input">
                      <input {...input} type="text" placeholder="Player name" />
                    </div>
                  )}
                </Field>
              </div>
              <div className="teamPlayer">
                <Field name="playerThree">
                  {({ input, meta }) => (
                    <div className="field">
                      <div className="ui left icon input">
                        <input
                          {...input}
                          type="text"
                          placeholder="Player name"
                        />
                        <i aria-hidden="true" className="users icon"></i>
                      </div>
                      {/* {meta.error && meta.touched && <div className="errorMessage"><span>{meta.error}</span></div>} */}
                    </div>
                  )}
                </Field>
                <Field name="playerThreeName">
                  {({ input, meta }) => (
                    <div className="ui input">
                      <input {...input} type="text" placeholder="Player name" />
                    </div>
                  )}
                </Field>
              </div>
              <div className="teamPlayer">
                <Field name="playerFour">
                  {({ input, meta }) => (
                    <div className="field">
                      <div className="ui left icon input">
                        <input
                          {...input}
                          type="text"
                          placeholder="Player name"
                        />
                        <i aria-hidden="true" className="users icon"></i>
                      </div>
                      {/* {meta.error && meta.touched && <div className="errorMessage"><span>{meta.error}</span></div>} */}
                    </div>
                  )}
                </Field>
                <Field name="playerFourName">
                  {({ input, meta }) => (
                    <div className="ui input">
                      <input {...input} type="text" placeholder="Player name" />
                    </div>
                  )}
                </Field>
              </div>
              <div className="teamPlayer">
                <Field name="playerFive">
                  {({ input, meta }) => (
                    <div className="field">
                      <div className="ui left icon input">
                        <input
                          {...input}
                          type="text"
                          placeholder="Player name"
                        />
                        <i aria-hidden="true" className="users icon"></i>
                      </div>
                      {/* {meta.error && meta.touched && <div className="errorMessage"><span>{meta.error}</span></div>} */}
                    </div>
                  )}
                </Field>
                <Field name="playerFiveName">
                  {({ input, meta }) => (
                    <div className="ui input">
                      <input {...input} type="text" placeholder="Player name" />
                    </div>
                  )}
                </Field>
              </div>
            </div>
            <div className="submitDiv">
              <Button
                type="submit"
                color="teal"
                style={{ padding: 0, width: 6.5 + "em", height: 2.5 + "em" }}
                onClick={onSubmit}
                disabled={!isFilled}
              >
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
            {/* <FormSpy 
              onChange={(props) => {
                console.log("Form validity changed to", props.values);
                console.log("testfileteam: ", teamFile);
                console.log("AAAA", props.values);
              }}
            />*/}
          </form>
        )}
      />

      <Divider vertical>To</Divider>

      <pre>{teamString}</pre>
    </div>
  );
}

export default TeamCreation;
