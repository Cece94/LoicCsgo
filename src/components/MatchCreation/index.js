import React, {useState} from "react";
import { Form, Field, withTypes } from 'react-final-form'
import {Button, Divider} from 'semantic-ui-react'
import './matchCreation.scss'

function MatchCreation(){

  async function onSubmit () {
 
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
          
          return errors
        }}
        render={({ handleSubmit, form, submitting, pristine, values }) => (
          <form className="matchForm" onSubmit={handleSubmit}>          
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
            <div className="submitDiv">
              <Button type="submit" color='teal' style={{padding:0, width: 6.5+"em", height:2.5+"em"}} onClick={onSubmit}>
                <a>
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

      <pre></pre>
    </div>
  );
}

export default MatchCreation;