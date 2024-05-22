const checkDetails = {
    name: {
        regex: /^([A-ZÁČĎŇŘŠŤÚÝŽ][a-záéíóúýčďěňřšťžů-]+ ?)+$/,
        errorMessage: "Používejte české znaky, první písmeno jména by mělo být velké. Více jmen oddělte mezerou",
        minimalLength: 2
    },
    sname: {
        regex: /^([A-ZÁČĎŇŘŠŤÚÝŽ][a-záéíóúýčďěňřšťžů-]+ ?)+$/,
        errorMessage: "Používejte české znaky, první písmeno jména by mělo být velké. Více jmen oddělte mezerou",
        minimalLength: 2
    },
    mail: {
        regex: /^([a-zA-Z0-9_.+-])+@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,8})+$/,
        errorMessage: "Zadejte prosím platnou e-mailovou adresu",
        minimalLength: 5
    },
    bdate:{
        errorMessage: "Datum narození ve formátu DD.MM.RRRR",
        minimalLength: 8
    },
    street: {
        regex: /^([A-ZÁČĎŇŘŠŤÚÝŽ\d][a-záéíóúýčďěňřšťžů \d.-]{1,})+$/,
        errorMessage: "Používejte české znaky, první písmeno by mělo být velké.",
        minimalLength: 2
    },
    streetNo: {
        regex: /^([\d/-]+)$/,
        errorMessage: "Zadávejte pouze čísla, číslo orientační můžete oddělit lomítkem /",
        minimalLength: 1
    },
    postcode: {
        regex: /^([\d]{3} ?[\d]{2,3})$/,
        errorMessage: "Poštovní směrovací číslo ve tvaru 123 45(6)",
        minimalLength: 5
    },
    town: {
        regex: /^([A-ZÁČĎŇŘŠŤÚÝŽ][a-záéíóúýčďěňřšťžů\d-]+ ?)+$/,
        errorMessage: "Používejte prosím pouze znaky české abecedy, mezeru anebo pomlčku. Název by měl začít velkým písmenem",
        minimalLength: 2
    },
    accomodation: {
        optional: 1
    },
    foodrestrict: {
        optional: 1
    }
    donation: {
        regex: /^[0-9]\d*$/,
        errorMessage: "Pouze kladná čísla",
        optional: 1
    }
};

export default checkDetails;
