let pipeQuery = req.query.pipeline ? '"' + req.query.pipeline.split(",").join("\",\"") + '"' : ""
let statQuery = req.query.status ? '"' + req.query.status.split(",").join("\",\"") + '"' : ""  