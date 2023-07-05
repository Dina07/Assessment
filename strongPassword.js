// Declare ur password here
const password = "Baaabb0";


function checkPassword(pasWrd) {
  // Number of missing character types (lowercase, uppercase, and digits)
  let types = 3
  // Reg test password string
  if (/[a-z]/.test(pasWrd)) {
    // checking if password contains lowercase
    types--
  }
  if (/[A-Z]/.test(pasWrd)) {
    // checking if password contains uppercase
    types--
  }
  if (/\d/.test(pasWrd)) {
    // checking if password contains digits
    types--
  }
  // Count of repeating characters
  let repeatCount = 0;
  // Count of repeating characters that need to be changed
  let oneRepeatingCount = 0;


  let i = 0;
  while (i < pasWrd.length) {
    if (pasWrd[i] === pasWrd[i + 1] && pasWrd[i + 1] === pasWrd[i + 2]) {
      let contLetter = 2;
      while (i < pasWrd.length && pasWrd[i] === pasWrd[i + 1]) {
        contLetter++;
        i++;
      }
      repeatCount += Math.floor(contLetter / 3);
      oneRepeatingCount += contLetter % 3 === 0 ? 1 : 0;
    } else {
      i++;
    }
  }

  if (pasWrd.length < 6) {
    const lengthPassword = 6 - pasWrd.length;
    return Math.max(lengthPassword, types);
  } else if (pasWrd.length <= 20) {
    return Math.max(repeatCount, types);
  } else {
    const deleteCount = pasWrd.length - 20;
    repeatCount -= Math.min(deleteCount, oneRepeatingCount * 2) / 2;
    repeatCount -= Math.max(deleteCount - oneRepeatingCount * 2, 0) / 3;
    return deleteCount + Math.max(repeatCount, types);
  }
}

// Result in console log


console.log(checkPassword(password), ": Steps required to make the password strong");
if (checkPassword(password) !== 0) {
  console.log('Your password is a weak ')
  console.log(
    "Rule for strong Password: \n",
    "●It has at least 6 characters and at most 20 characters.\n",
    "●It contains at least one lowercase letter, at least one uppercase letter, and at least one digit.\n",
    "●It does not contain three repeating characters in a row (i.e., 'Baaabb0' is weak, but 'Baaba0' is strong\n"
  )
} else if (checkPassword(password) === 0) {
  console.log('Your password is a Strong ')
}