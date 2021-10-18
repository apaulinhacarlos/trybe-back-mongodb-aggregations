db.trips.aggregate([
  {
    $project: {
      dia: { $dayOfWeek: "$startTime" },
      startStationName: true,
    },
  },
  {
    $group: {
      _id: {
        dia: "$dia",
        startStationName: "$startStationName",
      },
      total: { $sum: 1 },
    },
  },
  {
    $project: {
      nomeEstacao: "$_id.startStationName",
      total: "$total",
      _id: false,
    },
  },
  {
    $sort: { total: -1 },
  },
  { $limit: 1 },
]);
