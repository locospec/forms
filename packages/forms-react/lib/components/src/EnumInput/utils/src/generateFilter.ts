const generateFilter = (
  formData: Record<string, string>,
  dependsOn: string[]
) => {
  if (!formData || dependsOn.length < 1) {
    return {};
  }
  const dependencyFilters: any = [];
  dependsOn.forEach((key: string) => {
    if (key in formData) {
      dependencyFilters.push({
        attribute: key,
        op: "in",
        value: formData[key],
      });
    }
  });
  if (dependencyFilters.length < 1) {
    return {};
  }
  return {
    op: "and",
    condition: dependencyFilters,
  };
};
generateFilter.displayName = "generateFilter";

export { generateFilter };
