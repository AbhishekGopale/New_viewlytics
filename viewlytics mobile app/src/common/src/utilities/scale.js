import {Dimensions} from 'react-native';

//Screen Constants
//based on iphone X scale
const SCREEN_HEIGHT = 812;
const SCREEN_WIDTH = 375;

const {height, width} = Dimensions.get('window');

/**
 * Function to scale a value based on the size of the screen size and the original
 * size used on the design.
 **/
export default function (units = 1) {
  return (width / SCREEN_WIDTH) * units;
}

const scaleForFont = (units = 1) => (width / SCREEN_WIDTH) * units;
const verticalScale = (size) => (height / SCREEN_HEIGHT) * size;

const HP = (percent = 0) => {
  return Math.round(height * (percent / 100));
};

const WP = (percent = 0) => {
  return Math.round(width * (percent / 100));
};



export {verticalScale, scaleForFont, HP, WP};
