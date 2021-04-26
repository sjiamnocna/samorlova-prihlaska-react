const checkDetails = {
    name: {
        regex: /^([A-ZŠČŘŽ][a-zěščřžýáíé]+ ?)+$/,
        errorMessage: "Používejte české znaky, první písmeno jména by mělo být velké. Více jmen oddělte mezerou",
        minimalLength: 3
    },
    sname: {
        regex: /^([A-ZŠČŘŽ][a-zěščřžýáíé]+ ?)+$/,
        errorMessage: "Používejte české znaky, první písmeno jména by mělo být velké. Více jmen oddělte mezerou",
        minimalLength: 3
    },
    mail: {
        regex: /^([a-zA-Z0-9_.+-])+@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,8})+$/,
        errorMessage: "Zadejte prosím platnou e-mailovou adresu",
        minimalLength: 5
    },
    byear:{
        regex: /^([\d]{4}){1}$/,
        errorMessage: "Rok narození, 4 čísla",
        minimalLength: 4
    },
    street: {
        regex: /^([A-ZŠČŘŽ\d][a-zěščřžýáíé \d.]{2,})+$/,
        errorMessage: "Používejte české znaky, první písmeno by mělo být velké.",
        minimalLength: 3
    },
    streetNo: {
        regex: /^([\d/]+)$/,
        errorMessage: "Zadávejte pouze čísla, číslo orientační můžete oddělit lomítkem /",
        minimalLength: 2
    },
    postcode: {
        regex: /^([\d]{3} ?[\d]{2,3})$/,
        errorMessage: "Poštovní směrovací číslo ve tvaru 123 45(6)",
        minimalLength: 5
    },
    town: {
        regex: /^([A-ZŠČŘŽ][a-zěščřžýáíé\d-]+ ?)+$/,
        errorMessage: "Používejte prosím pouze znaky české abecedy, mezeru anebo pomlčku. Název by měl začít velkým písmenem",
        minimalLength: 2
    },
    vegetarian: {},
    accomodation: {},
    note: {}
};

export default checkDetails;