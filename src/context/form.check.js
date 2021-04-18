const checkDetails = {
    name: {
        regex: /^([A-ZŠČŘŽ][a-zěščřžýáíé]+ ?)+$/,
        errorMessage: "Používejte české znaky, první písmeno jména by mělo být velké. Více jmen oddělte mezerou"
    },
    sname: {
        regex: /^([A-ZŠČŘŽ][a-zěščřžýáíé]+ ?)+$/,
        errorMessage: "Používejte české znaky, první písmeno jména by mělo být velké. Více jmen oddělte mezerou"
    },
    mail: {
        regex: /^([a-zA-Z0-9_.+-])+@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,8})+$/,
        errorMessage: "Zadejte prosím platnou e-mailovou adresu"
    },
    byear:{
        regex: /^([\d]{4}){1}$/,
        errorMessage: "Rok narození, 4 čísla"
    },
    street: {
        regex: /^([A-ZŠČŘŽ\d][a-zěščřžýáíé \d.]{2,})+$/,
        errorMessage: "Používejte české znaky, první písmeno by mělo být velké."
    },
    streetNo: {
        regex: /^([\d/]+)$/,
        errorMessage: "Zadávejte pouze čísla, číslo orientační můžete oddělit lomítkem /"
    },
    postcode: {
        regex: /^([\d]{3} ?[\d]{2,3})$/,
        errorMessage: "Poštovní směrovací číslo ve tvaru <nobr>123 45(6)</nobr>"
    },
    town: {
        regex: /^([A-ZŠČŘŽ][a-zěščřžýáíé\d-]+ ?)+$/,
        errorMessage: "Používejte prosím pouze znaky české abecedy, mezeru anebo pomlčku. Název by měl začít velkým písmenem"
    },
    vegetarian: {},
    accomodation: {},
    note: {}
};

export default checkDetails;