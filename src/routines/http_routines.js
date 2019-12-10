/**
 * Routines are basically functions to be executed by the server in
 * response to an event.<br>
 * While the 'routing' decides what routines to execute based on the request,
 * the routines decide how to handle the data requested.<br>
 * Routines can do data manipulation, while queries should not do any work on the data, but provide an easy to use abstraction of the syntax and options, with documentations, for some of the harder mongoose queries.
 * @module routines/http_routines
 * @requires error_handling/Error
 */

const error_handler = require('../error_handling/Error');

/**
 * Routine for a user's first get request, loading the first element in the database.
 * If no element is present, this routine sets the status as <code>500 Internal Server Error</code>.<br>
 * This is because the client doesn't send anything with the request, so it is an internal problem in the server.<br>
 * It works similarly to <code>get_one</code>, see <code>get_one</code> documentation to know how it works.
 * @param {Object} req the Express req Object used by the client to send a request.
 * @param {Object} res the Express res Object used to send back a response.
 * @param {module} queryAgent the module containing the queries to use
 * @param {mongoose.Schema} database the database as defined in a mongoose schema
 * @param {json} searchTerm JSON containing the terms used for the database search
 * @param {string} selectTerm the fields in the database to be shown in the requested JSON document. If the field is not specified here, it will not be shown in the document. An empty string shows all fields.
 * @see get_one
 */
function get_init(req, res, queryAgent, database, searchTerm, selectTerm){
    try{
    queryAgent.getOneElement(database, searchTerm, selectTerm, function(err, element){
       if (err) error_handler.badServerHandler(res, err);
       else {
           req.session.lastLink = element._id;
           res.json(element);
       }
    });
    }
    catch(err){
        error_handler.functionDoesNotExist(res, "The query agent does not have a getInitElement function.");
    }
}

/**
 * Routine to use when a single element is required from the database.
 * This assumes that the <code>queryAgent</code> has a <code>getOneElement</code> function.
 * @param {Object} res the Express res Object used to send back a response.
 * @param {module} queryAgent the module containing the queries to use
 * @param {mongoose.Schema} database the database as defined in a mongoose schema
 * @param {json} searchTerm JSON containing the terms used for the database search
 * @param {string} selectTerm the fields in the database to be shown in the requested JSON document. If the field is not specified here, it will not be shown in the document. An empty string shows all fields.
 */
function get_one(res, queryAgent, database, searchTerm, selectTerm){
    try{
    queryAgent.getOneElement(database, searchTerm, selectTerm, function(err, element){
        if(err) error_handler.badClientRequest(res, err);
        else res.json(element);
    });}
    catch(err){
        error_handler.functionDoesNotExist(res, "The query agent does not have a getOneElement function.");
    }
}

/**
 * Routine to use when a single element is required from the database.
 * This assumes that the <code>queryAgent</code> has a <code>getOneElement</code> function.<br>
 * If cookies are enabled, the routine also checks whether a <code>Course</code> has been requested: if so, the session cookies are wiped clean so that the user can start anew.
 * @param {Object} req the Express req Object used by the client to send a request.
 * @param {Object} res the Express res Object used to send back a response.
 * @param {module} queryAgent the module containing the queries to use
 * @param {mongoose.Schema} database the database as defined in a mongoose schema
 * @param {json} searchTerm JSON containing the terms used for the database search
 * @param {string} selectTerm the fields in the database to be shown in the requested JSON document. If the field is not specified here, it will not be shown in the document. An empty string shows all fields.
 * @param {boolean} close Tells the server to stop and wipe the session.
 */
function get_one_check_closure(req, res, queryAgent, database, searchTerm, selectTerm, close){
    try{
    queryAgent.getOneElement(database, searchTerm, selectTerm, function(err, element){
        if(err) error_handler.badClientRequest(res, err);
        else {
            res.json(element);
            if(close && element != null){
                destroy_session(req);
            }
        }
    });}
    catch(err){
        error_handler.functionDoesNotExist(res, "The query agent does not have a getOneElement function.");
    }
}

/**
 * Routine to use when all the elements in the database are required.
 * @param {Object} res the Express res Object used to send back a response.
 * @param {module} queryAgent the module containing the queries to use.
 * @param {mongoose.Schema} database the database as defined in a mongoose schema.
 */
