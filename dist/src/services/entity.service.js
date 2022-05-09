"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteEntity = exports.createEntityFile = exports.createEntityFolder = exports.getEntityBasedOnParent = void 0;
const entity_model_1 = require("../models/entity.model");
const child_process_1 = require("child_process");
const fs_1 = require("fs");
function getEntityBasedOnParent(parent, user) {
    return entity_model_1.Entity.find({
        parent: parent,
        user: user
    }).exec();
}
exports.getEntityBasedOnParent = getEntityBasedOnParent;
function createEntityFolder(parent, child, user) {
    return entity_model_1.Entity.create({
        parent: parent,
        name: child,
        type: entity_model_1.EntityType.FOLDER,
        user: user
    });
}
exports.createEntityFolder = createEntityFolder;
function createEntityFile(file, parent, name, user) {
    return __awaiter(this, void 0, void 0, function* () {
        let entityCreationTask = yield entity_model_1.Entity.create({
            parent: parent,
            name: name,
            file: file,
            type: entity_model_1.EntityType.FILE,
            user: user
        });
        let fileWriteTask = yield new Promise((res, rej) => {
            try {
                fs_1.writeFile('modules/file.json', JSON.stringify(entityCreationTask), function (err) {
                    if (err)
                        rej(err);
                    res('completed');
                });
            }
            catch (error) {
                rej(error);
            }
        });
        child_process_1.exec("node run.js", function (error, stdout, stderr) {
            console.log(error, stdout, stderr);
        });
        return true;
    });
}
exports.createEntityFile = createEntityFile;
function deleteEntity(id) {
    return __awaiter(this, void 0, void 0, function* () {
        let stack = [];
        let data = yield entity_model_1.Entity.findById(id).exec();
        stack.push(data);
        while (stack.length) {
            let parent = stack[0]._id.toString();
            let children = yield entity_model_1.Entity.find({
                parent: parent
            }).exec();
            stack = stack.concat(children);
            yield entity_model_1.Entity.findByIdAndDelete(parent).exec();
            stack.shift();
        }
        return true;
    });
}
exports.deleteEntity = deleteEntity;
//# sourceMappingURL=entity.service.js.map