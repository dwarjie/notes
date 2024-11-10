# MongoDB and Mongoose
## Table of Content
1. [MongoDB](#mongodb)
2. [Document Database](#document-database)
  1. [Document](#document)
  2. [Collection](#collection)
  3. [Replica Sets](#replica-sets)
  4. [Sharding](#sharding)
  5. [Indexes](#indexes)
3. [Mongoose](#mongoose)

## MongoDB
MongoDB is a general purpose [[#Document Database]] designed for modern application development and for the cloud.

## Document Database

### Document
A document is a record in a Model or an instance of a model which are stored as field-value pairs. Values of these pairs can be different such as string, number, arrays, etc. Usually the document formats can be JSON, BSON, or XML. 

Example of JSON document:
```json
{
     "_id": 1,
     "first_name": "Tom",
     "email": "tom@example.com",
     "cell": "765-555-5555",
     "likes": [
        "fashion",
        "spas",
        "shopping"
     ],
     "businesses": [
        {
           "name": "Entertainment 1080",
           "partner": "Jean",
           "status": "Bankrupt",
           "date_founded": {
              "$date": "2012-05-19T04:00:00Z"
           }
        },
        {
           "name": "Swag for Tweens",
           "date_founded": {
              "$date": "2012-11-01T04:00:00Z"
           }
        }
     ]
  }
```
### Collection
Collection is a Group or "Table" of similar documents.

> Not all documents in a collection are required to have the same fields, since document databases have flexible schemas. But, document databases can provide [schema validation](https://www.mongodb.com/docs/manual/core/schema-validation) to incorporate set of rules when populating data into the collection.

### Replica Sets:
When creating a Document Database or "Database", MongoDB replicates the database at least two or more times to ensure high availability. This is called replica set.

### Sharding:
Sharding is a term for distributing data into several machines. This is very common in modern data platforms since it needs to be able to adapt in the request traffic of the application to be able to handle fast queries.

Sharding in MongoDB is at the collection level or "tables".

### Indexes:
Indexes helps the developers fetch the data they needed. With support into variety of different indexing strategies, developers can speed up their queries since MongoDB indexing scans the index instead of reading every document in a collection.

## Mongoose
Mongoose is a nodejs library that wraps the MongoDB API to help developers use MongoDB easily.

### Connecting into MongoDb
To connect your application into a mongodb cluster, you have to provide the database or cluster URI and call the ```connect()``` method of mongoose.
```js

const mongoose = require("mongoose")

mongoose.connect(<mongo_uri>)
   .then(() => {
      ...
   })
   .catch(() => {
      ...
   });
```

### Schema
Schema shapes the information of each document in a collection.

To create a schema, you just have to specify the key value pair of the object and it's SchemaType.
```js

import mongoose from 'mongoose';
const { Schema } = mongoose;

const blogSchema = new Schema({
  title: String, // String is shorthand for {type: String}
  author: String,
  body: String,
  comments: [{ body: String, date: Date }],
  date: { type: Date, default: Date.now },
  hidden: Boolean,
  meta: {
    votes: Number,
    favs: Number
  }
});
```
You are always allowed to add more keys later by using the ```Schema.add()``` method.

You can also do subDocuments. Which are not required to have an ```_id```, so you may disable them.
```js

const nestedSchema = new Schema(
  { name: String },
  { _id: false } // <-- disable `_id`
);
const schema = new Schema({
  subdoc: nestedSchema,
  docArray: [nestedSchema]
});
const Test = mongoose.model('Test', schema);

// Neither `subdoc` nor `docArray.0` will have an `_id`
await Test.create({
  subdoc: { name: 'test 1' },
  docArray: [{ name: 'test 2' }]
});
```
or
```js

const nestedSchema = new Schema({
  _id: false, // <-- disable _id
  name: String
});
```

### Instance Methods
These are the built in methods of your documents. You may also define your own.
```js

// define a schema
const animalSchema = new Schema({ name: String, type: String },
  {
  // Assign a function to the "methods" object of our animalSchema through schema options.
  // By following this approach, there is no need to create a separate TS type to define the type of the instance functions.
    methods: {
      findSimilarTypes(cb) {
        return mongoose.model('Animal').find({ type: this.type }, cb);
      }
    }
  });

// Or, assign a function to the "methods" object of our animalSchema
animalSchema.methods.findSimilarTypes = function(cb) {
  return mongoose.model('Animal').find({ type: this.type }, cb);
};
```
> **NOTE** Do not declare methods using ES6 arrow functions (=>). Arrow functions explicitly prevent binding this, so your method will not have access to the document and the above examples will not work.

### Statics
Static functions to your model

```js

// define a schema
const animalSchema = new Schema({ name: String, type: String },
  {
  // Assign a function to the "statics" object of our animalSchema through schema options.
  // By following this approach, there is no need to create a separate TS type to define the type of the statics functions.
    statics: {
      findByName(name) {
        return this.find({ name: new RegExp(name, 'i') });
      }
    }
  });

// Or, Assign a function to the "statics" object of our animalSchema
animalSchema.statics.findByName = function(name) {
  return this.find({ name: new RegExp(name, 'i') });
};
// Or, equivalently, you can call `animalSchema.static()`.
animalSchema.static('findByBreed', function(breed) { return this.find({ breed }); });

const Animal = mongoose.model('Animal', animalSchema);
let animals = await Animal.findByName('fido');
animals = animals.concat(await Animal.findByBreed('Poodle'));
```

> **NOTE** Do not declare methods using ES6 arrow functions (=>). Arrow functions explicitly prevent binding this, so your method will not have access to the document and the above examples will not work.

### Difference of Instances Methods and Static Methods
*Statics* are the methods defined on the Model. *Methods* are defines on the document (instances).

You would usually use the static methods with the model.
```js

const Animal = mongoose.model('Animal', animalSchema);
let animals = await Animal.findByName('fido');
```
Meanwhile, you would usually use the methods in an *instance* of a model.
```js

const Animal = mongoose.model('Animal', animalSchema);
const dog = new Animal({ type: 'dog' });

dog.findSimilarTypes((err, dogs) => {
  console.log(dogs); // woof
});
```
### Query Helpers
Similar with Instance Methods and Static Methods, you can also add query methods to help developers do query in a model. Query helper methods let you extend mongoose's chainable query builder API.

```js

// define a schema
const animalSchema = new Schema({ name: String, type: String },
  {
  // Assign a function to the "query" object of our animalSchema through schema options.
  // By following this approach, there is no need to create a separate TS type to define the type of the query functions.
    query: {
      byName(name) {
        return this.where({ name: new RegExp(name, 'i') });
      }
    }
  });

// Or, Assign a function to the "query" object of our animalSchema
animalSchema.query.byName = function(name) {
  return this.where({ name: new RegExp(name, 'i') });
};

const Animal = mongoose.model('Animal', animalSchema);

Animal.find().byName('fido').exec((err, animals) => {
  console.log(animals);
});

Animal.findOne().byName('fido').exec((err, animal) => {
  console.log(animal);
});
```
## Schema Types
Is a configuration of each properties in your Model Schema, whether it has any getters/setters and what value type are valid for the property.

```js

const schema = new Schema({ name: String });
```
> SchemaType is different from a type. ```mongoose.ObjectId !=== mongoose.Types.ObjectId```. An instance of the ```mongoose.ObjectId``` SchemaType is just a configuration for a property in a Schema.

You can define the type of a path/property in a Schema using the type directly or an object with a type property.
```js

const schema1 = new Schema({
  test: String // `test` is a path of type String
});

const schema2 = new Schema({
  // The `test` object contains the "SchemaType options"
  test: { type: String } // `test` is a path of type string
});
```

There are several custom SchemaTypes that you can use to add for your schema property/path.
- required: boolean or function
- default: any or function
- select: boolean
- validate: function
- get: function
- set: function
- alis: string (mongoose >= 4.10.0 only)
- immutable: boolean
- transform: function
```js

const numberSchema = new Schema({
  integerOnly: {
    type: Number,
    get: v => Math.round(v),
    set: v => Math.round(v),
    alias: 'i'
  }
});

const Number = mongoose.model('Number', numberSchema);

const doc = new Number();
doc.integerOnly = 2.001;
doc.integerOnly; // 2
doc.i; // 2
doc.i = 3.001;
doc.integerOnly; // 3
doc.i; // 3
```
