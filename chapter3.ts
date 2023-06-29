enum DayOfWeek {
  Sun,
  Mon,
  Tue,
  Wed,
  Thu,
  Fri,
  Sat,
}

type Week = keyof typeof DayOfWeek;
const oneDay: Week = "Fri";
