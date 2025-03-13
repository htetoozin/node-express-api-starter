abstract class Filter {
  protected values: any;
  protected builder: any;
  protected filterValues: string[] = [];

  constructor(values: any) {
    this.values = values;
  }

  apply(builder: any) {
    this.builder = builder;

    for (const [filter, value] of Object.entries(this.getFilters())) {
      if (typeof (this as any)[filter] === "function") {
        (this as any)[filter](value);
      }
    }

    return this.builder;
  }

  protected getFilters() {
    return Object.fromEntries(
      Object.entries(this.values)
        .filter(([key]) => this.filterValues.includes(key))
        .filter(
          ([_, value]) => value !== undefined && value !== "" && value !== null
        )
    );
  }
}

export default Filter;
