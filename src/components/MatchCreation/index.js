import React, { useState, useEffect } from "react";
import { Form, Field, withTypes } from "react-final-form";
import { Button, Divider, Dropdown } from "semantic-ui-react";
import { auth, db } from "../../firebaseConfig";

import "./matchCreation.scss";

function MatchCreation() {
  const [matchJson, setMatchJson] = useState("");
  const [mapList, setMapList] = useState([]); //used for options of Dropdown (needs to be an array)
  const [mapListObject, setMapListObject] = useState(""); // used for updating the JSON element in preview

  useEffect(() => {
    db.collection("mapList")
      .get()
      .then((snapshot) => {
        let tempMapList = [];
        snapshot.forEach((doc) => {
          let data = {
            key: doc.data().map,
            text: doc.data().map,
            value: doc.data().map,
          };
          tempMapList.push(data);
        });
        setMapList(tempMapList);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  function handleChangeDropdown(e, data) {
    let mapListTemp = {};
    data.value.forEach((map) => {
      mapListTemp[map] = "";
    });
    setMapListObject(mapListTemp);
  }

  async function onSubmit() {}

  function updateValues(values) {
    let data = {
      matchid: values.matchId,
      num_maps: values.numMaps,
      skip_veto: values.skipVeto,
      veto_first: values.vetoFirst,
      side_type: values.sideType,
      players_per_team: values.playersPerTeam,
      min_players_to_ready: values.minPlayersToReady,
      min_spectators_to_ready: values.minSpectatorsToReady,
      team1: values.teamOne,
      team2: values.teamTwo,
      maplist:
        Object.keys(mapListObject).length > 0 ? mapListObject : undefined,
    };
    setMatchJson(JSON.stringify(data, 0, 2));
  }
  return (
    <div className="matchCreationContainer">
      <Form
        onSubmit={onSubmit}
        validate={(values) => {
          const errors = {};
          if (!values.matchId) {
            errors.matchId = "Required";
          }
          if (!values.numMaps) {
            errors.numMaps = "Required";
          }
          if (!values.playersPerTeam) {
            errors.playersPerTeam = "Required";
          }
          if (!values.minPlayersToReady) {
            errors.minPlayersToReady = "Required";
          }
          if (!values.minSpectatorsToReady) {
            errors.minSpectatorsToReady = "Required";
          }
          if (!values.skipVeto) {
            errors.skipVeto = "Required";
          }
          if (!values.vetoFirst) {
            errors.vetoFirst = "Required";
          }
          if (!values.sideType) {
            errors.vetoFirst = "Required";
          }

          updateValues(values);
          return errors;
        }}
        render={({ handleSubmit, form, submitting, pristine, values }) => (
          <form className="matchForm" onSubmit={handleSubmit}>
            <div className="smallInfo">
              <Field name="matchId">
                {({ input, meta }) => (
                  <div className="field">
                    <div className="ui input">
                      <input {...input} type="text" placeholder="Match Id" />
                    </div>
                    {meta.error && meta.touched && (
                      <div className="errorMessage">
                        <span>{meta.error}</span>
                      </div>
                    )}
                  </div>
                )}
              </Field>
              <Field name="numMaps">
                {({ input, meta }) => (
                  <div className="field">
                    <div className="ui input">
                      <input {...input} type="number" placeholder="num Maps" />
                    </div>
                    {meta.error && meta.touched && (
                      <div className="errorMessage">
                        <span>{meta.error}</span>
                      </div>
                    )}
                  </div>
                )}
              </Field>
              <Field name="playersPerTeam">
                {({ input, meta }) => (
                  <div className="field">
                    <div className="ui input">
                      <input
                        {...input}
                        type="number"
                        placeholder="Players per team"
                      />
                    </div>
                    {meta.error && meta.touched && (
                      <div className="errorMessage">
                        <span>{meta.error}</span>
                      </div>
                    )}
                  </div>
                )}
              </Field>
              <Field name="minPlayersToReady">
                {({ input, meta }) => (
                  <div className="field">
                    <div className="ui input">
                      <input
                        {...input}
                        type="number"
                        placeholder="Min players to ready"
                      />
                    </div>
                    {meta.error && meta.touched && (
                      <div className="errorMessage">
                        <span>{meta.error}</span>
                      </div>
                    )}
                  </div>
                )}
              </Field>
              <Field name="minSpectatorsToReady">
                {({ input, meta }) => (
                  <div className="field">
                    <div className="ui input">
                      <input
                        {...input}
                        type="number"
                        placeholder="Min spectators to ready"
                      />
                    </div>
                    {meta.error && meta.touched && (
                      <div className="errorMessage">
                        <span>{meta.error}</span>
                      </div>
                    )}
                  </div>
                )}
              </Field>
              <Field name="skipVeto">
                {({ input, meta }) => (
                  <div className="field">
                    <div className="ui input">
                      <input {...input} type="number" placeholder="Skip veto" />
                    </div>
                    {meta.error && meta.touched && (
                      <div className="errorMessage">
                        <span>{meta.error}</span>
                      </div>
                    )}
                  </div>
                )}
              </Field>
              <Field name="vetoFirst">
                {({ input, meta }) => (
                  <div className="field">
                    <div className="ui input">
                      <input {...input} type="text" placeholder="Veto first" />
                    </div>
                    {meta.error && meta.touched && (
                      <div className="errorMessage">
                        <span>{meta.error}</span>
                      </div>
                    )}
                  </div>
                )}
              </Field>
              <Field name="sideType">
                {({ input, meta }) => (
                  <div className="field">
                    <div className="ui input">
                      <input {...input} type="text" placeholder="side Type" />
                    </div>
                    {meta.error && meta.touched && (
                      <div className="errorMessage">
                        <span>{meta.error}</span>
                      </div>
                    )}
                  </div>
                )}
              </Field>
            </div>

            <Field name="testMapList">
              {({ input, meta }) => (
                <Dropdown
                  placeholder="mapList"
                  fluid
                  multiple
                  selection
                  options={mapList}
                  onChange={handleChangeDropdown}
                />
              )}
            </Field>
            <Field name="teamOne">
              {({ input, meta }) => (
                <div className="field">
                  <div className="ui input">
                    <input {...input} type="text" placeholder="Team 1 Link" />
                  </div>
                  {meta.error && meta.touched && (
                    <div className="errorMessage">
                      <span>{meta.error}</span>
                    </div>
                  )}
                </div>
              )}
            </Field>
            <Field name="teamTwo">
              {({ input, meta }) => (
                <div className="field">
                  <div className="ui input">
                    <input {...input} type="text" placeholder="Team 2 Link" />
                  </div>
                  {meta.error && meta.touched && (
                    <div className="errorMessage">
                      <span>{meta.error}</span>
                    </div>
                  )}
                </div>
              )}
            </Field>
            <h4 class="ui horizontal divider header">
              <i aria-hidden="true" className="users icon"></i>
              Spectators
            </h4>

            <div className="teamMembers">
              <div className="teamPlayer">
                <Field name="playerOne">
                  {({ input, meta }) => (
                    <div className="field">
                      <div className="ui left icon input">
                        <input
                          {...input}
                          type="text"
                          placeholder="Spectator name"
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
                      <input
                        {...input}
                        type="text"
                        placeholder="Spectator name"
                      />
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
              >
                <a>Download</a>
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
      <Divider vertical>To</Divider>

      <pre>{matchJson}</pre>
    </div>
  );
}

export default MatchCreation;
