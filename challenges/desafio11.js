db.trips.aggregate([
  {
    $project: {
      dia: { $dayOfWeek: "$startTime" },
    },
  },
  {
    $group: {
      _id: "$dia",
      total: { $sum: 1 },
    },
  },
  {
    $project: {
      diaDaSemana: "$_id",
      total: "$total",
      _id: false,
    },
  },
  {
    $sort: { total: -1 },
  },
  { $limit: 1 },
]);
