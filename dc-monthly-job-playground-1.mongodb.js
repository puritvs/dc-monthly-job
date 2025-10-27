/* global use, db */
// MongoDB Playground
// To disable this template go to Settings | MongoDB | Use Default Template For Playground.
// Make sure you are connected to enable completions and to be able to run a playground.
// Use Ctrl+Space inside a snippet or a string literal to trigger completions.
// The result of the last command run in a playground is shown on the results panel.
// By default the first 20 documents will be returned with a cursor.
// Use 'console.log()' to print to the debug output.
// For more documentation on playgrounds please refer to
// https://www.mongodb.com/docs/mongodb-vscode/playgrounds/

// Select the database to use.
use("DCJob");
// const { ObjectId } = require("bson");

var data = [
  {
    _id: "68f863f9a8d60c3826b8a62e",
    type: "Dancer",
    periodType: "Single Day",
    name: "test2",
    startDate: new Date("2014-03-01T08:00:00Z"),
    endDate: new Date("2014-03-01T08:00:00Z"),
    description: "test description edited",
    remark: "test remark",
    userId: "682ab3014de04b9d1380d333",
  },
  {
    _id: "",
    type: "Dancer",
    periodType: "Single Day",
    name: "test3",
    startDate: new Date("2014-03-01T08:00:00Z"),
    endDate: new Date("2014-03-01T08:00:00Z"),
    description: "test description",
    remark: "test remark",
    userId: "682ab3014de04b9d1380d333",
  },
];

// Insert a few documents into the sales collection.
// db.getCollection("Jobs").insertMany([
//   {
//     type: "Dancer",
//     periodType: "Single Day",
//     name: "test2",
//     startDate: new Date("2014-03-01T08:00:00Z"),
//     endDate: new Date("2014-03-01T08:00:00Z"),
//     description: "test description",
//     remark: "test remark",
//     id: "682ab3014de04b9d1380d333",
//   },
// ]);

// Assuming *data* is an array of documents that you want to insert (or replace)
const bulkData = data.map((item) => {
  var { _id, ...rest } = item;
  console.log("processing: ", _id);

  return {
    updateOne: {
      upsert: true,
      filter: {
        _id: _id.length === 0 ? ObjectId() : ObjectId(_id),
        // Filter specification. You must provide a field that
        // identifies *item*
      },
      update: { $set: { ...rest } },
    },
  };
});

console.log("bulk write: ", db.getCollection("Jobs").bulkWrite(bulkData));

// Run a find command to view items sold on April 4th, 2014.
const jobs = db.getCollection("Jobs").find(
  {},
  {
    type: 1,
    name: 1,
    periodType: 1,
    startDate: 1,
    endDate: 1,
    description: 1,
    remark: 1,
    _id: 1,
    userId: 1,
  }
);

// Print a message to the output window.
console.log(jobs);
