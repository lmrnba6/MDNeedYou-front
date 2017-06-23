import LocalizedStrings from 'react-localization';
import fr from './fr.json';
import en from './en.json';
import dz from './ar.json';

let local = new LocalizedStrings({
            fr: fr,
            dz: dz,
            gb: en
        });

export default local;