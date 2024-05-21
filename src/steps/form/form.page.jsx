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
              type="date"
              value={credentials.bdate[0]}
              error={credentials.bdate[1]}
              onChange={(e) => {
                // calculate age from date and check the person is 18yrs old
                const age = new Date().getFullYear() - Number(e.target.value);
                if (age < 18) {
                  // TODO: change action
                  alert("Nemáte 18 let, bude potřeba zajistit si potvrzení od zákonného zástupce.");
                }

                setCredentials("bdate", e.target.value)
              }}
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
          {!dataCorrect ? <ErrorMessages messages={messages} /> : null}
        </div>
        <div className="form-group double">
          <FormItem>
            <FormInput
              textarea
              value={credentials.foodrestrict[0]}
              error={credentials.foodrestrict[1]}
              onChange={(e) => setCredentials("foodrestrict", e.target.value)}
              label="Omezení stravy"
            />
          </FormItem>
          <div className="optional">
            <FormItem className="checkboxed">
              <Checkbox
                checked={credentials.accomodation[0] ?? 0}
                onChange={(e) =>
                  setCredentials("accomodation", e.target.checked)
                }
                label="Potřebuji ubytování"
              />

              <Checkbox
                className='donation'
                checked={donation !== null}
                onChange={(e) => {
                  if (e.target.checked) {
                    setDonation(0);
                  } else {
                    setDonation(null);
                  }
                }}
                label="Chci přispět na organizaci SAMu"
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
      <RegistrationItems />
    </div>
  );
};

export default FormPage;
