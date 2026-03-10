export function formatDate(value) {
  if (!value) return "—";

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;

  return new Intl.DateTimeFormat("ru-RU", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(date);
}

export function formatDateTime(value) {
  if (!value) return "—";

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;

  return new Intl.DateTimeFormat("ru-RU", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
}

export function formatSalary(min, max, currency = "") {
  const left = min ?? 0;
  const right = max ?? 0;
  return `${left.toLocaleString("ru-RU")} - ${right.toLocaleString("ru-RU")} ${currency}`.trim();
}

export function stringifyError(error) {
  return error?.message || "Запрос не выполнен";
}
