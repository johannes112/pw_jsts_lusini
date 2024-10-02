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

  getFunctionCalls() {
    return this.functionCalls;
  }

  getOrderedFunctionCalls() {
    return this.functionCalls.sort((a, b) => a.timestamp - b.timestamp);
  }

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
