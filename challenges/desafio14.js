db.trips.aggregate([
  {
    $group: {
      _id: "$bikeid",
      duracaoMedia: {
        $avg: {
          $divide: [
            { $subtract: ["$stopTime", "$startTime"] },
            60000,
          ],
        },
      },
    },
  },
  {
    $project: {
      bikeId: "$_id",
      duracaoMedia: { $ceil: ["$duracaoMedia"] },
      _id: false,
    },
  },
  {
    $sort: { duracaoMedia: -1 },
  },
  { $limit: 5 },
]);
