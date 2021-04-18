import React, { useContext, useEffect } from "react";

import { FormContext } from "../../context/form.context";

import FormInput from "../../components/form-input/form-input.comp";
import Checkbox from "../../components/form-checkbox/form-checkbox.comp";

const FormItem = ({ children }) => <div className="form-item">{children}</div>;

const FormPage = () => {
  const { formPrices, credentials, setCredentials, strava, setStrava, program, setProgram } = useContext(FormContext);
  useEffect(() => {});
  return (
    <div className="form-content">
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
        <FormItem>
          <Checkbox
            checked={credentials.accomodation[0] ?? 0}
            onChange={(e) => setCredentials("accomodation", e.target.checked)}
            label="Potřebuju ubytování"
          />

          <Checkbox
            checked={credentials.vegetarian[0] ?? 0}
            onChange={(e) => setCredentials("vegetarian", e.target.checked)}
            label="Jsem vegetarián"
          />
        </FormItem>
      </div>
      <div className="form-group double">
        {formPrices.map((item, i) => (
          <FormItem key={i}>
            <h4>{item.title}</h4>
            <Checkbox
              centered
              checked={program[i] ?? 0}
              onChange={(e) => setProgram(i, e.target.checked)}
              label="Program"
              price={item.price}
            />
            {
              item.options.map((subitem, j) => (
                  <Checkbox
                    key={i+'.'+j}
                    centered
                    checked={strava[[i+'.'+j]] ?? 0}
                    onChange={(e) => setStrava({...strava, [i+'.'+j]: e.target.checked})}
                    label={subitem.title}
                    price={subitem.price}
                  />
                )
              )
            }
          </FormItem>
        ))}
      </div>
    </div>
  );
};

export default FormPage;