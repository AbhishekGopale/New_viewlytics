import AsyncStorage from "@react-native-async-storage/async-storage";
import { DB } from "../database";

export const getStoreId = async () => {
  AsyncStorage.getItem(DB.STORE_ID)
    .then((data) => {
      return data;
    })
    .catch((e) => {
      console.log(e);
      return e;
    });
};

export const timeCalculate = (createdTime) => {
  let today = new Date();
  let createdDate = new Date(createdTime);

  var diffMs = today - createdDate;
  var diffYears = Math.floor(diffMs / 31536000000);
  var diffDays = Math.floor(diffMs / 86400000); // days
  var diffMonths = Math.floor(diffDays / 30);
  var diffHrs = Math.floor((diffMs % 86400000) / 3600000); // hours
  var diffMins = Math.round(((diffMs % 86400000) % 3600000) / 60000); // minutes

  if (diffYears >= 2) {
    return `${diffYears} years ago`;
  } else if (diffYears >= 1) {
    return `${diffYears} year ago`;
  } else if (diffMonths >= 6) {
    return `${diffMonths} months ago`;
  } else if (diffMonths >= 1) {
    return `${diffMonths} month ago`;
  } else if (diffDays >= 2) {
    return `${diffDays} days ago`;
  } else if (diffDays >= 1) {
    return `${diffDays} day ago`;
  } else if (diffHrs >= 2) {
    return `${diffHrs} hours ago`;
  } else if (diffHrs >= 1) {
    return `${diffHrs} hour ago`;
  } else if (diffMins >= 2) {
    return `${diffMins} minutes ago`;
  } else if (diffMins >= 1) {
    return `${diffMins} minute ago`;
  } else {
    return "just now";
  }
};
