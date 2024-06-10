type FormErrors = {
  [key: string]: {
    apiResponse: string;
    shownText: string;
  };
};

export const FORM_ERRORS: FormErrors = {
  assignmentError: {
    apiResponse: "Invalid account setup",
    shownText:
      "There was an error processing the card details, please try again or try another card!",
  },
};