function get_all(res, queryAgent, database){
    try{
    queryAgent.getAllElements(database, function(err, element){
        if(err) error_handler.badClientRequest(res, err);
        else res.json(element);
    });
    }
    catch(err){
        error_handler.functionDoesNotExist(res, "The query agent does not have a getAllElements function.");
    }
}

/**
 * Routine to store a new element in the database.
 * @param {Object} res the Express res Object used to send back a response.
 * @param {module} queryAgent the module containing the queries to use.
 * @param {mongoose.Schema} newElement an element that is created following the Schema.
 */
function post_one(res, queryAgent, newElement){
    try{
        queryAgent.postOneElement(newElement, function(err){
            if (err) error_handler.badServerHandler(res, 'Unable to save to database.');
            else res.status(201).json('Entry added successfully.');
        });
    }
    catch(err){
        error_handler.functionDoesNotExist(res, "The query agent does not have a postOneElement function."); 
    }
}

/**
 * Routine to store an array of elements in the database.
 * @param {Object} res the Express res Object used to send back a response.
 * @param {module} queryAgent the module containing the queries to use.
 * @param {mongoose.Schema} database the database as defined in a mongoose schema.
 * @param {json[]} elementsArr an array of json documents, each json corresponding to a new entry in the database.
 */
function post_many(res, queryAgent, database, elementsArr){
    try{
        queryAgent.postManyElements(database, elementsArr, function(err){
            if (err) error_handler.validationError(res, err);
            else res.status(201).json("All documents successfully saved");
        });
    }
    catch(err){
        error_handler.functionDoesNotExist(res, "The query agent does not have a postManyElements function."); 
    }
}

/**
 * Routine to append the array contained in data to the storage in memory.
 * @param {string[]} memory memory for storing data.
 * @param {string[]} data the data to be stored.
 * @callback callback function to do something after logging the data.
 * @param {string[]} callback.result the resulting concatenated array.
 */
function log_data(memory, data, callback){
    result = memory.concat(data);
    callback(result);
}

/**
 * Routine to update one element. 
 * The routine updates a single field in an element.<br>
 * Depending on the definition of <code>updateOneElement</code>, a new element, or field, can be created if it does not already exist. <br>
 * Note that the element <em>must</em> be a top-level field, not a field in a nested sub-document or array.<br>
 * To modify a nested field, see <code>update_one_answer</code>.
 * @param {Object} res the Express res Object used to send back a response.
 * @param {module} queryAgent the module containing the queries to use
 * @param {mongoose.Schema} database the database as defined in a mongoose schema
 * @param {json} searchTerm JSON containing the terms used for the database search
 * @param {json} update JSON containing the field to update, and its new value
 * @see update_one_answer
 */
function update_one_doc(res, queryAgent, database, searchTerm, update){
    try{
        queryAgent.updateOneDocument(database, searchTerm, update, function(err, element){
            if (err) error_handler.badServerHandler(res, 'Unable to update the database.');
            else res.json(element);
        });
    }
    catch(err){
        error_handler.functionDoesNotExist(res, "The query agent does not have an updateOneElement function."); 
    }
}

/**
 * Routine to update a field nested in a document.
 * The nested field could be part of an array, or a sub-document, but must be nested into the field <code>answers</code>.<br>
 * Depending on the implementation of <code>updateOneAnswer</code>, a new field could be created, but that should not be assumed as always the case.<br>
 * Note that, due the complexity of nested sub-documents and array, a variety of information are required for the request.
 * @param {Object} res the Express res Object used to send back a response.
 * @param {module} queryAgent the module containing the queries to use
 * @param {mongoose.Schema} database the database as defined in a mongoose schema
 * @param {json} searchTerm JSON containing the terms used for the database search
 * @param {String} field the literal name of the field container where to find the lowest-level field to update as defined in the schema. For example, if you need to update <code>body</code>, then field has to be <code>content</code>
 * @param {mongoose.ObjectID} fieldID the <code>_id</code> of the part of the field to update, so that the correct one can be selected
 * @param {String|Number} index the position of the field's container in the <code>answers</code> array, going from 0 (the first element), to the number of answers - 1.
 * @param {JSON} update a <code>name:value</code> couple that indicates the field to update, and its new value.
 */
