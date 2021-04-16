const Person = require('../models/Person');

exports.index = async (request, response, next) => {
  try {
    const genres = await Person.find();
    
    response.status(200)
    .json(genres);
  } catch (error) {
    next(error);
  }
};

exports.show = async (request, response, next) => {
  try {
    const { id } = request.params;
    const person = await Person.findById(id);

    response.status(200)
    .json({ ...person._doc});
  } catch (error) {
    next(error);
  }
};

exports.create = async (request, response, next) => {
  try {
    const { name } = request.body;
    const person = await Person.create({
      name
    });

    response.status(200)
    .json({
      message: "Person was created successfully",
      status: "success",
      person
    });
  } catch (error) {
    next(error);
  }
};

exports.update = async (request, response, next) => {
  try {
    const { id, name } = request.body;

    await Person.findOneAndUpdate({ _id: id }, { name });
    const person = await Person.findById(id);

    response.status(200)
    .json({
      message: "Person was updated successfully",
      status: "success",
      person
    });
  } catch (error) {
    next(error);
  }
};

exports.destroy = async (request, response, next) => {
  try {
    const { id } = request.body;

    await Person.findOneAndDelete({ _id: id });

    response.status(200)
    .json({
      message: "Person was deleted successfully",
      status: "success"
    });
  } catch (error) {
    next(error);
  }
};