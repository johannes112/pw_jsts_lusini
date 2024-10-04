/**
 * @class PointerClass
 * @description A pointer to store the function calls
 * @purpose give a memory of the function calls to play back the actions
 */
class PointerClass {
  /**
   * Array to store the function calls
   */
  private functionCalls: {
    functionName: string;
    functionArguments?: string;
    url?: string;
    timestamp: number;
  }[];

  constructor() {
    this.functionCalls = [];
  }

  /**
   * @function: addFunctionCall
   * @description Add a function call to the array
   * @argument functionName (string) - the name of the function
   * @argument functionArguments (string) - the arguments passed to the function
   * @argument url (string) - the url of the page
   * @action Add the function call to the array
   */
  addFunctionCall(
    functionName: string,
    functionArguments?: string,
    url?: string
  ) {
    const timestamp = Date.now(); // Use a timestamp to note the order

    this.functionCalls.push({
      functionName,
      functionArguments,
      url,
      timestamp,
    });
  }

  /**
   * @function: getFunctionCalls
   * @description Get the array of function calls
   * @returns The array of function calls
   */
  getFunctionCalls() {
    return this.functionCalls;
  }

  /**
   * @function: getOrderedFunctionCalls
   * @description Get the array of function calls ordered by the timestamp
   * @returns The array of function calls ordered by the timestamp
   */
  getOrderedFunctionCalls() {
    return this.functionCalls.sort((a, b) => a.timestamp - b.timestamp);
  }

  /**
   * @function: getPreviousFunctionCall
   * @description Get the previous function call by the number of function calls or the name of the function
   * @argument goBack (number | string) - the number of function calls to go back or the name of the function to find
   * @returns The previous function call
   */
  getPreviousFunctionCall(goBack: number | string = 1) {
    const allEntries = this.functionCalls.length;
    let prevEntry =
      typeof goBack === "number" && goBack > 0
        ? this.functionCalls[allEntries - goBack]
        : // filter by functionName if goBack is a string find the last entry which includes 'fill' in the functionName
          this.functionCalls
            .filter(
              (entry) =>
                typeof goBack === "string" &&
                entry.functionName.includes(goBack)
            )
            .pop() || null;
    null;
    return prevEntry;
  }
}

// Export the class for use in other files
export default PointerClass;
