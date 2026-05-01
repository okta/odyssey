/**
 * Returns a new Date that is `months` months before `date`.
 * Uses the Date constructor to avoid mutating the original object.
 * The Date constructor handles month underflow correctly (e.g. month -1 → November of the previous year).
 * The day-of-month is clamped to the last valid day in the target month to avoid overflow.
 */
export const subtractMonths = ({
  date,
  months,
}: {
  date: Date;
  months: number;
}): Date => {
  const year = date.getFullYear();
  const monthIndex = date.getMonth();
  const day = date.getDate();

  // Normalize target year/month using day = 1 to handle month underflow.
  const targetMonthDate = new Date(year, monthIndex - months, 1);
  const targetYear = targetMonthDate.getFullYear();
  const targetMonth = targetMonthDate.getMonth();

  // Compute the last day of the target month.
  const lastDayOfTargetMonth = new Date(
    targetYear,
    targetMonth + 1,
    0,
  ).getDate();
  const clampedDay = Math.min(day, lastDayOfTargetMonth);

  return new Date(targetYear, targetMonth, clampedDay);
};
