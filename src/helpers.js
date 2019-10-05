import Cloud from './img/Cloud.jpg';
import Cyber from './img/Cyber.jpeg';
import Mining from './img/Mining.jpg';
import Interaction from './img/Interaction.jpg';
import Database from './img/Database.jpeg';
import Unix from './img/Unix.png';
import iOS from './img/iOS.jpg';
import Lans from './img/Lans.jpg';
import Java from './img/Java.jpeg';

export const checkImg = title => {
  const types = {
    'Cloud Computing': Cloud,
    'Cyber Security': Cyber,
    'Data Mining': Mining,
    'Interaction Design': Interaction,
    Database: Database,
    'Unix Programming': Unix,
    'iOS Development': iOS,
    LANS: Lans,
    Java: Java,
    default: ''
  };
  return types[title] || types.default;
};