function update_one_answer(res, queryAgent, database, searchTerm, field, fieldID, index, update){
    try{
        queryAgent.updateOneAnswer(database, searchTerm, field, fieldID, index, update, function(err, element){
            if(err) error_handler.badServerHandler(res, 'Unable to update the answer');
            else res.json(element);
        });
    }
    catch(err){
        console.log(err);
        error_handler.functionDoesNotExist(res, "The query agent does not have an updateOneAnswerContent function."); 
    }
}
/**
 * Routine to delete one element.
 * After deletion, the element is temporarily stored in <code>element</code> (not used).
 * While the actual definition of <code>deleteOneElement</code> is arbitrary, the routine should not be allowed to delete more than one element per function call.
 * For example, passing <code>'{}'</code> as search term should not delete all the collection, but only the first element.
 * @param {Object} res the Express res Object used to send back a response.
 * @param {module} queryAgent the module containing the queries to use.
 * @param {mongoose.Schema} database the database as defined in a mongoose schema.
 * @param {json} searchTerm JSON containing the terms used for the database search.
 */
function delete_one(res, queryAgent, database, searchTerm){
    try{
        queryAgent.deleteOneElement(database, searchTerm, function(err, element){
            if(err) error_handler.badClientRequest(res, err);
            else res.json("Element successfully deleted.");
        });
    }
    catch(err){
            error_handler.functionDoesNotExist(res, "The query agent does not have a deleteOneElement function.");
    }
}

/**
 * Routine to delete field(s) from one element.
 * Similar to <code>delete_one</code>, but acts on a field, not a document.
 * @param {Object} res the Express res Object used to send back a response.
 * @param {module} queryAgent the module containing the queries to use.
 * @param {mongoose.Schema} database the database as defined in a mongoose schema.
 * @param {json} searchTerm JSON containing the terms used for the database search.
 * @param {json} field JSON containing the fields and their values to find and delete.
 * @see delete_one
 */
function delete_field_from_one(res, queryAgent, database, searchTerm, field){
    try{
        queryAgent.deleteField(database, searchTerm, field, function(err, element){
            if(err) error_handler.badClientRequest(res, err);
            else res.json("Field(s) succesfully deleted.");
        });
    }
    catch(err){
            error_handler.functionDoesNotExist(res, "The query agent does not have a deleteField function.");
    }
}

/**
 * Routine to delete an entire collection.
 * Since this is a dangerous operation, the routine sends back to the client a backup of the deleted collection as a json (has to be parsed).
 * @param {Object} res the Express res Object used to send back a response.
 * @param {module} queryAgent the module containing the queries to use.
 * @param {mongoose.Schema} database the database as defined in a mongoose schema.
 */
function delete_all(res, queryAgent, database){
    try{
        queryAgent.deleteAllElements(database, function(err, elements){
            if(err) error_handler.badClientRequest(res, err);
            else res.json("Element successfully deleted. Backup:\n" + elements);
        });
    }
    catch(err){
            error_handler.functionDoesNotExist(res, "The query agent does not have a deleteOneElement function.");
    }
}

/**
 * Similar to <code>delete_field_from_one</code>, but it acts on the whole collection.<br>
 * This is useful if an entry in the database is removed, and you want to remove all references to that element from the collection.
 * This acts on an entire collection.<br>
 * It does not allow to specify a subset of the collection to update.
 * @param {Object} res the Express res Object used to send back a response.
 * @param {module} queryAgent the module containing the queries to use.
 * @param {mongoose.Schema} database the database as defined in a mongoose schema.
 * @param {json} field JSON containing the fields and their values to find and delete.
 */
function delete_field_from_all(res, queryAgent, database, field){
    try{
        queryAgent.deleteFieldFromAll(database, field, function(err, element){
            if(err) error_handler.badClientRequest(res, err);
            else res.json("Field(s) succesfully deleted.");
        });
    }
    catch(err){
            error_handler.functionDoesNotExist(res, "The query agent does not have a deleteFieldFromAll function.");
    }
}

/**
 * Routine to wipe a session and restart with a clean cookie.
 * @param {Object} req the Express req Object that contains the session storage.
 */
function destroy_session(req){
    req.session.destroy(function (err){
        if (err) error_handler.logError('Could not destroy the session.');
    });
}
module.exports = {
    //GET
    get_init: get_init,
    get_one: get_one,
    get_one_check_closure: get_one_check_closure,
    get_all: get_all,

    //POST
    post_one: post_one,
    post_many: post_many,
    log_data: log_data,

    //PUT
    update_one_doc: update_one_doc,
    update_one_answer: update_one_answer,

    //DELETE
    delete_one: delete_one,
    delete_field_from_one: delete_field_from_one,
    delete_field_from_all: delete_field_from_all,
    delete_all: delete_all
}