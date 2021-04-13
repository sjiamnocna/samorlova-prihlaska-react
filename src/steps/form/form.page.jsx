import React, { useContext, useEffect } from "react";

import { FormContext } from "../../context/form.context";

import FormInput from "../../components/form-input/form-input.comp";
import Checkbox from "../../components/form-checkbox/form-checkbox.comp";

const FormItem = ({ children }) => <div className="form-item">{children}</div>;

const FormPage = () => {
  const { credentials, setCredentials } = useContext(FormContext);
  useEffect(() => {});
  return (
    <div class="form-content">
      <div class="form-group double">
        <FormItem>
          <FormInput
            value={credentials.name}
            onChange={(e) => setCredentials("name", e.target.value)}
            label="Jméno"
          />
        </FormItem>
        <FormItem>
          <FormInput
            value={credentials.sname}
            onChange={(e) => setCredentials("sname", e.target.value)}
            label="Příjmení"
          />
        </FormItem>
      </div>
      <div class="form-group double">
        <FormItem>
          <FormInput
            value={credentials.mail}
            onChange={(e) => setCredentials("mail", e.target.value)}
            label="E-mailová adresa"
          />
        </FormItem>
        <FormItem>
          <FormInput
            value={credentials.byear}
            onChange={(e) => setCredentials("byear", e.target.value)}
            label="Rok narození"
          />
        </FormItem>
      </div>
      <div class="form-group double">
        <FormItem>
          <FormInput
            value={credentials.street}
            onChange={(e) => setCredentials("street", e.target.value)}
            label="Ulice"
          />
        </FormItem>
        <FormItem>
          <FormInput
            value={credentials.streetNo}
            onChange={(e) => setCredentials("streetNo", e.target.value)}
            label="Č.P."
          />
        </FormItem>
      </div>
      <div class="form-group double">
        <FormItem>
          <FormInput
            value={credentials.postcode}
            onChange={(e) => setCredentials("postcode", e.target.value)}
            label="PSČ"
          />
        </FormItem>
        <FormItem>
          <FormInput
            value={credentials.town}
            onChange={(e) => setCredentials("town", e.target.value)}
            label="Město"
          />
        </FormItem>
      </div>
      <div class="form-group double">
        <FormItem>
          <FormInput
            textarea
            value={credentials.note}
            onChange={(e) => setCredentials("note", e.target.value)}
            label="Poznámka k přihlášce"
          />
        </FormItem>
        <FormItem>
          <Checkbox
            label="Tralala"
            onChange={(e) => setCredentials("accomodation", e.target.checked)}
            checked={credentials.accomodation}
          />
        </FormItem>
      </div>
    </div>
  );
};

export default FormPage;
