export const statuses = ["Todo", "In Progress", "Done"];

export const getStatusColor = (status) => {
  switch (status) {
    case "Done":
      return "success";
    case "In Progress":
      return "warning";
    default:
      return "default";
  }
};
