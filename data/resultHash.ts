export const resultHash = {
    'Podváha': {
        range: "< 18.5 kg/m2",
        text: "Máte podváhu \n",
        color: "#FD7F20"
    },

    'Normální': {
        range: "18.5 and 24.9 kg/m2",
        text: "Máte normální váhu \n Výborná práce!",
        color: "#00A300"
    },

    'Nadváha': {
        range: "25 and 29.9 kg/m2",
        text: "Nacházíte se v rozsahu mírné nadváhy \n",
        color: "#E9D502"
    },

    'Obezita': {
        range: "> 30 kg/m2",
        text: "Nacházíte se v pásmu obezity \n Měli byste zvážit kroky pro redukci hmotnosti!",
        color: "#FF0000"
    },
    'obézní': {
        range: "97 - 100",
        text: "Nacházíš se v pásmu obezity \n Měl bys zvážit kroky pro redukci hmotnosti!",
        color: "#FF3333" // Almost red
    },
    'nadměrná hmotnost': {
        range: "90 - 97",
        text: "Nacházíš se v pásmu nadměrné hmotnosti \n Bylo by rozumné zvážit kroky pro redukci hmotnosti.",
        color: "#FF5E5B" // Softer red
    },
    'robustní': {
        range: "75 - 90",
        text: "Nacházíš se v pásmu robustní \n Zatím nemáš nadměrnou hmotnost, ale můžeš zvážit kroky pro redukci hmotnosti.",
        color: "#F9F871" // Softer yellow
    },
    'proporcionální': {
        range: "25 - 75",
        text: "Nacházíš se v pásmu proporcionální \n Tvoje hmotnost je v normě. Výborná práce!",
        color: "#60C17B" // Softer green
    },
    'štíhlé': {
        range: "10 - 25",
        text: "Nacházíš se v pásmu štíhlé \n Tvoje hmotnost je mírně nižší než norma.",
        color: "#60C17B" // Softer green
    },
    'hubené': {
        range: "3 - 10",
        text: "Nacházíš se v pásmu hubené \n Tvoje hmotnost je výrazně nižší.",
        color: "#FFA474" // Softer orange
    },
    'extrémně hubené': {
        range: "0 - 3",
        text: "Nacházíš se v pásmu extrémně hubené. Tvoje hmotnost je výrazně nižší. Měl bys zvážit kroky pro zvýšení hmotnosti!",
        color: "#FF5E5B" // Softer red
    },
    'chyba': {
        range: "chyba",
        text: "Nepodařilo se spočítat výsledek kvůli chybě v programu. Omlouváme se!",
        color: "#FF0000" // red
    }
}