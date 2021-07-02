import React, { useContext } from "react";

import { FormContext } from "../../context/form.context";

import FormInput from "../../components/form-input/form-input.comp";
import Checkbox from "../../components/form-checkbox/form-checkbox.comp";
import RegistrationItems from "../../components/registration-items/registration-items";
import FormItem from "../../components/form-item/form-item.comp";
import ErrorMessages from "../../components/error-pane/error-pane.comp";

const FormPage = () => {
  const { credentials, setCredentials, donation, setDonation, messages, dataCorrect } =
    useContext(FormContext);
  return (
    <div className="form-content">
      <div id="credentials">
        <div className="form-group double">
          <FormItem>
            <FormInput
              value={credentials.name[0]}
              error={credentials.name[1]}
              onChange={(e) => setCredentials("name", e.target.value)}
              label="Jméno"
            />
          </FormItem>
          <FormItem>
            <FormInput
              value={credentials.sname[0]}
              error={credentials.sname[1]}
              onChange={(e) => setCredentials("sname", e.target.value)}
              label="Příjmení"
            />
          </FormItem>
        </div>
        <div className="form-group double">
          <FormItem>
            <FormInput
              value={credentials.mail[0]}
              error={credentials.mail[1]}
              onChange={(e) => setCredentials("mail", e.target.value)}
              label="E-mailová adresa"
            />
          </FormItem>
          <FormItem>
            <FormInput
              value={credentials.byear[0]}
              error={credentials.byear[1]}
              onChange={(e) => setCredentials("byear", e.target.value)}
              label="Rok narození"
            />
          </FormItem>
        </div>
        <div className="form-group double">
          <FormItem>
            <FormInput
              value={credentials.street[0]}
              error={credentials.street[1]}
              onChange={(e) => setCredentials("street", e.target.value)}
              label="Ulice"
            />
          </FormItem>
          <FormItem>
            <FormInput
              value={credentials.streetNo[0]}
              error={credentials.streetNo[1]}
              onChange={(e) => setCredentials("streetNo", e.target.value)}
              label="Č.P."
            />
          </FormItem>
        </div>
        <div className="form-group double">
          <FormItem>
            <FormInput
              value={credentials.postcode[0]}
              error={credentials.postcode[1]}
              onChange={(e) => setCredentials("postcode", e.target.value)}
              label="PSČ"
            />
          </FormItem>
          <FormItem>
            <FormInput
              value={credentials.town[0]}
              error={credentials.town[1]}
              onChange={(e) => setCredentials("town", e.target.value)}
              label="Město"
            />
          </FormItem>
        </div>
        <div className="form-group double">
          <FormItem>
            <FormInput
              textarea
              value={credentials.note[0]}
              error={credentials.note[1]}
              onChange={(e) => setCredentials("note", e.target.value)}
              label="Poznámka k přihlášce"
            />
          </FormItem>
          <div className="optional">
            <FormItem className="checkboxed">
              <Checkbox
                checked={credentials.accomodation[0] ?? 0}
                onChange={(e) =>
                  setCredentials("accomodation", e.target.checked)
                }
                label="Potřebuju ubytování"
              />

              <Checkbox
                checked={credentials.vegetarian[0] ?? 0}
                onChange={(e) => setCredentials("vegetarian", e.target.checked)}
                label="Jsem vegetarián"
              />

              <Checkbox
                className='donation'
                checked={donation !== null}
                onChange={(e) => {
                  if (e.target.checked) {
                    setDonation(50);
                  } else {
                    setDonation(null);
                  }
                }}
                label="Chci přispět na organizaci samu"
              >
                {
                  donation !== null ?
                    <FormInput
                      label='částkou'
                      value={donation}
                      type="number"
                      onChange={e => setDonation(Number(e.target.value))}
                      inline
                    /> : null
                }
              </Checkbox>
            </FormItem>
          </div>
        </div>
      </div>
      {!dataCorrect ? <ErrorMessages messages={messages} /> : null}
      <RegistrationItems />
    </div>
  );
};

export default FormPage;