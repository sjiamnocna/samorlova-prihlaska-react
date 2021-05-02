import React, { useContext } from 'react';

import { FormContext } from "../../context/form.context";

import Checkbox from "../../components/form-checkbox/form-checkbox.comp";
import FormItem from '../form-item/form-item.comp';

const RegistrationItems = () => {
    const { formPrices, strava, setStrava, program, setProgram } = useContext(FormContext);
    if (formPrices.length > 0) {
        return (
            <div className="form-group double">
                {formPrices[0] !== undefined ? 
                formPrices.map((item, i) => (
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
                                    key={i + '.' + j}
                                    centered
                                    checked={strava[[i + '.' + j]] ?? 0}
                                    onChange={(e) => setStrava({ ...strava, [i + '.' + j]: e.target.checked })}
                                    label={subitem.title}
                                    price={subitem.price}
                                />
                            )
                            )
                        }
                    </FormItem>
                )) : null}
            </div>
        )
    }
    return null;
};

export default RegistrationItems;