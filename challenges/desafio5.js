db.movies.aggregate([
  {
    $match: {
      countries: "USA",
      "tomatoes.viewer.rating": { $gte: 3 },
    },
  },
  {
    $addFields: {
      cast_favs: {
        $setIntersection: [
          [
            "Sandra Bullock",
            "Tom Hanks",
            "Julia Roberts",
            "Kevin Spacey",
            "George Clooney",
          ],
          "$cast",
        ],
      },
    },
  },
  {
    $match: {
      cast_favs: { $exists: true, $ne: null },
    },
  },
  {
    $project: {
      _id: 0,
      num_favs: { $size: "$cast_favs" },
      "tomatoes.viewer.rating": 1,
      title: 1,
    },
  },
  {
    $sort: {
      num_favs: -1,
      "tomatoes.viewer.rating": -1,
      title: -1,
    },
  },
  {
    $skip: 24,
  },
  {
    $limit: 1,
  },
  {
    $project: {
      title: true,
      _id: false,
    },
  },
]);
