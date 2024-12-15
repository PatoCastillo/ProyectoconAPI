// Array de objetos que contiene los códigos de idiomas y sus respectivos nombres
const languages = [
   {"am-ET": "Amharic"},   // Amárico (Etiopía)
   {"ar-SA": "Arabic"},    // Árabe (Arabia Saudita)
   {"be-BY": "Bielarus"},  // Bielorruso (Bielorrusia)
   {"bem-ZM": "Bemba"},    // Bemba (Zambia)
   {"bi-VU": "Bislama"},   // Bislama (Vanuatu)
   {"bjs-BB": "Bajan"},    // Bajan (Barbados)
   {"bn-IN": "Bengali"},   // Bengalí (India)
   {"bo-CN": "Tibetan"},   // Tibetano (China)
   {"br-FR": "Breton"},    // Bretón (Francia)
   {"bs-BA": "Bosnian"},   // Bosnio (Bosnia y Herzegovina)
   {"ca-ES": "Catalan"},   // Catalán (España)
   {"cop-EG": "Coptic"},   // Copto (Egipto)
   {"cs-CZ": "Czech"},     // Checho (República Checa)
   {"cy-GB": "Welsh"},     // Galés (Reino Unido)
   {"da-DK": "Danish"},    // Danés (Dinamarca)
   {"dz-BT": "Dzongkha"}, // Dzongkha (Bután)
   {"de-DE": "German"},    // Alemán (Alemania)
   {"dv-MV": "Maldivian"}, // Maldivo (Maldivas)
   {"el-GR": "Greek"},     // Griego (Grecia)
   {"en-GB": "English"},   // Inglés (Reino Unido)
   {"es-ES": "Español"},   // Español (España)
   {"et-EE": "Estonian"},  // Estonio (Estonia)
   {"eu-ES": "Basque"},    // Vasco (España)
   {"fa-IR": "Persian"},   // Persa (Irán)
   {"fi-FI": "Finnish"},   // Finés (Finlandia)
   {"fn-FNG": "Fanagalo"}, // Fanagalo (Sudáfrica)
   {"fo-FO": "Faroese"},   // Feroés (Islas Feroe)
   {"fr-FR": "French"},    // Francés (Francia)
   {"gl-ES": "Galician"},  // Gallego (España)
   {"gu-IN": "Gujarati"},  // Gujarati (India)
   {"ha-NE": "Hausa"},     // Hausa (Nigeria)
   {"he-IL": "Hebrew"},    // Hebreo (Israel)
   {"hi-IN": "Hindi"},     // Hindi (India)
   {"hr-HR": "Croatian"},  // Croata (Croacia)
   {"hu-HU": "Hungarian"}, // Húngaro (Hungría)
   {"id-ID": "Indonesian"}, // Indonesio (Indonesia)
   {"is-IS": "Icelandic"}, // Islandés (Islandia)
   {"it-IT": "Italian"},   // Italiano (Italia)
   {"ja-JP": "Japanese"},  // Japonés (Japón)
   {"kk-KZ": "Kazakh"},    // Kazajo (Kazajistán)
   {"km-KM": "Khmer"},     // Jemer (Camboya)
   {"kn-IN": "Kannada"},   // Kannada (India)
   {"ko-KR": "Korean"},    // Coreano (Corea del Sur)
   {"ku-TR": "Kurdish"},   // Kurdo (Turquía)
   {"ky-KG": "Kyrgyz"},    // Kirguís (Kirguistán)
   {"la-VA": "Latin"},     // Latín (Vaticano)
   {"lo-LA": "Lao"},       // Laosiano (Laos)
   {"lv-LV": "Latvian"},   // Letón (Letonia)
   {"men-SL": "Mende"},    // Mende (Sierra Leona)
   {"mg-MG": "Malagasy"},  // Malgache (Madagascar)
   {"mi-NZ": "Maori"},     // Maorí (Nueva Zelanda)
   {"ms-MY": "Malay"},     // Malayo (Malasia)
   {"mt-MT": "Maltese"},   // Maltés (Malta)
   {"my-MM": "Burmese"},   // Birmano (Birmania)
   {"ne-NP": "Nepali"},    // Nepalí (Nepal)
   {"niu-NU": "Niuean"},   // Niueano (Isla Niue)
   {"nl-NL": "Dutch"},     // Neerlandés (Países Bajos)
   {"no-NO": "Norwegian"}, // Noruego (Noruega)
   {"ny-MW": "Nyanja"},    // Nyanja (Malawi)
   {"ur-PK": "Pakistani"}, // Urdu (Pakistán)
   {"pau-PW": "Palauan"},  // Palauano (Palau)
   {"pa-IN": "Panjabi"},   // Panyabí (India)
   {"ps-PK": "Pashto"},    // Pastún (Pakistán)
   {"pis-SB": "Pijin"},    // Pijin (Islas Salomón)
   {"pl-PL": "Polish"},    // Polaco (Polonia)
   {"pt-PT": "Portuguese"}, // Portugués (Portugal)
   {"rn-BI": "Kirundi"},   // Kirundi (Burundi)
   {"ro-RO": "Romanian"},  // Rumano (Rumanía)
   {"ru-RU": "Russian"},   // Ruso (Rusia)
   {"sg-CF": "Sango"},     // Sango (República Centroafricana)
   {"si-LK": "Sinhala"},   // Cingalés (Sri Lanka)
   {"sk-SK": "Slovak"},    // Eslovaco (Eslovaquia)
   {"sm-WS": "Samoan"},    // Samoano (Samoa)
   {"sn-ZW": "Shona"},     // Shona (Zimbabue)
   {"so-SO": "Somali"},    // Somali (Somalia)
   {"sq-AL": "Albanian"},  // Albanés (Albania)
   {"sr-RS": "Serbian"},   // Serbio (Serbia)
   {"sv-SE": "Swedish"},   // Sueco (Suecia)
   {"sw-SZ": "Swahili"},   // Swahili (Suazilandia)
   {"ta-LK": "Tamil"},     // Tamil (Sri Lanka)
   {"te-IN": "Telugu"},    // Telugu (India)
   {"tet-TL": "Tetum"},    // Tetum (Timor-Leste)
   {"tg-TJ": "Tajik"},     // Tayiko (Tayikistán)
   {"th-TH": "Thai"},      // Tailandés (Tailandia)
   {"ti-TI": "Tigrinya"},  // Tigrinya (Eritrea)
   {"tk-TM": "Turkmen"},   // Turcomano (Turkmenistán)
   {"tl-PH": "Tagalog"},   // Tagalo (Filipinas)
   {"tn-BW": "Tswana"},    // Tswana (Botswana)
   {"to-TO": "Tongan"},    // Tongano (Tonga)
   {"tr-TR": "Turkish"},   // Turco (Turquía)
   {"uk-UA": "Ukrainian"}, // Ucraniano (Ucrania)
   {"uz-UZ": "Uzbek"},     // Uzbeco (Uzbekistán)
   {"vi-VN": "Vietnamese"}, // Vietnamita (Vietnam)
   {"wo-SN": "Wolof"},     // Wolof (Senegal)
   {"xh-ZA": "Xhosa"},     // Xhosa (Sudáfrica)
   {"yi-YD": "Yiddish"},   // Yiddish (Judíos)
   {"zu-ZA": "Zulu"}       // Zulú (Sudáfrica)
]

// Exporta el array para que pueda ser usado en otros archivos
export default languages;
